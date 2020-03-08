import { INLINES, Document, EntryHyperlink } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import PageLink from '../components/PageLink';
import { Entry } from 'contentful';
import { ContentfulPage, ContentfulPost } from './data';
import PostLink from '../components/PostLink';

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
      } else {
        return <b>UNKNOWN LINK TYPE</b>;
      }
    },
  },
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
  return entry.sys?.contentType?.sys?.id === type;
}
