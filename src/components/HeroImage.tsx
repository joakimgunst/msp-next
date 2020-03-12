import { Asset } from 'contentful';
import { getAssetUrl, getAssetTitle } from '../contentful/utils';

interface Props {
  image: Asset;
}

const HeroImage: React.FC<Props> = ({ image }) => {
  const imageUrl = getAssetUrl(image);
  const imageTitle = getAssetTitle(image);

  return (
    <div className="hero">
      <img
        className="hero-image"
        src={imageUrl + '?fit=fill&w=1200&h=800'}
        alt={imageTitle}
      />

      <style jsx>{`
        .hero {
          width: 100%;
          height: auto;
          padding-bottom: calc(2 / 3 * 100%);
          position: relative;
        }

        .hero-image {
          position: absolute;
          width: 100%;
          border-radius: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default HeroImage;
