import Menu from './Menu';

const Layout: React.FC = ({ children }) => (
  <div className="layout">
    <Menu />
    {children}

    <style jsx>{`
      .layout {
        margin: 0 auto;
        max-width: 60rem;
        padding: 1rem;
      }
    `}</style>
  </div>
);

export default Layout;
