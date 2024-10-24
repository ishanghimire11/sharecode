"use client";

import { useState, useEffect } from "react";
import highlight from "../components/codeHighlight";

export default function Home() {
  const [currentlanguage, setCurrentLanguage] = useState("javascript");
  const [code, setCode] = useState(
    `const greet = () => { console.log("Hello, World!"); };`
  );
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    setHighlightedCode(highlight(code, currentlanguage));
  }, [code, currentlanguage]);

  return (
    <div className="p-2">
      <h1 className="text-2xl pb-1">
        Easy to share. Authenticate and start sharing
      </h1>
      <p className="opacity-70">
        Sharing your code snippet has never been easier. Specify your language
        and share the code.
      </p>

      <select
        className="mb-4"
        value={currentlanguage}
        onChange={(e) => setCurrentLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="markup">HTML</option>
        <option value="css">CSS</option>
        <option value="python">Python</option>
        <option value="scheme">Scheme</option>
      </select>

      <div className="flex flex-col md:flex-row gap-6">
        <textarea
          className="flex-1 min-h-96 p-2 border rounded mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type or paste your code here..."
        ></textarea>

        <div className="flex-1">
          <pre className={`min-h-96 language-${currentlanguage} !m-0`}>
            <code
              className={`language-${currentlanguage}`}
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
