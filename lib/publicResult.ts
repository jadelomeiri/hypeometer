import { deflateRawSync, inflateRawSync } from 'node:zlib';

import { APP_CONFIG } from './config';
import { AnalyzePostResult, CreateShareResultRequest, PublicShareResultV1 } from './types';

function toBase64Url(input: Buffer) {
  return input.toString('base64url');
}

function fromBase64Url(input: string) {
  return Buffer.from(input, 'base64url');
}

function trimOriginalText(text: string) {
  const normalized = text.trim().replace(/\s+/g, ' ');
  if (normalized.length <= APP_CONFIG.share.maxOriginalTextLength) {
    return { text: normalized, wasTrimmed: false };
  }

  return {
    text: `${normalized.slice(0, APP_CONFIG.share.maxOriginalTextLength).trimEnd()}…`,
    wasTrimmed: true,
  };
}

export function buildPublicSharePayload(input: CreateShareResultRequest): PublicShareResultV1 {
  const trimmed = trimOriginalText(input.originalText);

  return {
    version: 1,
    createdAt: new Date().toISOString(),
    originalText: trimmed.text,
    originalTextWasTrimmed: trimmed.wasTrimmed,
    result: input.result,
  };
}

export function encodePublicSharePayload(payload: PublicShareResultV1): string {
  const json = JSON.stringify(payload);
  const compressed = deflateRawSync(Buffer.from(json, 'utf8'));
  return toBase64Url(compressed);
}

export function decodePublicSharePayload(id: string): PublicShareResultV1 | null {
  try {
    const inflated = inflateRawSync(fromBase64Url(id)).toString('utf8');
    const parsed = JSON.parse(inflated) as PublicShareResultV1;

    if (parsed.version !== 1 || !isAnalyzePostResult(parsed.result)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function buildPublicShareUrl(id: string) {
  return `${APP_CONFIG.baseUrl}/r/${id}`;
}

export function buildShareCopy(result: AnalyzePostResult, url: string) {
  return APP_CONFIG.share.defaultCopy
    .replaceAll('{appName}', APP_CONFIG.name)
    .replaceAll('{hype}', String(result.hype))
    .replaceAll('{substance}', String(result.substance))
    .replaceAll('{verdict}', result.verdict)
    .replaceAll('{url}', url)
    .replaceAll('{founderName}', APP_CONFIG.founder.name);
}

function isAnalyzePostResult(value: unknown): value is AnalyzePostResult {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;

  return [
    'hype',
    'substance',
    'evidence',
    'specificity',
    'operatorSignals',
  ].every((key) => typeof candidate[key] === 'number')
    && typeof candidate.aiStyleLikelihood === 'string'
    && typeof candidate.verdict === 'string'
    && Array.isArray(candidate.explanation)
    && candidate.explanation.every((item) => typeof item === 'string')
    && typeof candidate.strongerRewrite === 'string';
}
