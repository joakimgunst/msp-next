import { AppProps } from 'next/app';
import 'normalize.css';
import '../styles/global.css';
import '../styles/fonts.css';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Layout from '../components/Layout';
import Header from '../components/Header';
import PreviewIndicator from '../components/PreviewIndicator';
import { Analytics } from '@vercel/analytics/react';

dayjs.extend(LocalizedFormat);
dayjs.locale('sv');

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
