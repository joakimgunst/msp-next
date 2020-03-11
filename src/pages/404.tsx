import Head from 'next/head';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';

const NotFoundPage: NextPage = () => (
  <Layout fullWidth>
    <Head>
      <title>404 – Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>404: Sidan saknas</h1>
      <p>Sidan kunde tyvärr inte hittas.</p>
      <p>
        <Link href="/">Tillbaka till hemsidan</Link>
      </p>
    </main>
  </Layout>
);

export default NotFoundPage;
