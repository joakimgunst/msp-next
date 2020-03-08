import { AppProps } from 'next/app';
import 'normalize.css';
import '../styles/global.css';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);
dayjs.locale('sv');

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
