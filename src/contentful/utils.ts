import { Asset } from 'contentful';

export function getAssetUrl(asset: Asset | undefined) {
  return asset?.fields?.file?.url;
}

export function getAssetTitle(asset: Asset | undefined) {
  return asset?.fields?.title;
}
