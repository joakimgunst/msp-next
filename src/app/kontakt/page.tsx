import { Metadata } from 'next';
import { fetchContacts, fetchSidebar } from '@/contentful/data';
import Contact from '@/components/Contact';
import Sidebar from '@/components/Sidebar';
import { renderDocument } from '@/contentful/render';
import MainContent from '@/components/MainContent';
import styles from './page.module.css';

export const metadata = {
  title: 'Kontaktuppgifter',
} satisfies Metadata;

export default async function Page() {
  const preview = false; // TODO
  const [contacts, sidebar] = await Promise.all([fetchContacts(preview), fetchSidebar('kontakt', preview)]);

  return (
    <MainContent>
      <div>
        <h1>{metadata.title}</h1>
        <div className={styles.contacts}>
          {contacts.map((contact) => (
            <Contact key={contact.name} contact={contact} />
          ))}
        </div>
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
    </MainContent>
  );
}
