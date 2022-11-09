import { NextPage, GetStaticProps } from 'next';
import {
  fetchContacts,
  fetchSidebar,
  ContentfulSidebar,
  ContentfulContact,
} from '../contentful/data';
import Contact from '../components/Contact';
import Sidebar from '../components/Sidebar';
import { renderDocument } from '../contentful/render';
import MainContent from '../components/MainContent';
import AppHead from '../components/AppHead';
import styled from 'styled-components';

const Contacts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  justify-items: center;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

interface Props {
  contacts: ContentfulContact[];
  sidebar: ContentfulSidebar | null;
}

const ContactPage: NextPage<Props> = ({ contacts, sidebar }) => (
  <MainContent>
    <AppHead title="Kontaktuppgifter" />

    <div>
      <h1>Kontaktuppgifter</h1>
      <Contacts>
        {contacts.map((contact) => (
          <Contact key={contact.name} contact={contact} />
        ))}
      </Contacts>
    </div>

    {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
  </MainContent>
);

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const [contacts, sidebar] = await Promise.all([
    fetchContacts(preview),
    fetchSidebar('kontakt', preview),
  ]);
  return { props: { contacts, sidebar } };
};

export default ContactPage;
