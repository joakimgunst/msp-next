import { useRouter } from 'next/router';
import styles from './PreviewIndicator.module.css';

const PreviewIndicator: React.FC = () => {
  const router = useRouter();
  if (!router.isPreview) return null;
  const exitLink = `/api/exit-preview?path=${router.asPath}`;
  return (
    <div className={styles.root}>
      <a className={styles.exitLink} href={exitLink}>
        Exit preview mode
      </a>
    </div>
  );
};

export default PreviewIndicator;
