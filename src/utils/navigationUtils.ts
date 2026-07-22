import { ContentfulPage } from '@/contentful/data';

export interface MenuSubpage {
  href: string;
  label: string;
}

export type MenuSubpages = Record<string, MenuSubpage[]>;

// Groups second-level pages (e.g. verksamhet/vargungar) under their root path
// so the menu can show them as subitems. Deeper pages are left to sidebars and
// content links.
export function getMenuSubpages(pages: Pick<ContentfulPage, 'slug' | 'title'>[]): MenuSubpages {
  const subpages: MenuSubpages = {};

  for (const page of pages) {
    const parts = page.slug.split('/');
    if (parts.length !== 2) continue;
    const root = `/${parts[0]}`;
    (subpages[root] ??= []).push({ href: `/${page.slug}`, label: page.title });
  }

  for (const items of Object.values(subpages)) {
    items.sort((a, b) => a.label.localeCompare(b.label, 'sv'));
  }

  return subpages;
}
