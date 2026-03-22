'use client';

import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  previewChars?: number;
}

export function ExpandableText({ text, previewChars = 320 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > previewChars;
  const visibleText = !shouldTruncate || expanded ? text : `${text.slice(0, previewChars).trimEnd()}…`;

  return (
    <div className="rounded-2xl border border-border bg-slate-50 p-5">
      <h3 className="text-lg font-semibold">Original post</h3>
      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{visibleText}</p>
      {shouldTruncate ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-3 inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </div>
  );
}
