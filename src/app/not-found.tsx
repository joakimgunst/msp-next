import Link from 'next/link';
import MainContent from '@/components/MainContent';
import AppHead from '@/components/AppHead';

export default function NotFound() {
  return (
    <MainContent fullWidth>
      <AppHead title="404" />

      <div>
        <h1>404: Sidan saknas</h1>
        <p>Sidan kunde tyvärr inte hittas.</p>
        <p>
          <Link href="/">Tillbaka till hemsidan</Link>
        </p>
      </div>
    </MainContent>
  );
}
