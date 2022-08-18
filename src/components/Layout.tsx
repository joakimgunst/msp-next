interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <div className="layout">
    {children}

    <style jsx>{`
      .layout {
        margin: 0 auto;
        max-width: 68rem;
        padding: 2rem;
      }
    `}</style>
  </div>
);

export default Layout;
