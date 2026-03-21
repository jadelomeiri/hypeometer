import { createHash } from 'crypto';
import { deflateRawSync, inflateRawSync } from 'zlib';

import { appConfig, getAbsoluteUrl } from './config';
import { AnalysisMode, AnalyzePostResult, PublicResultPayload } from './types';

function base64UrlEncode(input: Buffer) {
  return input.toString('base64url');
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, 'base64url');
}

export function createPublicResultPayload(params: {
  originalText: string;
  result: AnalyzePostResult;
  mode: AnalysisMode;
}): PublicResultPayload {
  const normalizedText = params.originalText.trim();
  const stableSeed = JSON.stringify({
    t: normalizedText,
    r: params.result,
    m: params.mode,
  });

  return {
    version: 1,
    id: createHash('sha256').update(stableSeed).digest('hex').slice(0, 12),
    mode: params.mode,
    createdAt: new Date().toISOString(),
    originalText: normalizedText,
    result: params.result,
  };
}

export function serializePublicResult(payload: PublicResultPayload) {
  const json = JSON.stringify(payload);
  return base64UrlEncode(deflateRawSync(Buffer.from(json)));
}

export function deserializePublicResult(token: string): PublicResultPayload | null {
  try {
    const json = inflateRawSync(base64UrlDecode(token)).toString('utf8');
    const parsed = JSON.parse(json) as PublicResultPayload;

    if (parsed.version !== 1 || !parsed.id || !parsed.result || !parsed.originalText) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getPublicResultUrl(token: string) {
  return getAbsoluteUrl(`/r/${token}`);
}

export function buildShareText(payload: PublicResultPayload) {
  const { result, mode } = payload;
  return `${appConfig.share.defaultIntro} Hype: ${result.hype}, Substance: ${result.substance}, Evidence: ${result.evidence}. Verdict: ${result.verdict} Mode: ${capitalize(mode)}. ${appConfig.share.attributionSuffix}`;
}

export function buildShareSummary(payload: PublicResultPayload) {
  const { result } = payload;
  return [
    `Verdict: ${result.verdict}`,
    `Hype ${result.hype} · Substance ${result.substance} · Evidence ${result.evidence} · Specificity ${result.specificity} · Operator ${result.operatorSignals}`,
    `AI-style likelihood: ${capitalize(result.aiStyleLikelihood)}`,
  ].join('\n');
}

export function buildXIntentUrl(payload: PublicResultPayload, shareUrl: string) {
  const text = `${buildShareText(payload)} ${shareUrl}`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function getResultImageUrl(token: string) {
  return getAbsoluteUrl(`/r/${token}/opengraph-image`);
}

export function truncateText(text: string, maxLength = 240) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getSourceUrl() {
  return appConfig.features.sourceLink && appConfig.sourceUrl ? appConfig.sourceUrl : '';
}
