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

export function getOpenGraphImageUrl2(url: string) {
  return url + '?fit=fill&w=1200&h=630';
}

export function getFullSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug.join('/') : slug;
}

export function getRootSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug[0] : slug;
}
