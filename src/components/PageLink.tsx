import Link from 'next/link';

interface Props {
  slug: string;
}

const PageLink: React.FC<Props> = ({ slug, children }) => (
  <Link href="/[...slug]" as={`/${slug}`}>
    {children}
  </Link>
);

export default PageLink;
