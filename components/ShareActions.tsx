'use client';

import { useMemo, useState } from 'react';

import { appConfig } from '../lib/config';
import { trackEvent } from '../lib/analytics';
import { buildShareSummary, buildShareText, buildXIntentUrl, getResultImageUrl } from '../lib/share';
import { AnalysisMode, AnalyzePostResult, CreateShareResponse } from '../lib/types';
import { Toast } from './Toast';

interface ShareActionsProps {
  result: AnalyzePostResult | null;
  originalText: string;
  mode: AnalysisMode;
}

export function ShareActions({ result, originalText, mode }: ShareActionsProps) {
  const [shareData, setShareData] = useState<CreateShareResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone?: 'success' | 'error' } | null>(null);

  const derived = useMemo(() => {
    if (!shareData || !result) return null;
    const payload = { version: 1 as const, id: 'preview', createdAt: new Date().toISOString(), mode, originalText, result };
    return {
      shareText: buildShareText(payload),
      summary: buildShareSummary(payload),
      xIntent: buildXIntentUrl(payload, shareData.shareUrl),
      imageUrl: getResultImageUrl(shareData.token),
    };
  }, [shareData, result, originalText, mode]);

  async function ensureShareData() {
    if (shareData) return shareData;
    if (!result || !originalText.trim()) return null;

    setIsLoading(true);
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalText, result, mode }),
      });
      const payload = (await response.json()) as CreateShareResponse & { error?: string };
      if (!response.ok || !payload.shareUrl) throw new Error(payload.error || 'Could not create share link.');
      setShareData(payload);
      return payload;
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Unable to create share data.', tone: 'error' });
      return null;
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(null), 2200);
    }
  }

  async function copyValue(value: string, eventName: 'share_link_copied' | 'share_text_copied', message: string) {
    try {
      await navigator.clipboard.writeText(value);
      trackEvent(eventName, { mode });
      setToast({ message });
    } catch {
      setToast({ message: 'Copy failed. Please try again.', tone: 'error' });
    } finally {
      setTimeout(() => setToast(null), 2200);
    }
  }

  const disabled = !result || !originalText.trim();

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Share results</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Turn a result into a credible shareable artifact.</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Share a public result page, copy a clean summary for LinkedIn, or open a ready-to-share social card with tasteful attribution to {appConfig.founder.name}.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <ActionButton disabled={disabled || isLoading} onClick={async () => {
          const data = await ensureShareData();
          if (data) {
            await copyValue(data.shareUrl, 'share_link_copied', 'Share link copied.');
          }
        }}>Copy share link</ActionButton>

        <ActionButton disabled={disabled || isLoading} onClick={async () => {
          const data = await ensureShareData();
          if (data && derived) {
            await copyValue(`${derived.shareText} ${data.shareUrl}`, 'share_text_copied', 'Share text copied.');
          }
        }}>Copy share text</ActionButton>

        <ActionButton disabled={disabled || isLoading} onClick={async () => {
          const data = await ensureShareData();
          if (data) window.open(data.shareUrl, '_blank', 'noopener,noreferrer');
        }}>Open share page</ActionButton>

        <ActionButton disabled={disabled || isLoading} onClick={async () => {
          await ensureShareData();
          if (derived) {
            await copyValue(derived.summary, 'share_text_copied', 'Result summary copied.');
          }
        }}>Copy result summary</ActionButton>

        <ActionButton disabled={disabled || isLoading} onClick={async () => {
          const data = await ensureShareData();
          const imageUrl = data ? getResultImageUrl(data.token) : '';
          if (imageUrl) window.open(imageUrl, '_blank', 'noopener,noreferrer');
        }}>Open share image</ActionButton>

        <ActionButton disabled={disabled || isLoading} onClick={async () => {
          const data = await ensureShareData();
          if (!data) return;
          const payload = { version: 1 as const, id: 'preview', createdAt: new Date().toISOString(), mode, originalText, result: result! };
          window.open(buildXIntentUrl(payload, data.shareUrl), '_blank', 'noopener,noreferrer');
        }}>Share on X</ActionButton>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        LinkedIn sharing is usually manual, so “Copy share text” is optimized for pasting into a post, message, or comment.
      </div>

      {toast ? <Toast message={toast.message} tone={toast.tone} /> : null}
    </section>
  );
}

function ActionButton({ children, disabled, onClick }: { children: React.ReactNode; disabled?: boolean; onClick: () => void | Promise<void> }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => void onClick()}
      className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-400"
    >
      {children}
    </button>
  );
}
