import type { Metadata } from 'next';

import { APP_CONFIG } from '../lib/config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.baseUrl),
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
