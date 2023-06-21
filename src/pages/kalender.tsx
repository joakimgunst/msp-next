import { NextPage } from 'next';
import MainContent from '../components/MainContent';
import AppHead from '../components/AppHead';
import styles from './kalender.module.css';

const CalendarPage: NextPage = () => {
  const title = 'Kalender';

  return (
    <MainContent fullWidth>
      <AppHead title={title} />

      <div>
        <h1>{title}</h1>
        <iframe
          className={styles.iframe}
          src="https://www.google.com/calendar/embed?src=o41qm4rm0fh5u9c1oeigfssgjg%40group.calendar.google.com&ctz=Europe/Helsinki&hl=sv"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </MainContent>
  );
};

export default CalendarPage;
