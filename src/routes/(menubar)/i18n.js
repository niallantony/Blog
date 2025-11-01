import translations from "./translations";

export const translate = (locale, key) => {
  if (!key) throw new Error("No key provided for translation");
  if (!locale) throw new Error(`No translation available for ${key}`);
  let text = translations[locale][key];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  return text;
};
