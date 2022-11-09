import { NextPage, GetStaticProps } from 'next';
import {
  ContentfulPost,
  fetchPosts,
  fetchPage,
  fetchSidebar,
  ContentfulPage,
  ContentfulSidebar,
} from '../contentful/data';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import PostSummary from '../components/PostSummary';
import MainContent from '../components/MainContent';
import HeroImage from '../components/HeroImage';
import { siteName } from '../config';
import Link from 'next/link';
import AppHead from '../components/AppHead';
import styled from 'styled-components';

const ShowAll = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
  posts: ContentfulPost[];
}

const HomePage: NextPage<Props> = ({ page, sidebar, posts }) => {
  const title = page?.title ?? siteName;

  return (
    <MainContent>
      <AppHead title={title} image={page?.image} noSiteName />

      <div>
        <h1>{title}</h1>
        {page?.image && <HeroImage image={page.image} />}
        {page?.content && <div>{renderDocument(page.content)}</div>}

        <h2>Aktuellt</h2>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}

        <ShowAll>
          <Link href="/aktuellt">Visa alla nyheter...</Link>
        </ShowAll>
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const [page, sidebar, posts] = await Promise.all([
    fetchPage('hem', preview),
    fetchSidebar('hem', preview),
    fetchPosts(preview, 3),
  ]);
  return { props: { page, sidebar, posts } };
};

export default HomePage;
