import { Metadata } from 'next';
import MainContent from '@/components/MainContent';
import styles from './page.module.css';

export const metadata = {
  title: 'Kalender',
} satisfies Metadata;

export default function Page() {
  return (
    <MainContent fullWidth>
      <div>
        <h1>{metadata.title}</h1>
        <iframe
          className={styles.iframe}
          src="https://www.google.com/calendar/embed?src=o41qm4rm0fh5u9c1oeigfssgjg%40group.calendar.google.com&ctz=Europe/Helsinki&hl=sv"
        ></iframe>
      </div>
    </MainContent>
  );
}
