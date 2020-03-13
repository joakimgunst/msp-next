import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';
import MainContent from '../components/MainContent';

const NotFoundPage: NextPage = () => (
  <MainContent fullWidth>
    <Head>
      <title>404 – Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <div>
      <h1>404: Sidan saknas</h1>
      <p>Sidan kunde tyvärr inte hittas.</p>
      <p>
        <Link href="/">
          <a>Tillbaka till hemsidan</a>
        </Link>
      </p>
    </div>
  </MainContent>
);

export default NotFoundPage;
