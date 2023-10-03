import { Metadata } from 'next';
import { ContentfulAsset, ContentfulPage, ContentfulPost } from './data';
import { Entry, EntrySkeletonType } from 'contentful';
import { ContentfulLivePreview } from '@contentful/live-preview';

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

export function getMetadata(fields: ContentfulPage | ContentfulPost | null | undefined): Metadata | undefined {
  if (!fields) return;

  return {
    title: fields.title,
    ...(fields.image && {
      openGraph: { images: [getOpenGraphImageUrl(fields.image)] },
      twitter: { card: 'summary_large_image' },
    }),
  } satisfies Metadata;
}

export function getFieldAttrs<T extends EntrySkeletonType>(
  entry: Entry<T>,
  fieldId: Extract<keyof T['fields'], string>,
) {
  return ContentfulLivePreview.getProps({ entryId: entry.sys.id, fieldId });
}
