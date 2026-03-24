import { NextResponse } from 'next/server';

import { buildPublicShareUrl, buildShareCopy } from '../../../lib/publicResult';
import { getSharedResultStore, toPublicShareResult } from '../../../lib/share/store';
import { isAnalyzePostResult } from '../../../lib/share/validation';
import { CreateShareResultRequest, CreateShareResultResponse } from '../../../lib/types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateShareResultRequest>;

    if (typeof body.originalText !== 'string' || !body.originalText.trim() || !isAnalyzePostResult(body.result)) {
      return NextResponse.json({ error: 'Please provide the original post text and analysis result.' }, { status: 400 });
    }

    const store = getSharedResultStore();
    const record = await store.create({
      originalText: body.originalText,
      result: body.result,
      mode: typeof body.mode === 'string' ? body.mode : undefined,
    });

    const url = buildPublicShareUrl(record.id);

    const response: CreateShareResultResponse = {
      id: record.id,
      url,
      shareText: buildShareCopy(record.result, url),
      payload: toPublicShareResult(record),
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
