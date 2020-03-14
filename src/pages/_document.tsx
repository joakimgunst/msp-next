import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="sv">
        <Head>
          <meta
            name="keywords"
            content="msp, munksnäs, spejarna, scout, scouting, spejare, muncca, scoutkår, scoutkåren, hobby, friluft, vargunge, vandring, hajk, läger"
          />
          <meta
            name="description"
            content="Scoutkåren Munksnäs Spejarna r.f., förkortat MSP, är en finlandssvensk landscoutkår verksam i Munksnäs i västra Helsingfors."
          />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Alegreya:400,700,400italic,700italic"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Alegreya+Sans:400,700,400italic,700italic"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
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
