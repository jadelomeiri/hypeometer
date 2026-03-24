import { APP_CONFIG } from './config';
import { AnalyzePostResult } from './types';

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
