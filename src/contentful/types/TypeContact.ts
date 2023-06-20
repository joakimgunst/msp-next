import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeContactFields {
    name: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    title?: EntryFieldTypes.Symbol;
    email?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
    order?: EntryFieldTypes.Integer;
}

export type TypeContactSkeleton = EntrySkeletonType<TypeContactFields, "contact">;
export type TypeContact<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContactSkeleton, Modifiers, Locales>;
