import Menu from './Menu';
import { useState } from 'react';
import Link from 'next/link';
import { siteName } from '../config';
import styled from 'styled-components';
import media from '../media';

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  height: 50px;
  width: 40px;

  @media ${media.md} {
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

  @media ${media.sm} {
    display: block;
  }

  @media ${media.md} {
    font-size: 2em;
    margin-left: 2rem;
  }
`;

const ShortTitle = styled(TitleBase)`
  @media ${media.sm} {
    display: none;
  }
`;

const MenuToggle = styled.a`
  margin-left: auto;
  text-decoration: none;
  font-size: 1.2em;
  padding-left: 1rem;

  @media ${media.lg} {
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
          <Logo src="/images/msp_logo.svg" alt={siteName} />
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
