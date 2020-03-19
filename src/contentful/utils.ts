import { Asset } from 'contentful';

export function getAssetUrl(asset: Asset | undefined) {
  return asset?.fields?.file?.url;
}

export function getAssetTitle(asset: Asset | undefined) {
  return asset?.fields?.title;
}

export function getOpenGraphImageUrl(asset: Asset | undefined) {
  const imageUrl = getAssetUrl(asset);
  return 'https:' + imageUrl + '?fit=fill&w=1200&h=630';
}
