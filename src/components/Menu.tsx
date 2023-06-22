import Link from 'next/link';
import styles from './Menu.module.css';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  function isActive(href: string, exact = false) {
    if (!pathname) return false;
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <nav className={styles.root} data-mobile-open={open}>
      {links.map(({ href, label, exact }) => (
        <Link
          className={styles.navLink}
          key={href}
          href={href}
          aria-current={isActive(href, exact) ? 'page' : undefined}
          onClick={onClose}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Menu;
