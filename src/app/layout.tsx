import { siteDescription, siteName } from '../config';
import 'normalize.css';
import '../styles/global.css';
import '../styles/fonts.css';
import Layout from '../components/Layout';
import Header from '../components/Header';
// import PreviewIndicator from '../components/PreviewIndicator';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `,
          }}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#315926" />
      </head>
      <body>
        <Layout>
          <Header />
          {/* <PreviewIndicator /> */}
          {children}
          <Analytics />
        </Layout>
      </body>
    </html>
  );
}
