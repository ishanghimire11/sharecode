"use client";

import { useState, useEffect } from "react";
import "prismjs/themes/prism-okaidia.css";

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
  const [highlightedCode, setHighlightedCode] = useState("");

  const handleLanguageChange = (languageValue: string) => {
    const selectedLanguage = supportedLanguages.find(
      (lang) => lang.value === languageValue
    );
    if (selectedLanguage) {
      setCurrentLanguage(selectedLanguage);
    }
  };

  useEffect(() => {
    setHighlightedCode(highlight(code, currentLanguage.value));
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

      <div className="flex flex-col gap-6 mt-2">
        <textarea
          className="w-full min-h-64 p-2 border rounded"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type or paste your code here..."
        ></textarea>

        <div className="w-full">
          <pre
            className={`min-h-64 max-h-[450px] overflow-scroll focus-visible:outline-0 !m-0 language-${currentLanguage.value}`}
          >
            <code
              className={`language-${currentLanguage.value}`}
              dangerouslySetInnerHTML={{
                __html: highlightedCode,
              }}
            ></code>
          </pre>
        </div>
      </div>
    </div>
  );
}
