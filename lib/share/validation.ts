import { AnalyzePostResult, SharedResultRecordV1 } from '../types';

const SHARE_ID_REGEX = /^[a-zA-Z0-9_-]{8,64}$/;

export function isValidShareId(id: string) {
  return SHARE_ID_REGEX.test(id);
}

export function isAnalyzePostResult(value: unknown): value is AnalyzePostResult {
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

export function isSharedResultRecordV1(value: unknown): value is SharedResultRecordV1 {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<SharedResultRecordV1> & Record<string, unknown>;

  if (candidate.version !== 1 || typeof candidate.id !== 'string' || !isValidShareId(candidate.id)) {
    return false;
  }

  if (typeof candidate.createdAt !== 'string' || typeof candidate.originalText !== 'string') {
    return false;
  }

  if (candidate.expiresAt !== undefined && typeof candidate.expiresAt !== 'string') {
    return false;
  }

  if (candidate.mode !== undefined && typeof candidate.mode !== 'string') {
    return false;
  }

  if (!isAnalyzePostResult(candidate.result)) {
    return false;
  }

  if (!candidate.metadata || typeof candidate.metadata !== 'object') {
    return false;
  }

  const metadata = candidate.metadata as unknown as Record<string, unknown>;
  if (typeof metadata.views !== 'number') {
    return false;
  }

  if (metadata.lastViewedAt !== undefined && typeof metadata.lastViewedAt !== 'string') {
    return false;
  }

  return true;
}
