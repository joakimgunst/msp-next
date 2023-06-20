import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePostFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    image?: EntryFieldTypes.AssetLink;
    lead: EntryFieldTypes.RichText;
    content?: EntryFieldTypes.RichText;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;
export type TypePost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePostSkeleton, Modifiers, Locales>;
