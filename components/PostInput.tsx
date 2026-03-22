'use client';

import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';

import { LoaderIcon, SparklesIcon } from './icons';
import { ResultPanel } from './ResultPanel';
import { AnalyzePostResponse } from '../lib/types';

const SAMPLE_POST = `AI is about to replace entire teams. We plugged in a new model and instantly got 10x productivity. This changes everything for every knowledge worker. If you are not rebuilding your company around AI right now, you are already behind. Here are 5 lessons every leader needs to know.`;

export function PostInput() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalyzePostResponse['result'] | null>(null);
  const [submittedText, setSubmittedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    const trimmedText = text.trim();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmedText }),
      });

      const payload = (await response.json()) as Partial<AnalyzePostResponse> & { error?: string };

      if (!response.ok || !payload.result) {
        throw new Error(payload.error ?? 'Unable to analyze this post right now.');
      }

      setResult(payload.result);
      setSubmittedText(trimmedText);
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unexpected error.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Single-page MVP</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Paste an AI LinkedIn post</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              HypeOmeter looks for writing patterns like sweeping claims, operator detail, evidence signals, and
              generic AI-style phrasing. It evaluates the post, not the person behind it.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setText(SAMPLE_POST);
              setError(null);
            }}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
          >
            Load sample post
          </button>
        </div>

        <label className="mt-6 block">
          <span className="sr-only">LinkedIn post text</span>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste a LinkedIn post about AI here..."
            className="min-h-[260px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base leading-7 text-slate-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
        </label>

        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Use HypeOmeter before posting to reduce hype and improve signal.
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted">Best for short posts, launch announcements, thought-leadership threads, and AI hot takes.</p>
            <Link href="/about" className="inline-flex text-sm font-medium text-primary transition hover:text-primary/80">Why this exists</Link>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
            >
              Check before publishing
            </button>
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="h-4 w-4" />
                  Analyzing...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-4 w-4" />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>

        {error ? <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      </form>

      <div ref={resultRef}>{result ? <ResultPanel result={result} originalText={submittedText} /> : null}</div>
    </div>
  );
}
