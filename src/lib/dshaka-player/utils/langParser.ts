export function languageParser(locale: string) {
  // Handle some special cases first.  These are reserved language tags that
  // are used to indicate something that isn't one specific language.
  switch (locale) {
    case 'mul':
      return 'Multiple Languages';
    case 'und':
      return 'Default';
    case 'zxx':
      return 'Not applicable';
    default:
      break;
  }

  // If Intl.DisplayNames is supported we prefer it, because the list of
  // languages is up to date.
  if (window.Intl && 'DisplayNames' in Intl) {
    const userLanguage = navigator.language;
    try {
      const languageNames = new Intl.DisplayNames([userLanguage], {
        type: 'language',
      });
      const language = languageNames.of(locale);
      return language.charAt(0).toUpperCase() + language.slice(1);
    } catch (e) {
      // Ignore errors and return the original locale as fallback
      return `Unrecognized (${locale})`;
    }
  }

  const language = shaka.util.LanguageUtils.getBase(locale);

  // First try to resolve the full language name.
  // If that fails, try the base.
  // Finally, report "unknown".
  // When there is a loss of specificity (either to a base language or to
  // "unknown"), we should append the original language code.
  // Otherwise, there may be multiple identical-looking items in the list.
  // if (locale in mozilla.LanguageMapping) {
  // 	return mozilla.LanguageMapping[locale].nativeName;
  // }
  // if (language in mozilla.LanguageMapping) {
  // 	return `${mozilla.LanguageMapping[language].nativeName} (${locale})`;
  // }

  return `Unrecognized (${locale})`;
}