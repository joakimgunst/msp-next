import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import Layout from '../components/Layout';
import {
  fetchContacts,
  fetchSidebar,
  ContentfulSidebar,
  ContentfulContact,
} from '../contentful/data';
import Contact from '../components/Contact';
import Sidebar from '../components/Sidebar';
import { renderDocument } from '../contentful/render';

interface Props {
  contacts: ContentfulContact[];
  sidebar: ContentfulSidebar | null;
}

const ContactPage: NextPage<Props> = ({ contacts, sidebar }) => (
  <Layout>
    <Head>
      <title>Kontaktuppgifter – Scoutkåren Munksnäs Spejarna</title>
    </Head>

    <main>
      <h1>Kontaktuppgifter</h1>
      <div className="contacts">
        {contacts.map(contact => (
          <Contact key={contact.name} contact={contact} />
        ))}
      </div>
    </main>

    {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}

    <style jsx>{`
      .contacts {
        display: grid;
        grid-template-columns: 1fr;
        grid-column-gap: 1rem;
        justify-items: center;
      }

      @media (min-width: 640px) {
        .contacts {
          grid-template-columns: 1fr 1fr;
        }
      }
    `}</style>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const [contacts, sidebar] = await Promise.all([
    fetchContacts(),
    fetchSidebar('kontakt'),
  ]);
  return { props: { contacts, sidebar } };
};

export default ContactPage;
