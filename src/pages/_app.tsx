import { AppProps } from 'next/app';
import 'normalize.css';
import '../styles/global.css';
import Layout from '../components/Layout';
import Header from '../components/Header';
import PreviewIndicator from '../components/PreviewIndicator';
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <PreviewIndicator />
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
