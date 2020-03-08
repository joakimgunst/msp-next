const Sidebar: React.FC = ({ children }) => (
  <aside className="sidebar">
    {children}

    <style jsx>{`
      .sidebar {
        padding: 1.25rem;
        background: var(--color-shading);
        border-radius: 0.5em;
      }

      .sidebar :global(h2:first-child) {
        margin-top: 0;
      }
    `}</style>
  </aside>
);

export default Sidebar;
