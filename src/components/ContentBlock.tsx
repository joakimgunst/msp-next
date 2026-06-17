import { renderDocument } from '../contentful/render';
import type { Document } from '@contentful/rich-text-types';
import styles from './ContentBlock.module.css';

interface Props {
  content: Document;
}

const ContentBlock: React.FC<Props> = ({ content }) => {
  return <div className={styles.root}>{renderDocument(content)}</div>;
};

export default ContentBlock;
