import { ContentfulAsset } from './data';

export function getAssetUrl(asset: ContentfulAsset | undefined) {
  return asset?.fields?.file?.url;
}

export function getAssetTitle(asset: ContentfulAsset | undefined) {
  return asset?.fields?.title;
}

export function getOpenGraphImageUrl(asset: ContentfulAsset | undefined) {
  const imageUrl = getAssetUrl(asset);
  return 'https:' + imageUrl + '?fit=fill&w=1200&h=630';
}
