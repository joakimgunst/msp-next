import Link from 'next/link';
import PageLink from './PageLink';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface Props {
  mobileVisible: boolean;
}

const Menu: React.FC<Props> = ({ mobileVisible }) => {
  const { asPath } = useRouter();

  function getLinkClass(href: string, exact = false) {
    const active = exact ? asPath === href : asPath.startsWith(href);
    return classNames('link', active && 'active');
  }

  return (
    <nav className={classNames('menu', mobileVisible && 'mobile-visible')}>
      <Link href="/">
        <a className={getLinkClass('/', true)}>Hem</a>
      </Link>
      <Link href="/kalender">
        <a className={getLinkClass('/kalender')}>Kalender</a>
      </Link>
      <PageLink slug="karen">
        <a className={getLinkClass('/karen')}>Kåren</a>
      </PageLink>
      <PageLink slug="verksamhet">
        <a className={getLinkClass('/verksamhet')}>Verksamhet</a>
      </PageLink>
      <PageLink slug="bli-medlem">
        <a className={getLinkClass('/bli-medlem')}>Bli medlem</a>
      </PageLink>
      <Link href="/kontakt">
        <a className={getLinkClass('/kontakt')}>Kontaktuppgifter</a>
      </Link>

      <style jsx>{`
        .menu {
          display: none;
          flex-direction: column;
          background: var(--color-red);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .menu.mobile-visible {
          display: flex;
        }

        @media (min-width: 768px) {
          .menu {
            display: flex;
            flex-direction: row;
          }
        }

        .link {
          display: block;
          padding: 0.5rem 1rem;
          color: white;
          text-decoration: none;
          transition: background 0.2s;
        }

        .link:hover {
          background: var(--color-red-light);
        }

        .link.active {
          background: var(--color-red-dark);
        }
      `}</style>
    </nav>
  );
};

export default Menu;
