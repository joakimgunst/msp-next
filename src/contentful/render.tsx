/* eslint-disable react/display-name */
import {
  INLINES,
  BLOCKS,
  Document,
  EntryHyperlink,
  AssetHyperlink,
  AssetLinkBlock,
  Hyperlink,
} from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import PageLink from '../components/PageLink';
import { Entry, Asset } from 'contentful';
import { ContentfulPage, ContentfulPost } from './data';
import PostLink from '../components/PostLink';
import { ReactNode } from 'react';
import Link from 'next/link';

const options: Options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      const link = node as EntryHyperlink;
      const target = link.data.target;
      if (isPageEntry(target)) {
        return (
          <PageLink slug={target.fields.slug}>
            <a>{children}</a>
          </PageLink>
        );
      } else if (isPostEntry(target)) {
        return (
          <PostLink slug={target.fields.slug}>
            <a>{children}</a>
          </PostLink>
        );
      }
      return <b>UNKNOWN ENTRY</b>;
    },
    [INLINES.ASSET_HYPERLINK]: (node, children) => {
      const link = node as AssetHyperlink;
      const target = link.data.target;
      if (isAsset(target)) {
        return (
          <a
            href={target.fields.file?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return <b>UNKNOWN ASSET</b>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const link = node as AssetLinkBlock;
      const target = link.data.target;
      if (isAsset(target)) {
        return <img src={target.fields.file?.url} alt={target.fields.title} />;
      }
      return <b>UNKNOWN ASSET</b>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const link = node as Hyperlink;
      const uri = link.data.uri;
      if (uri.startsWith('/')) {
        return (
          <Link href={uri}>
            <a>{children}</a>
          </Link>
        );
      }
      return <a href={uri}>{children}</a>;
    },
  },
  renderText: (text) =>
    text.split('\n').reduce<ReactNode[]>((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []),
};

export function renderDocument(document: Document) {
  return documentToReactComponents(document, options);
}

type AnyEntry = { sys: unknown };

function isPageEntry(target: AnyEntry): target is Entry<ContentfulPage> {
  return isEntryType('page', target);
}

function isPostEntry(target: AnyEntry): target is Entry<ContentfulPost> {
  return isEntryType('post', target);
}

function isEntryType(type: string, target: AnyEntry) {
  const entry = target as Entry<unknown>;
  return entry.sys.contentType?.sys.id === type;
}

function isAsset(target: AnyEntry): target is Asset {
  const entry = target as Asset;
  return entry.sys.type === 'Asset';
}
