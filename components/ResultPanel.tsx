import { AlertIcon, FlaskIcon, RadarIcon, WrenchIcon } from './icons';
import { AnalyzePostResult } from '../lib/types';
import { ResultSummaryCard } from './ResultSummaryCard';
import { ShareActions } from './ShareActions';

interface ResultPanelProps {
  result: AnalyzePostResult;
  originalText: string;
}

export function ResultPanel({ result, originalText }: ResultPanelProps) {
  return (
    <section className="space-y-6">
      <ResultSummaryCard result={result} />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <RadarIcon className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-semibold">Why it scored this way</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {result.explanation.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <FlaskIcon className="h-4 w-4 text-accent" />
              <h3 className="text-lg font-semibold">Interpretation</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Higher hype does not mean false, and lower AI-style phrasing likelihood does not mean human authorship.
              These are writing signals designed to help you separate strong claims from grounded operating detail.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <WrenchIcon className="h-4 w-4 text-success" />
              <h3 className="text-lg font-semibold">Rewrite as a serious post</h3>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{result.strongerRewrite}</p>
            <p className="mt-4 text-sm text-slate-500">Want this to land better? Use the stronger rewrite as a draft and add setup, metrics, and caveats before posting.</p>
          </div>
        </div>
      </div>

      <ShareActions result={result} originalText={originalText} />

      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <AlertIcon className="mt-0.5 h-4 w-4 text-slate-500" />
          <p>HypeOmeter evaluates writing signals, not factual truth or personal credibility.</p>
        </div>
      </div>
    </section>
  );
}
