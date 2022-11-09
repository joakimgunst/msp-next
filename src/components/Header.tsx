import Menu from './Menu';
import { useState } from 'react';
import Link from 'next/link';
import { siteName } from '../config';
import styled from 'styled-components';

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  height: 50px;
  width: 40px;

  @media (min-width: 768px) {
    height: 100px;
    width: 80px;
  }
`;

const TitleBase = styled.div`
  font-weight: bold;
  font-family: 'Alegreya Sans', sans-serif;
  line-height: 1.2;
  font-size: 1.2em;
  margin-left: 1rem;
`;

const Title = styled(TitleBase)`
  display: none;

  @media (min-width: 640px) {
    display: block;
  }

  @media (min-width: 768px) {
    font-size: 2em;
    margin-left: 2rem;
  }
`;

const ShortTitle = styled(TitleBase)`
  @media (min-width: 640px) {
    display: none;
  }
`;

const MenuToggle = styled.a`
  margin-left: auto;
  text-decoration: none;
  font-size: 1.2em;
  padding-left: 1rem;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <HeaderTop>
        <Link href="/">
          <a>
            <Logo src="/images/msp_logo.svg" alt={siteName} />
          </a>
        </Link>
        <Title>Scoutkåren Munksnäs Spejarna</Title>
        <ShortTitle>Munksnäs Spejarna</ShortTitle>
        <MenuToggle onClick={toggleMenu}>Meny</MenuToggle>
      </HeaderTop>
      <Menu open={menuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
