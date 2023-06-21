import Document, { Html, Head, Main, NextScript } from 'next/document';
import { siteDescription } from '../config';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

if (!GA_MEASUREMENT_ID) {
  throw new Error('NEXT_PUBLIC_GA_MEASUREMENT_ID env variable is missing');
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="sv">
        <Head>
          <meta
            name="keywords"
            content="msp, munksnäs, spejarna, scout, scouting, spejare, muncca, scoutkår, scoutkåren, hobby, friluft, vargunge, vandring, hajk, läger"
          />
          <meta name="description" content={siteDescription} />
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
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#315926" />
          <meta name="theme-color" content="#c62127" />
          <meta name="google-site-verification" content="D-TKUiiTZy6AaXE27F-yZplXObhC9VLi8BKdLXr7Gpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
