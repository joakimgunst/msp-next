import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSidebarFields {
    name: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
}

export type TypeSidebarSkeleton = EntrySkeletonType<TypeSidebarFields, "sidebar">;
export type TypeSidebar<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSidebarSkeleton, Modifiers, Locales>;
