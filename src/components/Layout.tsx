import Menu from './Menu';
import classNames from 'classnames';

interface Props {
  fullWidth?: boolean;
}

const Layout: React.FC<Props> = ({ children, fullWidth }) => (
  <div className="layout">
    <Menu />
    <div className={classNames('content', !fullWidth && 'grid')}>
      {children}
    </div>

    <style jsx>{`
      .layout {
        margin: 0 auto;
        max-width: 68rem;
        padding: 2rem;
      }

      .content {
        margin-top: 2rem;
      }

      .grid {
        display: grid;
        grid-gap: 2rem;
      }

      @media (min-width: 1024px) {
        .grid {
          grid-template-columns: 1fr 20rem;
          grid-gap: 3rem;
        }
      }
    `}</style>
  </div>
);

export default Layout;
