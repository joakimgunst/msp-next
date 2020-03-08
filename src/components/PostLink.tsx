import Link from 'next/link';

interface Props {
  slug: string;
}

const PostLink: React.FC<Props> = ({ slug, children }) => (
  <Link href="/post/[slug]" as={`/post/${slug}`}>
    <a>{children}</a>
  </Link>
);

export default PostLink;
