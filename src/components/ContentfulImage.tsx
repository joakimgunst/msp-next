import { getAssetUrl, getAssetTitle } from '../contentful/utils';
import type { ContentfulAsset } from '../contentful/data';
import Image from 'next/image';
import type { CSSProperties } from 'react';

interface Props {
  image: ContentfulAsset;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

const ContentfulImage: React.FC<Props> = ({ image, sizes, priority, width, height, className, style }) => {
  const url = getAssetUrl(image);
  const title = getAssetTitle(image);
  const imageDetails = image.fields.file?.details.image;

  if (!url) return null;

  return (
    <Image
      src={url}
      alt={title ?? ''}
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
      width={width ?? imageDetails?.width}
      height={height ?? imageDetails?.height}
    />
  );
};

export default ContentfulImage;
