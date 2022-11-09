import { NextPage } from 'next';
import Link from 'next/link';
import MainContent from '../components/MainContent';
import AppHead from '../components/AppHead';

const NotFoundPage: NextPage = () => (
  <MainContent fullWidth>
    <AppHead title="404" />

    <div>
      <h1>404: Sidan saknas</h1>
      <p>Sidan kunde tyvärr inte hittas.</p>
      <p>
        <Link href="/">
          <a>Tillbaka till hemsidan</a>
        </Link>
      </p>
    </div>
  </MainContent>
);

export default NotFoundPage;
