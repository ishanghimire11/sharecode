"use client";

import Prism from "prismjs";

const loadLanguage = (language: string) => {
  if (!Prism.languages[language]) {
    try {
      require(`prismjs/components/prism-${language}`);
    } catch (e) {
      console.warn(`Prism does not support the language: ${language}`);
    }
  }
};

const highlight = (code: string, language = "javascript") => {
  loadLanguage(language);
  return Prism.highlight(code, Prism.languages[language], language);
};

export default highlight;
