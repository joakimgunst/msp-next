'use client';

import Menu from './Menu';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { siteName } from '../config';
import styles from './Header.module.css';
import Image from 'next/image';
import logo from '@/assets/msp_logo.svg';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header>
      <div className={styles.headerTop}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt={siteName} />
        </Link>
        <div className={styles.title}>Scoutkåren Munksnäs Spejarna</div>
        <div className={styles.shortTitle}>Munksnäs Spejarna</div>
        <button className={styles.menuToggle} onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="main-nav">
          Meny
        </button>
      </div>
      <Menu open={menuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
