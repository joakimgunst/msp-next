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
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

if (!GA_MEASUREMENT_ID) {
  throw new Error('NEXT_PUBLIC_GA_MEASUREMENT_ID env variable is missing');
}

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
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>
        <Layout>
          <Header />
          {isEnabled && <PreviewIndicator />}
          {children}
          <Analytics />
        </Layout>
      </body>
    </html>
  );
}
