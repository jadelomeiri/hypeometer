'use client';

import { useEffect, useMemo, useState } from 'react';

import { AnalyzePostResult, CreateShareResultResponse } from '../lib/types';
import { Toast } from './Toast';

interface ShareActionsProps {
  result: AnalyzePostResult;
  originalText: string;
}

export function ShareActions({ result, originalText }: ShareActionsProps) {
  const [shareData, setShareData] = useState<CreateShareResultResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const xIntent = useMemo(() => {
    if (!shareData) return '#';
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.shareText)}`;
  }, [shareData]);

  useEffect(() => {
    setShareData(null);
    setFeedback(null);
    setIsGenerating(false);
  }, [originalText, result]);

  async function ensureShareData() {
    if (shareData) return shareData;

    setIsGenerating(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalText, result }),
      });

      const payload = (await response.json()) as Partial<CreateShareResultResponse> & { error?: string };
      if (!response.ok || !payload.id || !payload.url || !payload.shareText || !payload.payload) {
        throw new Error(payload.error ?? 'Unable to generate a share link right now.');
      }

      setShareData(payload as CreateShareResultResponse);
      return payload as CreateShareResultResponse;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to generate a share link right now.';
      setFeedback({ tone: 'error', message });
      return null;
    } finally {
      setIsGenerating(false);
    }
  }

  async function copyValue(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback({ tone: 'success', message: successMessage });
    } catch {
      setFeedback({ tone: 'error', message: 'Copy failed. You can still select and copy manually.' });
    }
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Share results</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Make the analysis easy to pass around.</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Generate a public result link, copy a tasteful caption for LinkedIn, or open a prefilled share draft.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={async () => {
            const data = await ensureShareData();
            if (data) {
              await copyValue(data.url, 'Public result link copied.');
            }
          }}
          disabled={isGenerating}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isGenerating ? 'Generating link…' : 'Copy result link'}
        </button>
        <button
          type="button"
          onClick={async () => {
            const data = await ensureShareData();
            if (data) {
              await copyValue(data.shareText, 'Share copy copied.');
            }
          }}
          disabled={isGenerating}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        >
          Copy for LinkedIn
        </button>
        <button
          type="button"
          onClick={async () => {
            const data = await ensureShareData();
            if (data) {
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`, '_blank', 'noopener,noreferrer');
            }
          }}
          disabled={isGenerating}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        >
          Share on LinkedIn
        </button>
        <button
          type="button"
          onClick={async () => {
            const data = await ensureShareData();
            if (data) {
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.shareText)}`, '_blank', 'noopener,noreferrer');
            }
          }}
          disabled={isGenerating}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        >
          Share on X
        </button>
        {shareData ? (
          <a
            href={`${shareData.url}/opengraph-image`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
          >
            Open share image
          </a>
        ) : null}
      </div>

      {shareData ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-800">Public result page</p>
          <p className="mt-1 break-all">{shareData.url}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Includes HypeOmeter branding and attribution.</p>
        </div>
      ) : null}

      {feedback ? <div className="mt-4"><Toast message={feedback.message} tone={feedback.tone} /></div> : null}
      {shareData ? <p className="mt-4 text-xs text-slate-500">X intent preview: {xIntent}</p> : null}
    </section>
  );
}
