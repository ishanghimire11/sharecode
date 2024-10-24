"use client";

import Prism from "prismjs";

// Import all the language components you need
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-c";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-r";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-elixir";
import "prismjs/components/prism-bash";

const highlight = (code: string, language = "javascript") => {
  return Prism.highlight(code, Prism.languages[language], language);
};

export default highlight;
