import Link from 'next/link';
import PageLink from './PageLink';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import media from '../media';

const Root = styled.nav<{ mobileOpen: boolean }>`
  display: none;
  flex-direction: column;
  background: var(--color-menu);
  border-radius: 0.5rem;
  overflow: hidden;

  ${({ mobileOpen }) =>
    mobileOpen &&
    css`
      display: flex;
    `}

  @media ${media.lg} {
    display: flex;
    flex-direction: row;
  }

  a {
    display: block;
    padding: 0.5rem 1rem;
    color: white;
    text-decoration: none;
    transition: background 0.2s;
  }

  a:hover {
    background: var(--color-menu-hover);
  }

  a.active {
    background: var(--color-menu-active);
  }
`;

interface Props {
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<Props> = ({ open, onClose }) => {
  const { asPath } = useRouter();

  function getLinkClass(href: string, exact = false) {
    const active = exact ? asPath === href : asPath.startsWith(href);
    return active ? 'active' : undefined;
  }

  return (
    <Root mobileOpen={open}>
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
    </Root>
  );
};

export default Menu;
