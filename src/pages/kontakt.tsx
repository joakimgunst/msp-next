import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';

const ContactPage: NextPage = () => (
  <Layout>
    <Head>
      <title>Kontaktuppgifter – Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>Kontaktuppgifter</h1>
      <Link href="/">
        <a>Tillbaka hem</a>
      </Link>
    </main>
  </Layout>
);

export default ContactPage;
