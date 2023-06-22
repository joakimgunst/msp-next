import { baseUrl, siteDescription, siteName } from '@/config';
import 'normalize.css';
import '@/styles/global.css';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import PreviewIndicator from '@/components/PreviewIndicator';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Alegreya, Alegreya_Sans } from 'next/font/google';
import clsx from 'clsx';
import { draftMode } from 'next/headers';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata = {
  title: {
    template: `%s – ${siteName}`,
    default: siteName,
  },
  description: siteDescription,
  keywords:
    'msp, munksnäs, spejarna, scout, scouting, spejare, muncca, scoutkår, scoutkåren, hobby, friluft, vargunge, vandring, hajk, läger',
  metadataBase: new URL(baseUrl),
  openGraph: {
    siteName,
    locale: 'sv_FI',
  },
  manifest: '/site.webmanifest',
  themeColor: '#c62127',
  verification: {
    google: 'D-TKUiiTZy6AaXE27F-yZplXObhC9VLi8BKdLXr7Gpg',
  },
} satisfies Metadata;

const alegreya = Alegreya({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
});

const alegreyaSans = Alegreya_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode();

  return (
    <html lang="sv" className={clsx(alegreya.variable, alegreyaSans.variable)}>
      <body>
        <Layout>
          <Header />
          {isEnabled && <PreviewIndicator />}
          {children}
          <Analytics />
          <GoogleAnalytics />
        </Layout>
      </body>
    </html>
  );
}
