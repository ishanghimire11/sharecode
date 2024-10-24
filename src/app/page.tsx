"use client";

import Prism from "prismjs";
import { useState, useEffect, useRef } from "react";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import highlight from "../components/codeHighlight";
import { SupportedLanguagesDropdown } from "@/components/ui/languages-radio-group";
import supportedLanguages from "@/lib/supportedLanguages";

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

      <SupportedLanguagesDropdown
        handleLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      <div className="flex flex-col md:flex-row gap-6 mt-2 h-[70dvh]">
        <textarea
          className="min-h-96 h-full p-2 border rounded resize-none w-full md:max-w-1/2 md:w-1/2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type or paste your code here..."
        ></textarea>

        <div className={`h-full w-full md:max-w-1/2 md:w-1/2 line-numbers`}>
          <pre
            className={`h-full overflow-scroll focus-visible:outline-0 !m-0 line-numbers language-${currentLanguage.value}`}
          >
            <code
              ref={codeBlockRef} // Attach the ref to the code block
              className={`language-${currentLanguage.value}`}
            ></code>
          </pre>
        </div>
      </div>
    </div>
  );
}
