import styles from './MainContent.module.css';

interface Props {
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export default function MainContent({ children, fullWidth }: Props) {
  return (
    <main className={styles.root} data-full-width={fullWidth}>
      {children}
    </main>
  );
}
