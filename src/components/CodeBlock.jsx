import { useState, useEffect, useRef } from 'react';
import './CodeBlock.css';

// Singleton highlighter promise — se crea una sola vez para toda la app
let highlighterPromise = null;
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: ['tokyo-night'],
        langs: ['jsx', 'tsx', 'javascript', 'typescript', 'bash', 'json', 'css', 'html'],
      })
    );
  }
  return highlighterPromise;
}

const LANG_ALIASES = { js: 'javascript', ts: 'typescript' };

export default function CodeBlock({ code, language = 'jsx', title }) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const lang = LANG_ALIASES[language] || language;
    getHighlighter().then(hl => {
      if (!mountedRef.current) return;
      // Si el lenguaje no está cargado, caemos back a plaintext
      const loadedLangs = hl.getLoadedLanguages();
      const safeLang = loadedLangs.includes(lang) ? lang : 'javascript';
      const result = hl.codeToHtml(code, { lang: safeLang, theme: 'tokyo-night' });
      setHtml(result);
    });
    return () => { mountedRef.current = false; };
  }, [code, language]);

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
        {html
          ? <div className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: html }} />
          : <pre><code className="code-placeholder">{code}</code></pre>
        }
      </div>
    </div>
  );
}
