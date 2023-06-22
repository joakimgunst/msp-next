import { getAssetUrl, getAssetTitle } from '../contentful/utils';
import { ContentfulAsset } from '../contentful/data';

interface Props {
  image: ContentfulAsset;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  className?: string;
}

const ContentfulImage: React.FC<Props> = ({ image, width, height, loading, className }) => {
  const url = getAssetUrl(image);
  const title = getAssetTitle(image);
  const src = `${url}?fit=fill&w=${width}&h=${height}`;

  return (
    <picture>
      <source type="image/webp" srcSet={`${src}&fm=webp`}></source>
      <img src={src} alt={title} className={className} loading={loading} />
    </picture>
  );
};

export default ContentfulImage;
