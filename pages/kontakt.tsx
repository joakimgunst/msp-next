import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';

const Kontakt: NextPage = () => (
  <div className="container">
    <Head>
      <title>Scoutkåren Munksnäs Spejarna</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Kontaktuppgifter</h1>
      <Link href="/">
        <a>Tillbaka hem</a>
      </Link>
    </main>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
);

export default Kontakt;
