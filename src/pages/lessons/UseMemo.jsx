import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const basicMemoCode = `import { useMemo, useState } from 'react';

function ExpensiveList({ items, filter }) {
  // Only recalculates when items or filter changes
  const filteredItems = useMemo(() => {
    console.log('Filtering...'); // won't run on every render
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // <-- dependencies

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`;

const withoutMemoCode = `// ❌ Without useMemo: recalculates on EVERY render
function Component({ items }) {
  const [count, setCount] = useState(0);

  // This runs even when count changes, even though items didn't
  const sorted = items.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Renders: {count}
      </button>
      <ul>{sorted.map(i => <li key={i.id}>{i.name}</li>)}</ul>
    </div>
  );
}

// ✅ With useMemo: only sorts when items changes
function Component({ items }) {
  const [count, setCount] = useState(0);

  const sorted = useMemo(
    () => items.sort((a, b) => a.name.localeCompare(b.name)),
    [items] // only re-sort when items changes
  );

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Renders: {count}
      </button>
      <ul>{sorted.map(i => <li key={i.id}>{i.name}</li>)}</ul>
    </div>
  );
}`;

const useCallbackCode = `import { useCallback, useMemo, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // useMemo: memoizes a VALUE
  const expensiveValue = useMemo(() => {
    return computeHeavyStuff(count);
  }, [count]);

  // useCallback: memoizes a FUNCTION (so child doesn't re-render)
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // empty deps → function never changes

  return <Child onClick={handleClick} value={expensiveValue} />;
}`;

const whenNotCode = `// ❌ Overkill — simple calculations don't need useMemo
const double = useMemo(() => count * 2, [count]);

// ✅ Just compute it directly
const double = count * 2;

// ✅ useMemo is worth it for:
// - Filtering/sorting large arrays
// - Complex object transformations
// - Derived state from multiple expensive computations`;

export default function UseMemo() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="use-memo" level="intermediate">
      <h1>useMemo</h1>
      <p>
        {isEn
          ? 'useMemo memoizes the result of a computation — it runs your function once and caches the result. It only recalculates when one of its dependencies changes. Use it to avoid expensive re-calculations on every render.'
          : 'useMemo memoriza el resultado de un cálculo — ejecuta tu función una vez y guarda el resultado en caché. Solo recalcula cuando una de sus dependencias cambia. Úsalo para evitar cálculos costosos en cada render.'}
      </p>

      <h2>{isEn ? 'Basic usage' : 'Uso básico'}</h2>
      <CodeBlock code={basicMemoCode} language="jsx" title="ExpensiveList.jsx" />

      <h2>{isEn ? 'Without vs with useMemo' : 'Sin vs con useMemo'}</h2>
      <p>
        {isEn
          ? 'Every time a component renders, all the code inside it runs again. useMemo skips repeated work if the inputs haven\'t changed.'
          : 'Cada vez que un componente hace render, todo el código dentro de él se ejecuta de nuevo. useMemo omite trabajo repetido si los inputs no han cambiado.'}
      </p>
      <CodeBlock code={withoutMemoCode} language="jsx" title="comparison.jsx" />

      <h2>{isEn ? 'useMemo vs useCallback' : 'useMemo vs useCallback'}</h2>
      <p>
        {isEn
          ? 'They are essentially the same hook. useMemo memoizes a computed VALUE; useCallback memoizes a FUNCTION reference. useCallback(fn, deps) is shorthand for useMemo(() => fn, deps).'
          : 'Son esencialmente el mismo hook. useMemo memoriza un VALOR calculado; useCallback memoriza una referencia de FUNCIÓN. useCallback(fn, deps) es abreviatura de useMemo(() => fn, deps).'}
      </p>
      <CodeBlock code={useCallbackCode} language="jsx" title="callbacks.jsx" />

      <h2>{isEn ? 'When NOT to use useMemo' : 'Cuándo NO usar useMemo'}</h2>
      <p>
        {isEn
          ? 'useMemo itself has a cost (memory + comparison overhead). Don\'t reach for it by default — only add it when you measure a real performance problem.'
          : 'useMemo en sí tiene un costo (memoria + overhead de comparación). No lo uses por defecto — agrégalo solo cuando midas un problema de rendimiento real.'}
      </p>
      <CodeBlock code={whenNotCode} language="jsx" title="when-not-to.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a searchable product list with at least 50 items. Add a counter button that increments on each click. Use useMemo to filter the list by a search term. Verify (with a console.log inside the memo) that filtering only runs when the search changes, not when the counter increments.'
            : '✍️ Crea una lista de productos buscable con al menos 50 items. Agrega un botón contador que incremente en cada clic. Usa useMemo para filtrar la lista por un término de búsqueda. Verifica (con un console.log dentro del memo) que el filtrado solo corre cuando la búsqueda cambia, no cuando el contador incrementa.'}
        </p>
      </div>
    </LessonLayout>
  );
}
