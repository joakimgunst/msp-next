import Head from 'next/head';
import { siteName } from '../config';
import { getOpenGraphImageUrl } from '../contentful/utils';
import { ContentfulAsset } from '../contentful/data';

interface Props {
  title: string;
  image?: ContentfulAsset;
  noSiteName?: boolean;
}

export default function AppHead({ title, image, noSiteName }: Props) {
  const fullTitle = noSiteName ? title : `${title} – ${siteName}`;
  const ogImageUrl = getOpenGraphImageUrl(image);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:og:site_name" content={siteName} />
      <meta property="og:locale" content="sv_FI" />
      {ogImageUrl && (
        <>
          <meta property="og:image" content={ogImageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
        </>
      )}
    </Head>
  );
}
