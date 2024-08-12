import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeContactSkeleton } from "./TypeContact";

export interface TypeContactPageFields {
    title: EntryFieldTypes.Symbol;
    contacts?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeContactSkeleton>>;
}

export type TypeContactPageSkeleton = EntrySkeletonType<TypeContactPageFields, "contactPage">;
export type TypeContactPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContactPageSkeleton, Modifiers, Locales>;
