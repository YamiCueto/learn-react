import { useState } from 'react';
import './CodeBlock.css';

export default function CodeBlock({ code, language = 'jsx', title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-wrapper">
      <div className="code-header">
        <div className="code-dots">
          <span className="code-dot" />
          <span className="code-dot" />
          <span className="code-dot" />
        </div>
        <span className="code-lang">{title || language}</span>
        <button className="code-copy-btn" onClick={handleCopy}>
          {copied ? '✅ Copiado' : '⎘ Copiar'}
        </button>
      </div>
      <div className="code-body">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
}
