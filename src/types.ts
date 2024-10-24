export type SupportedLanguagesDropdownProps = {
  handleLanguageChange: (language: string) => void;
  currentLanguage: { value: string; label: string };
};
