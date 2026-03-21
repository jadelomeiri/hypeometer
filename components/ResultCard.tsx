import { AnalysisMode, PublicResultPayload } from '../lib/types';
import { capitalize, truncateText } from '../lib/share';
import { appConfig } from '../lib/config';
import { cn } from '../lib/utils';

interface ResultCardProps {
  payload: Pick<PublicResultPayload, 'mode' | 'result' | 'originalText'>;
  compact?: boolean;
  showOriginalText?: boolean;
  className?: string;
}

const modeStyles: Record<AnalysisMode, string> = {
  normal: 'bg-slate-100 text-slate-700',
  strict: 'bg-amber-100 text-amber-800',
  brutal: 'bg-rose-100 text-rose-800',
};

export function ResultCard({ payload, compact = false, showOriginalText = true, className }: ResultCardProps) {
  const metrics = [
    { label: 'Hype', value: payload.result.hype },
    { label: 'Substance', value: payload.result.substance },
    { label: 'Evidence', value: payload.result.evidence },
    { label: 'Specificity', value: payload.result.specificity },
    { label: 'Operator', value: payload.result.operatorSignals },
  ];

  return (
    <div className={cn('overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-panel', className)}>
      <div className="border-b border-slate-100 bg-slate-950 px-6 py-5 text-white sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">{appConfig.appName}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{payload.result.verdict}</h3>
            <p className="mt-2 text-sm text-slate-300">AI-style likelihood: {capitalize(payload.result.aiStyleLikelihood)}</p>
          </div>
          <div className={cn('inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]', modeStyles[payload.mode])}>
            {capitalize(payload.mode)} mode
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 py-6 sm:px-8">
        <div className={cn('grid gap-3', compact ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-5')}>
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className={cn('grid gap-6', compact ? 'md:grid-cols-[1fr_0.95fr]' : 'lg:grid-cols-[1.1fr_0.9fr]')}>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Why it scored this way</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {payload.result.explanation.slice(0, compact ? 3 : 5).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Stronger rewrite</p>
              <p className="mt-4 text-sm leading-6 text-slate-700">{payload.result.strongerRewrite}</p>
            </div>
            {showOriginalText ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Original post</p>
                <p className="mt-4 text-sm leading-6 text-slate-700">{truncateText(payload.originalText, compact ? 180 : 320)}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-sm text-slate-600 sm:px-8">
        Built by {appConfig.founder.name}
      </div>
    </div>
  );
}
