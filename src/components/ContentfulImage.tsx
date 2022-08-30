import { Asset } from 'contentful';
import { getAssetUrl, getAssetTitle } from '../contentful/utils';

interface Props {
  image: Asset;
  width: number;
  height: number;
}

const ContentfulImage: React.FC<Props> = ({ image, width, height }) => {
  const url = getAssetUrl(image);
  const title = getAssetTitle(image);
  const src = `${url}?fit=fill&w=${width}&h=${height}`;

  return (
    <picture>
      <source type="image/webp" srcSet={`${src}&fm=webp`}></source>
      <img src={src} alt={title} />
    </picture>
  );
};

export default ContentfulImage;
