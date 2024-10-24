type SupportedLanguagesDropdownProps = {
  handleLanguageChange: (language: string) => void;
  currentLanguage: { value: string; label: string }; // Update type definition to match new structure
};
