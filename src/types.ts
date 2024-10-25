import { FormValues } from "./constants";

export type SupportedLanguagesDropdownProps = {
  handleLanguageChange: (language: string) => void;
  currentLanguage: { value: string; label: string };
};

export type SnipForm = {
  snipName: string;
  description: string;
};

export type onFormSubmitProps = {
  onFormSubmit: { [key: string]: string };
};

export interface NewSnipFormProps {
  onFormSubmit: (values: FormValues) => void;
}
