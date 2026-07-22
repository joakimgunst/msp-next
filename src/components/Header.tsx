'use client';

import Menu from './Menu';
import { useState } from 'react';
import Link from 'next/link';
import { siteName } from '../config';
import styles from './Header.module.css';
import Image from 'next/image';
import logo from '@/assets/msp_logo.svg';
import { MenuSubpages } from '@/utils/navigationUtils';

interface Props {
  subpages: MenuSubpages;
}

const Header: React.FC<Props> = ({ subpages }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Animate when toggling with the menu button, but close instantly when
  // navigating so the collapse doesn't shift the scroll position of the new page
  const [animate, setAnimate] = useState(true);

  const toggleMenu = () => {
    setAnimate(true);
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setAnimate(false);
    setMenuOpen(false);
  };

  return (
    <header>
      <div className={styles.headerTop}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt={siteName} />
        </Link>
        <div className={styles.title}>Scoutkåren Munksnäs Spejarna</div>
        <div className={styles.shortTitle}>Munksnäs Spejarna</div>
        <button className={styles.menuToggle} onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="site-menu">
          Meny
        </button>
      </div>
      <Menu open={menuOpen} onClose={closeMenu} animate={animate} subpages={subpages} />
    </header>
  );
};

export default Header;
