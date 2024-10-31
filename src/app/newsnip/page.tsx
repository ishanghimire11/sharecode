"use client";

import React from "react";
import axios from "axios";

import Prism from "prismjs";
import { useState, useEffect, useRef } from "react";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { FormValues } from "@/constants";

import { SupportedLanguagesDropdown } from "@/components/ui/languages-radio-group";
import supportedLanguages from "@/lib/supportedLanguages";
import highlight from "@/components/codeHighlight";

import { SaveSnipModal } from "@/components/SaveSnipModal";
import { Textarea } from "@/components/ui/textarea";
import { INewSnip } from "@/types";
import { useRouter } from "next/navigation";

const NewSnip = () => {
  const [currentLanguage, setCurrentLanguage] = useState({
    value: "javascript",
    label: "JavaScript",
  });

  const [code, setCode] = useState(
    `const greet = () => { console.log("Hello, World!"); };`
  );

  const codeBlockRef = useRef<HTMLElement | null>(null);

  const navigate = useRouter();

  const handleLanguageChange = (languageValue: string) => {
    const selectedLanguage = supportedLanguages.find(
      (lang) => lang.value === languageValue
    );
    if (selectedLanguage) {
      setCurrentLanguage(selectedLanguage);
    }
  };

  const onFormSubmit = async (values: FormValues) => {
    const newSnip: INewSnip = {
      ...values,
      language: currentLanguage.label,
      code: code,
    };

    const res = await axios.post(`/api/snip`, newSnip);
    if (res.status === 400) {
      console.error("Error saving snip:", res.data.error);
      return;
    }

    navigate.push("/");
  };

  useEffect(() => {
    if (codeBlockRef.current) {
      codeBlockRef.current.innerHTML = highlight(code, currentLanguage.value);
      Prism.highlightElement(codeBlockRef.current);
    }
  }, [code, currentLanguage]);

  return (
    <div className="p-2">
      <div className="mb-4">Write your snip below and save it.</div>

      <div className="flex gap-x-2 items-center">
        <SupportedLanguagesDropdown
          handleLanguageChange={handleLanguageChange}
          currentLanguage={currentLanguage}
        />
        <SaveSnipModal onFormSubmit={onFormSubmit} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-2 h-[70dvh]">
        <Textarea
          className="min-h-96 h-full p-2 border rounded resize-none w-full md:max-w-1/2 md:w-1/2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type or paste your code here..."
        />

        <div className={`h-full w-full md:max-w-1/2 md:w-1/2 line-numbers`}>
          <pre
            className={`h-full overflow-scroll focus-visible:outline-0 !m-0 line-numbers language-${currentLanguage.value}`}
          >
            <code
              ref={codeBlockRef}
              className={`language-${currentLanguage.value}`}
            ></code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default NewSnip;
