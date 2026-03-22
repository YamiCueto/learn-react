import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const rulesCode = `// Custom hooks must start with "use"
// They can call other hooks
// Each component that calls a custom hook gets its own isolated state

// ✅ Valid custom hooks
function useCounter() { ... }
function useFetch(url) { ... }
function useLocalStorage(key, initial) { ... }

// ❌ Not a hook — won't work with React's rules
function getCounter() { ... }  // doesn't start with 'use'`;

const useCounterCode = `import { useState, useCallback } from 'react';

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initial), [initial]);

  return { count, increment, decrement, reset };
}

// Usage — each component gets its own count
function Counter() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`;

const useLocalStorageCode = `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Read from localStorage on first render
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    // Sync to localStorage whenever value changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage — works just like useState but persists!
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}`;

const useFetchCode = `import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // prevent state update on unmounted component

    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(json => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; }; // cleanup
  }, [url]);

  return { data, loading, error };
}

// Usage in any component
function UserCard({ id }) {
  const { data, loading, error } = useFetch(\`/api/users/\${id}\`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>{data.name}</p>;
}`;

export default function CustomHooks() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="custom-hooks" level="intermediate">
      <h1>{isEn ? 'Custom Hooks' : 'Hooks personalizados'}</h1>
      <p>
        {isEn
          ? 'Custom hooks let you extract component logic into reusable functions. A custom hook is just a JavaScript function whose name starts with "use" and that can call other hooks. They are the primary way to share stateful logic between components without duplicating code.'
          : 'Los hooks personalizados te permiten extraer la lógica de los componentes en funciones reutilizables. Un hook personalizado es simplemente una función de JavaScript cuyo nombre comienza con "use" y que puede llamar a otros hooks. Son la forma principal de compartir lógica con estado entre componentes sin duplicar código.'}
      </p>

      <h2>{isEn ? 'The rules' : 'Las reglas'}</h2>
      <CodeBlock code={rulesCode} language="jsx" title="rules.js" />

      <h2>{isEn ? 'Example: useCounter' : 'Ejemplo: useCounter'}</h2>
      <p>
        {isEn
          ? 'The simplest custom hook — wraps counter state and actions into a reusable unit. Notice each component that calls useCounter gets completely independent state.'
          : 'El hook personalizado más simple — envuelve el estado del contador y las acciones en una unidad reutilizable. Nota que cada componente que llama a useCounter obtiene un estado completamente independiente.'}
      </p>
      <CodeBlock code={useCounterCode} language="jsx" title="useCounter.js" />

      <h2>{isEn ? 'Example: useLocalStorage' : 'Ejemplo: useLocalStorage'}</h2>
      <p>
        {isEn
          ? 'Drop-in replacement for useState that automatically syncs to localStorage. Any component can use it without knowing about the persistence mechanism.'
          : 'Reemplazo directo para useState que sincroniza automáticamente con localStorage. Cualquier componente puede usarlo sin saber nada sobre el mecanismo de persistencia.'}
      </p>
      <CodeBlock code={useLocalStorageCode} language="jsx" title="useLocalStorage.js" />

      <h2>{isEn ? 'Example: useFetch' : 'Ejemplo: useFetch'}</h2>
      <p>
        {isEn
          ? 'Encapsulates the loading/error/data pattern for API calls. The cleanup cancels stale updates if the component unmounts or url changes before the fetch completes.'
          : 'Encapsula el patrón loading/error/data para llamadas a API. El cleanup cancela actualizaciones obsoletas si el componente se desmonta o la URL cambia antes de que el fetch termine.'}
      </p>
      <CodeBlock code={useFetchCode} language="jsx" title="useFetch.js" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Create a useDebounce(value, delay) custom hook that returns the value only after the user stops typing for the specified delay (in ms). Then build a search input that uses useFetch and useDebounce together — the API call should only fire after the user stops typing for 500ms.'
            : '✍️ Crea un hook personalizado useDebounce(value, delay) que retorne el valor solo después de que el usuario deje de escribir por el delay especificado (en ms). Luego construye un input de búsqueda que use useFetch y useDebounce juntos — la llamada a la API solo debe dispararse después de que el usuario deje de escribir por 500ms.'}
        </p>
      </div>
    </LessonLayout>
  );
}
