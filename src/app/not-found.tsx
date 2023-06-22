import Link from 'next/link';
import MainContent from '@/components/MainContent';
import { Metadata } from 'next';

export const metadata = {
  title: '404',
} satisfies Metadata;

export default function NotFound() {
  return (
    <MainContent fullWidth>
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
