export const appConfig = {
  appName: 'HypeOmeter',
  appDescription: 'Separate AI substance from AI vibes.',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  founder: {
    name: 'Jad El Omeiri',
    role: 'Senior Software Engineer',
    linkedinUrl: 'https://www.linkedin.com/in/jadelomeiri/',
    websiteUrl: '',
    githubUrl: '',
    tagline: 'Currently open to new opportunities',
  },
  share: {
    attributionSuffix: 'via HypeOmeter by Jad El Omeiri',
    defaultIntro: 'Ran an AI post through HypeOmeter.',
  },
  features: {
    leaderboard: false,
    shareImageDownload: true,
    sourceLink: true,
  },
  sourceUrl: '',
} as const;

export function getAbsoluteUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, appConfig.baseUrl).toString();
}
