import { Metadata } from 'next';
import { fetchContactPage, fetchSidebar } from '@/contentful/data';
import Contact from '@/components/Contact';
import Sidebar from '@/components/Sidebar';
import { renderDocument } from '@/contentful/render';
import MainContent from '@/components/MainContent';
import styles from './page.module.css';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

const SLUG = 'kontakt';

async function getData() {
  const { isEnabled } = await draftMode();
  return await Promise.all([fetchContactPage(isEnabled), fetchSidebar(SLUG, isEnabled)]);
}

export async function generateMetadata(): Promise<Metadata> {
  const [contactPage] = await getData();
  return {
    title: contactPage?.title,
  };
}

export default async function Page() {
  const [contactPage, sidebar] = await getData();

  if (!contactPage) {
    return notFound();
  }

  return (
    <MainContent>
      <div>
        <h1>{contactPage.title}</h1>
        <div className={styles.contacts}>
          {contactPage.contacts
            ?.filter((contact) => contact != undefined)
            .map((contact) => <Contact key={contact?.fields.name} contact={contact?.fields} />)}
        </div>
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
    </MainContent>
  );
}
