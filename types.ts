// Fix: Removed self-import of `Language` which was causing a declaration conflict.
export enum Language {
  EN = 'en',
  TH = 'th',
  ZH = 'zh',
  JA = 'ja',
}

export type TranslationSet = {
  [key: string]: any; // Allow nested structures for cleaner data management
};

export type Translations = {
  [key in Language]: TranslationSet;
};