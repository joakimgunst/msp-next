import Menu from './Menu';
import classNames from 'classnames';

interface Props {
  fullWidth?: boolean;
}

const Layout: React.FC<Props> = ({ children, fullWidth }) => (
  <div className="layout">
    <Menu />
    <main className={classNames('main', !fullWidth && 'grid')}>{children}</main>

    <style jsx>{`
      .layout {
        margin: 0 auto;
        max-width: 68rem;
        padding: 1rem;
      }

      .main {
        margin-top: 2rem;
      }

      .main.grid {
        display: grid;
        grid-template-columns: 1fr 20rem;
        grid-gap: 3rem;
      }
    `}</style>
  </div>
);

export default Layout;
