"use client";

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import supportedLanguages from "@/lib/supportedLanguages";
import highlight from "@/components/codeHighlight";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

const ViewSnip = ({ params }: { params: { id: string } }) => {
  const [currentLanguage, setCurrentLanguage] = useState({
    name: "",
    description: "",
    value: "javascript",
    code: "",
  });
  const codeBlockRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const getSnippet = async () => {
    const res = await axios.get(`/api/view/${params.id}`);
    const snippetData = res.data;

    const language = supportedLanguages.find(
      (lang) => lang.label.toLowerCase() === snippetData.language.toLowerCase()
    );

    setCurrentLanguage({
      name: res.data.name,
      description: res.data.description,
      value: language ? language.value : "javascript",
      code: snippetData.code,
    });
  };

  useEffect(() => {
    getSnippet();
  }, []);

  useEffect(() => {
    if (codeBlockRef.current) {
      codeBlockRef.current.innerHTML = highlight(
        currentLanguage.code,
        currentLanguage.value
      );
      Prism.highlightElement(codeBlockRef.current);
    }
  }, [currentLanguage]);

  const handleCopyClick = () => {
    const code = codeBlockRef.current?.innerText;
    navigator.clipboard.writeText(code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    return;
  };

  return (
    <div className="mt-8 max-w-7xl">
      <div>
        <h1 className="text-3xl pb-1 font-semibold">{currentLanguage.name}</h1>
        <p className="opacity-70">{currentLanguage.description}</p>
      </div>

      <div className="flex justify-end mb-2">
        <Button onClick={handleCopyClick} disabled={copied}>
          {copied ? (
            <>
              <CheckIcon className="w-7 h-8" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="w-5 h-5" />
              Copy
            </>
          )}
        </Button>
      </div>

      <div className={`w-full line-numbers`}>
        <pre
          className={`min-h-[60dvh] overflow-scroll focus-visible:outline-0 !m-0 language-${currentLanguage.value}`}
        >
          <code
            ref={codeBlockRef}
            className={`language-${currentLanguage.value}`}
          >
            {currentLanguage.code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default ViewSnip;
