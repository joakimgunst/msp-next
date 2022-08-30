import { Asset } from 'contentful';
import ContentfulImage from './ContentfulImage';

interface Props {
  image: Asset;
}

const HeroImage: React.FC<Props> = ({ image }) => {
  return (
    <div className="hero">
      <ContentfulImage image={image} width={1200} height={800} />

      <style jsx>{`
        .hero {
          width: 100%;
          height: auto;
          padding-bottom: calc(2 / 3 * 100%);
          position: relative;
        }

        .hero :global(img) {
          position: absolute;
          width: 100%;
          border-radius: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default HeroImage;
