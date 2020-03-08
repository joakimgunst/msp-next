import Head from 'next/head';
import { NextPage } from 'next';
import Layout from '../components/Layout';

const CalendarPage: NextPage = () => (
  <Layout>
    <Head>
      <title>Kalender – Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>Kalender</h1>
      <iframe
        src="https://www.google.com/calendar/embed?src=o41qm4rm0fh5u9c1oeigfssgjg%40group.calendar.google.com&ctz=Europe/Helsinki&hl=sv"
        className="calendar"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </main>

    <style jsx>{`
      .calendar {
        width: 100%;
        height: 600px;
      }
    `}</style>
  </Layout>
);

export default CalendarPage;
