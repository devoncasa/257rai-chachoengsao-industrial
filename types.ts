
export enum Language {
  EN = 'en',
  TH = 'th',
  ZH = 'zh',
}

export type TranslationSet = {
  [key: string]: string;
};

export type Translations = {
  [key in Language]: TranslationSet;
};
