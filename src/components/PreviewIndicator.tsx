'use client';

import styles from './PreviewIndicator.module.css';
import { usePathname } from 'next/navigation';

const PreviewIndicator: React.FC = () => {
  const pathname = usePathname();
  const exitLink = `/api/exit-preview?path=${pathname}`;

  return (
    <div className={styles.root}>
      <a className={styles.exitLink} href={exitLink}>
        Exit preview mode
      </a>
    </div>
  );
};

export default PreviewIndicator;
