import Link from 'next/link';
import styles from './Menu.module.css';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MenuSubpages } from '@/utils/navigationUtils';

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
  subpages: MenuSubpages;
}

const Menu: React.FC<Props> = ({ open, onClose, subpages }) => {
  const pathname = usePathname();
  // Expand the section of the current page by default
  const [expanded, setExpanded] = useState<string[]>(() => (pathname ? [`/${pathname.split('/')[1]}`] : []));

  function isActive(href: string, exact = false) {
    if (!pathname) return false;
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function toggleExpanded(href: string) {
    setExpanded((prev) => (prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]));
  }

  return (
    <nav id="site-menu" aria-label="Huvudmeny" className={styles.root} data-mobile-open={open}>
      {links.map(({ href, label, exact }) => {
        const items = subpages[href] ?? [];
        const isExpanded = expanded.includes(href);
        const subListId = `site-menu-sub${href.replaceAll('/', '-')}`;

        return (
          <div className={styles.group} key={href}>
            <div className={styles.groupHeader}>
              <Link
                className={styles.navLink}
                href={href}
                aria-current={isActive(href, exact) ? 'page' : undefined}
                onClick={onClose}
              >
                {label}
              </Link>
              {items.length > 0 && (
                <button
                  className={styles.expandToggle}
                  aria-expanded={isExpanded}
                  aria-controls={subListId}
                  aria-label={`Undersidor för ${label}`}
                  onClick={() => toggleExpanded(href)}
                >
                  <svg className={styles.chevron} viewBox="0 0 16 16" width="16" height="16" aria-hidden>
                    <path
                      d="M3 6l5 5 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
            {items.length > 0 && isExpanded && (
              <div id={subListId} className={styles.subList}>
                {items.map((item) => (
                  <Link
                    key={item.href}
                    className={styles.subLink}
                    href={item.href}
                    aria-current={isActive(item.href, true) ? 'page' : undefined}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Menu;
