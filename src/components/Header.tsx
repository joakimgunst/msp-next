import Menu from './Menu';
import { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <header className="header">
      <div className="header-top">
        <Link href="/">
          <a>
            <img
              className="logo"
              src="/images/msp_logo.svg"
              alt="Scoutkåren Munksnäs Spejarna"
            />
          </a>
        </Link>
        <div className="title">Scoutkåren Munksnäs Spejarna</div>
        <div className="short-title">Munksnäs Spejarna</div>
        <a className="menu-toggle" onClick={toggleMenu}>
          Meny
        </a>
      </div>
      <Menu mobileVisible={menuVisible} />

      <style jsx>{`
        .header-top {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .logo {
          height: 50px;
          width: 40px;
        }

        .title,
        .short-title {
          font-weight: bold;
          font-family: 'Alegreya Sans', sans-serif;
          line-height: 1.2;
          font-size: 1.2em;
          margin-left: 1rem;
        }

        .title {
          display: none;
        }

        .menu-toggle {
          margin-left: auto;
          text-decoration: none;
          font-size: 1.2em;
          padding-left: 1rem;
        }

        @media (min-width: 640px) {
          .title {
            display: block;
          }

          .short-title {
            display: none;
          }
        }

        @media (min-width: 768px) {
          .logo {
            height: 100px;
            width: 80px;
          }

          .title {
            font-size: 2em;
            margin-left: 2rem;
          }

          .menu-toggle {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
