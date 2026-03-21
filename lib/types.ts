export type AIStyleLikelihood = 'low' | 'medium' | 'high';
export type AnalysisMode = 'normal' | 'strict' | 'brutal';

export interface AnalyzePostRequest {
  text: string;
  mode?: AnalysisMode;
}

export interface AnalyzePostResult {
  hype: number;
  substance: number;
  evidence: number;
  specificity: number;
  operatorSignals: number;
  aiStyleLikelihood: AIStyleLikelihood;
  verdict: string;
  explanation: string[];
  strongerRewrite: string;
}

export interface AnalyzePostResponse {
  result: AnalyzePostResult;
}

export interface PublicResultPayload {
  version: 1;
  id: string;
  mode: AnalysisMode;
  createdAt: string;
  originalText: string;
  result: AnalyzePostResult;
}

export interface CreateShareRequest {
  originalText: string;
  result: AnalyzePostResult;
  mode: AnalysisMode;
}

export interface CreateShareResponse {
  token: string;
  shareUrl: string;
}

export interface LeaderboardEntry {
  id: string;
  title: string;
  snippet: string;
  metricLabel: string;
  metricValue: number;
  href: string;
}
