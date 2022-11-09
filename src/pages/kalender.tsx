import { NextPage } from 'next';
import MainContent from '../components/MainContent';
import AppHead from '../components/AppHead';
import styled from 'styled-components';

const Iframe = styled.iframe`
  width: 100%;
  height: 600px;
`;

const CalendarPage: NextPage = () => {
  const title = 'Kalender';

  return (
    <MainContent fullWidth>
      <AppHead title={title} />

      <div>
        <h1>{title}</h1>
        <Iframe
          src="https://www.google.com/calendar/embed?src=o41qm4rm0fh5u9c1oeigfssgjg%40group.calendar.google.com&ctz=Europe/Helsinki&hl=sv"
          frameBorder="0"
          scrolling="no"
        ></Iframe>
      </div>
    </MainContent>
  );
};

export default CalendarPage;
