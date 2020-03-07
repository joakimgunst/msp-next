import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';
import { contentfulClient, Post } from '../data/contentful';

interface InitialProps {
  posts: Post[];
}

const Home: NextPage<InitialProps> = props => (
  <div className="container">
    <Head>
      <title>Scoutkåren Munksnäs Spejarna</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Scoutkåren Munksnäs Spejarna</h1>
      <ul>
        {props.posts.map(post => (
          <li key={post.slug}>
            <Link href={post.slug}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

Home.getInitialProps = async () => {
  const entries = await contentfulClient.getEntries<Post>({
    content_type: 'post',
  });
  return {
    posts: entries.items.map(item => item.fields),
  };
};

export default Home;
