import { FormValues } from "./constants";

export type SupportedLanguagesDropdownProps = {
  handleLanguageChange: (language: string) => void;
  currentLanguage: { value: string; label: string };
};

export type SnipForm = {
  name: string;
  description: string;
};

export type onFormSubmitProps = {
  onFormSubmit: { [key: string]: string };
};

export interface NewSnipFormProps {
  onFormSubmit: (values: FormValues) => void;
}

export interface INewSnip extends FormValues {
  code: string;
  language: string;
}

export interface SnipData {
  id: string;
  code: string;
  createdAt: Date;
  description: string;
  language: string;
  name: string;
  userId: string;
  user: {
    clerkUserId: string;
  };
}

export type SnipDataArray = {
  snippet: SnipData[];
  index: number;
};
