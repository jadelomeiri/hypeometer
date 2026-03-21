import type { Metadata } from 'next';

import { appConfig } from '../lib/config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.baseUrl),
  title: appConfig.appName,
  description: appConfig.appDescription,
  openGraph: {
    title: appConfig.appName,
    description: appConfig.appDescription,
    siteName: appConfig.appName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: appConfig.appName,
    description: appConfig.appDescription,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
