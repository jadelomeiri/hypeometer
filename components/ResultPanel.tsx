import Link from 'next/link';

import { AlertIcon } from './icons';
import { AnalyzePostResult, AnalysisMode } from '../lib/types';
import { ResultCard } from './ResultCard';
import { ShareActions } from './ShareActions';
import { appConfig } from '../lib/config';

interface ResultPanelProps {
  result: AnalyzePostResult;
  originalText: string;
  mode: AnalysisMode;
}

export function ResultPanel({ result, originalText, mode }: ResultPanelProps) {
  return (
    <div className="space-y-6">
      <ResultCard payload={{ result, originalText, mode }} />

      <ShareActions result={result} originalText={originalText} mode={mode} />

      <section className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Pre-post quality check</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Want this to land better before you publish?</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use the stronger rewrite as a draft, add the real setup and caveats, and tighten the claim until the signal feels earned.
            </p>
          </div>
          <Link href="/" className="inline-flex h-fit items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Check another post
          </Link>
        </div>
      </section>

      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <AlertIcon className="mt-0.5 h-4 w-4 text-slate-500" />
          <p>
            HypeOmeter evaluates writing signals, not factual truth or personal credibility. Built by {appConfig.founder.name}.
          </p>
        </div>
      </div>
    </div>
  );
}
