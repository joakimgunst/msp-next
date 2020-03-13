import classNames from 'classnames';

interface Props {
  fullWidth?: boolean;
}

const MainContent: React.FC<Props> = ({ children, fullWidth }) => (
  <main className={classNames('main', fullWidth && 'full-width')}>
    {children}

    <style jsx>{`
      .main {
        margin-top: 2rem;
        display: grid;
        grid-gap: 2rem;
      }

      @media (min-width: 1024px) {
        .main {
          grid-template-columns: 1fr 20rem;
          grid-gap: 3rem;
        }
      }

      .full-width {
        grid-template-columns: 1fr;
      }
    `}</style>
  </main>
);

export default MainContent;
