import { NextResponse } from 'next/server';

import { buildPublicSharePayload, buildPublicShareUrl, buildShareCopy, encodePublicSharePayload } from '../../../lib/publicResult';
import { CreateShareResultRequest, CreateShareResultResponse } from '../../../lib/types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateShareResultRequest>;

    if (typeof body.originalText !== 'string' || !body.originalText.trim() || !body.result) {
      return NextResponse.json({ error: 'Please provide the original post text and analysis result.' }, { status: 400 });
    }

    const payload = buildPublicSharePayload({
      originalText: body.originalText,
      result: body.result,
    });
    const id = encodePublicSharePayload(payload);
    const url = buildPublicShareUrl(id);

    const response: CreateShareResultResponse = {
      id,
      url,
      shareText: buildShareCopy(payload.result, url),
      payload,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
