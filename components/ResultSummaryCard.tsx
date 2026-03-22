import { APP_CONFIG } from '../lib/config';
import { AnalyzePostResult } from '../lib/types';
import { cn } from '../lib/utils';
import { ScoreCard } from './ScoreCard';

interface ResultSummaryCardProps {
  result: AnalyzePostResult;
  compact?: boolean;
  explanationLimit?: number;
  className?: string;
}

const likelihoodStyles = {
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  high: 'bg-rose-50 text-rose-700 border-rose-200',
};

export function ResultSummaryCard({ result, compact = false, explanationLimit = 3, className }: ResultSummaryCardProps) {
  const bullets = result.explanation.slice(0, explanationLimit);

  return (
    <section className={cn('rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-8', className)}>
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{APP_CONFIG.name}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{result.verdict}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">A compact summary designed to share, screenshot, and review before you publish.</p>
        </div>
        <div className={cn('inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium', likelihoodStyles[result.aiStyleLikelihood])}>
          AI-style phrasing likelihood: {result.aiStyleLikelihood}
        </div>
      </div>

      <div className={cn('mt-6 grid gap-4', compact ? 'sm:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-5')}>
        <ScoreCard label="Hype" score={result.hype} tone="warning" />
        <ScoreCard label="Substance" score={result.substance} tone="primary" />
        <ScoreCard label="Evidence" score={result.evidence} tone="success" />
        {!compact ? <ScoreCard label="Specificity" score={result.specificity} tone="primary" /> : null}
        {!compact ? <ScoreCard label="Operator signals" score={result.operatorSignals} tone="success" /> : null}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Why it scored this way</h3>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Built by {APP_CONFIG.founder.name}</p>
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
