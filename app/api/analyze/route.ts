import { NextResponse } from 'next/server';

import { analyzePost } from '../../../lib/analyzePost';
import { AnalyzePostRequest, AnalyzePostResponse, AnalysisMode } from '../../../lib/types';

const allowedModes: AnalysisMode[] = ['normal', 'strict', 'brutal'];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AnalyzePostRequest>;
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const mode = allowedModes.includes(body.mode as AnalysisMode) ? (body.mode as AnalysisMode) : 'normal';

    if (!text) {
      return NextResponse.json({ error: 'Please provide post text to analyze.' }, { status: 400 });
    }

    if (text.length < 40) {
      return NextResponse.json({ error: 'Please provide at least 40 characters for a meaningful analysis.' }, { status: 400 });
    }

    const response: AnalyzePostResponse = {
      result: analyzePost(text, mode),
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
