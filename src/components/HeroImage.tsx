import ContentfulImage from './ContentfulImage';
import { ContentfulAsset } from '../contentful/data';
import styles from './HeroImage.module.css';

interface Props {
  image: ContentfulAsset;
}

const HeroImage: React.FC<Props> = ({ image }) => {
  return (
    <div className={styles.root}>
      <ContentfulImage image={image} width={1200} height={800} />
    </div>
  );
};

export default HeroImage;
