"use client";

import Prism from "prismjs";
import { useState, useEffect, useRef } from "react";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import highlight from "../components/codeHighlight";
import { SupportedLanguagesDropdown } from "@/components/ui/languages-radio-group";
import supportedLanguages from "@/lib/supportedLanguages";
import SavedSnips from "@/components/savedSnips";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState({
    value: "javascript",
    label: "JavaScript",
  });

  const [code, setCode] = useState(
    `const greet = () => { console.log("Hello, World!"); };`
  );
  const codeBlockRef = useRef<HTMLElement | null>(null);
  const handleLanguageChange = (languageValue: string) => {
    const selectedLanguage = supportedLanguages.find(
      (lang) => lang.value === languageValue
    );
    if (selectedLanguage) {
      setCurrentLanguage(selectedLanguage);
    }
  };

  useEffect(() => {
    if (codeBlockRef.current) {
      codeBlockRef.current.innerHTML = highlight(code, currentLanguage.value);
      Prism.highlightElement(codeBlockRef.current);
    }
  }, [code, currentLanguage]);

  return (
    <div className="p-2">
      <div className="mb-4">
        <h1 className="text-2xl pb-1">
          Easy to share. Authenticate and start sharing
        </h1>
        <p className="opacity-70">
          Sharing your code snippet has never been easier. Specify your language
          and share the code.
        </p>
      </div>
      <SavedSnips />
    </div>
  );
}
