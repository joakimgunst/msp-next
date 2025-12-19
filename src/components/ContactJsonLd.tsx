import { baseUrl } from '@/config';
import type { Organization, WithContext } from 'schema-dts';

export default function ContactJsonLd() {
  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: baseUrl,
    name: 'Scoutkåren Munksnäs Spejarna',
    description: 'Finlandssvensk landscoutkår verksam i Munksnäs i västra Helsingfors',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kadettvägen 2',
      addressLocality: 'Helsingfors',
      addressCountry: 'FI',
      postalCode: '00330',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
