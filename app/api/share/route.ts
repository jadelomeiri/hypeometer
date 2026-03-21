import { NextResponse } from 'next/server';

import { createPublicResultPayload, getPublicResultUrl, serializePublicResult } from '../../../lib/share';
import { CreateShareRequest, CreateShareResponse, AnalysisMode } from '../../../lib/types';

const allowedModes: AnalysisMode[] = ['normal', 'strict', 'brutal'];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateShareRequest>;
    const originalText = typeof body.originalText === 'string' ? body.originalText.trim() : '';
    const mode = allowedModes.includes(body.mode as AnalysisMode) ? (body.mode as AnalysisMode) : 'normal';

    if (!originalText || !body.result) {
      return NextResponse.json({ error: 'Missing result payload.' }, { status: 400 });
    }

    const payload = createPublicResultPayload({
      originalText,
      result: body.result,
      mode,
    });
    const token = serializePublicResult(payload);
    const response: CreateShareResponse = {
      token,
      shareUrl: getPublicResultUrl(token),
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: 'Unable to create a share link.' }, { status: 400 });
  }
}
