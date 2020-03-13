import { AppProps } from 'next/app';
import 'normalize.css';
import '../styles/global.css';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Layout from '../components/Layout';
import Header from '../components/Header';

dayjs.extend(LocalizedFormat);
dayjs.locale('sv');

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
}
