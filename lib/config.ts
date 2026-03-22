export const APP_CONFIG = {
  name: 'HypeOmeter',
  description: 'Separate AI substance from AI vibes.',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  founder: {
    name: 'Jad El Omeiri',
    role: 'Senior Software Engineer',
    headline: 'Currently open to new opportunities',
    linkedinUrl: 'https://www.linkedin.com/in/jad-el-omeiri/',
    websiteUrl: process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL || '',
    githubUrl: process.env.NEXT_PUBLIC_FOUNDER_GITHUB_URL || '',
  },
  repoUrl: process.env.NEXT_PUBLIC_PROJECT_REPO_URL || '',
  share: {
    maxOriginalTextLength: 900,
    defaultCopy: 'Ran an AI post through {appName}. Hype: {hype}, Substance: {substance}. Verdict: {verdict}. {url} via {appName} by {founderName}',
  },
} as const;

export function optionalLinks() {
  return [
    APP_CONFIG.founder.websiteUrl
      ? { label: 'Website', href: APP_CONFIG.founder.websiteUrl }
      : null,
    APP_CONFIG.founder.githubUrl
      ? { label: 'GitHub', href: APP_CONFIG.founder.githubUrl }
      : null,
    APP_CONFIG.repoUrl ? { label: 'Project repo', href: APP_CONFIG.repoUrl } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;
}
