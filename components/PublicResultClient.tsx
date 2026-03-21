'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { trackEvent } from '../lib/analytics';
import { PublicResultPayload } from '../lib/types';

export function PublicResultClient({ payload }: { payload: PublicResultPayload }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    trackEvent('public_result_opened', { mode: payload.mode, resultId: payload.id });
  }, [payload.id, payload.mode]);

  const needsTruncation = payload.originalText.length > 340;
  const visibleText = !needsTruncation || expanded ? payload.originalText : `${payload.originalText.slice(0, 340).trimEnd()}…`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Original post</p>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{visibleText}</p>
        </div>
        <Link href="/" className="inline-flex h-fit items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950" onClick={() => trackEvent('analyze_your_own_clicked', { source: 'public_result' })}>
          Analyze your own post
        </Link>
      </div>
      {needsTruncation ? (
        <button type="button" className="mt-4 text-sm font-medium text-primary" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Show less' : 'Expand original post'}
        </button>
      ) : null}
    </div>
  );
}
