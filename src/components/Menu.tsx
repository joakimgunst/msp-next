import Link from 'next/link';
import PageLink from './PageLink';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<Props> = ({ open, onClose }) => {
  const { asPath } = useRouter();

  function getLinkClass(href: string, exact = false) {
    const active = exact ? asPath === href : asPath.startsWith(href);
    return classNames('link', active && 'active');
  }

  return (
    <nav className={classNames('menu', open && 'mobile-open')}>
      <Link href="/">
        <a className={getLinkClass('/', true)} onClick={onClose}>
          Hem
        </a>
      </Link>
      <Link href="/kalender">
        <a className={getLinkClass('/kalender')} onClick={onClose}>
          Kalender
        </a>
      </Link>
      <PageLink slug="karen">
        <a className={getLinkClass('/karen')} onClick={onClose}>
          Kåren
        </a>
      </PageLink>
      <PageLink slug="verksamhet">
        <a className={getLinkClass('/verksamhet')} onClick={onClose}>
          Verksamhet
        </a>
      </PageLink>
      <PageLink slug="evenemang">
        <a className={getLinkClass('/evenemang')} onClick={onClose}>
          Evenemang och bilder
        </a>
      </PageLink>
      <PageLink slug="bli-medlem">
        <a className={getLinkClass('/bli-medlem')} onClick={onClose}>
          Bli medlem
        </a>
      </PageLink>
      <Link href="/kontakt">
        <a className={getLinkClass('/kontakt')} onClick={onClose}>
          Kontaktuppgifter
        </a>
      </Link>

      <style jsx>{`
        .menu {
          display: none;
          flex-direction: column;
          background: var(--color-menu);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .menu.mobile-open {
          display: flex;
        }

        @media (min-width: 1024px) {
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
          background: var(--color-menu-hover);
        }

        .link.active {
          background: var(--color-menu-active);
        }
      `}</style>
    </nav>
  );
};

export default Menu;
