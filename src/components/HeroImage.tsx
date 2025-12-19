import ContentfulImage from './ContentfulImage';
import type { ContentfulAsset } from '../contentful/data';
import styles from './HeroImage.module.css';

interface Props {
  image: ContentfulAsset;
}

const HeroImage: React.FC<Props> = ({ image }) => {
  return <ContentfulImage image={image} sizes="(min-width: 1024px) 656px, 100vw" priority className={styles.root} />;
};

export default HeroImage;
