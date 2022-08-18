import Link from 'next/link';

interface Props {
  slug: string;
  children?: React.ReactNode;
}

const PostLink: React.FC<Props> = ({ slug, children }) => (
  <Link href="/post/[slug]" as={`/post/${slug}`}>
    {children}
  </Link>
);

export default PostLink;
