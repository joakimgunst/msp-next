import { GetStaticProps, NextPage } from 'next';
import MainContent from '../components/MainContent';
import { siteName } from '../config';
import { ContentfulPage, fetchPage } from '../contentful/data';
import { renderDocument } from '../contentful/render';
import ReferenceNumberForm from '../components/ReferenceNumberForm';
import AppHead from '../components/AppHead';

interface Props {
  page: ContentfulPage | null;
}

const ReferenceNumberPage: NextPage<Props> = ({ page }) => {
  const title = page?.title ?? siteName;

  return (
    <MainContent>
      <AppHead title={title} />
      <div>
        <h1>{title}</h1>
        {page?.content && <div>{renderDocument(page.content)}</div>}
        <ReferenceNumberForm />
      </div>
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const [page] = await Promise.all([fetchPage('referensnummer', preview)]);
  return { props: { page } };
};

export default ReferenceNumberPage;
