import { baseUrl, siteDescription, siteName } from '@/config';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import PreviewIndicator from '@/components/PreviewIndicator';
import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from 'next';
import { Alegreya, Alegreya_Sans } from 'next/font/google';
import clsx from 'clsx';
import { draftMode } from 'next/headers';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './global.css';

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
  verification: {
    google: 'HAyauckTv9oJkAgtOH4xiHcAemTi3Bsa7Bo3GxIqBdw',
  },
} satisfies Metadata;

export const viewport: Viewport = {
  themeColor: '#c62127',
};

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

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
