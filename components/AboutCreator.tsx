import { appConfig } from '../lib/config';

export function AboutCreator() {
  return (
    <section className="rounded-[2rem] border border-border bg-card p-6 shadow-panel sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">About the creator</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Built by {appConfig.founder.name}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
        HypeOmeter was built by {appConfig.founder.name}, a {appConfig.founder.role.toLowerCase()} interested in separating signal from noise in AI discourse. He built it to help founders, operators, and job-seekers publish more grounded writing and see past polished AI takes. He is currently exploring new opportunities.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={appConfig.founder.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">Connect on LinkedIn</a>
        {appConfig.founder.githubUrl ? <a href={appConfig.founder.githubUrl} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">GitHub</a> : null}
        {appConfig.founder.websiteUrl ? <a href={appConfig.founder.websiteUrl} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">Website</a> : null}
      </div>
    </section>
  );
}
