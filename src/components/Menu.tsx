import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

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

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
  }
`;

const NavLink = styled(Link)<{ active: boolean }>`
  display: block;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: var(--color-menu-hover);
  }

  ${({ active }) =>
    active &&
    css`
      background: var(--color-menu-active) !important;
    `}
`;

const links = [
  { href: '/', label: 'Hem', exact: true },
  { href: '/kalender', label: 'Kalender' },
  { href: '/karen', label: 'Kåren' },
  { href: '/verksamhet', label: 'Verksamhet' },
  { href: '/evenemang', label: 'Evenemang och bilder' },
  { href: '/bli-medlem', label: 'Bli medlem' },
  { href: '/kontakt', label: 'Kontaktuppgifter' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<Props> = ({ open, onClose }) => {
  const { asPath } = useRouter();

  function isActive(href: string, exact = false) {
    return exact ? asPath === href : asPath.startsWith(href);
  }

  return (
    <Root mobileOpen={open}>
      {links.map(({ href, label, exact }) => (
        <NavLink
          key={href}
          href={href}
          active={isActive(href, exact)}
          onClick={onClose}
        >
          {label}
        </NavLink>
      ))}
    </Root>
  );
};

export default Menu;
