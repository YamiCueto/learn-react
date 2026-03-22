import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const basicCode = `import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // This runs AFTER every render where 'seconds' changes
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: runs before next effect or on unmount
    return () => clearInterval(interval);
  }, []); // [] = run only once, on mount

  return <h2>⏱️ {seconds}s</h2>;
}`;

const fetchCode = `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Re-runs whenever userId changes

  if (loading) return <p>Loading…</p>;
  return <h2>{user.name}</h2>;
}`;

const depsCode = `// 1. No dependency array → runs after EVERY render
useEffect(() => {
  console.log('rendered');
});

// 2. Empty array → runs ONCE on mount
useEffect(() => {
  console.log('mounted');
}, []);

// 3. With deps → runs when those values change
useEffect(() => {
  console.log('count changed:', count);
}, [count]);`;

const cleanupCode = `useEffect(() => {
  const handler = (e) => console.log(e.key);
  window.addEventListener('keydown', handler);

  // Cleanup removes the listener when component unmounts
  return () => window.removeEventListener('keydown', handler);
}, []);`;

export default function UseEffect() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="use-effect" level="basic">
      <h1>useEffect</h1>
      <p>
        {isEn
          ? 'useEffect lets you synchronize your component with external systems: APIs, timers, subscriptions, or the DOM. It runs after the component renders.'
          : 'useEffect te permite sincronizar tu componente con sistemas externos: APIs, timers, suscripciones o el DOM. Se ejecuta después de que el componente renderiza.'}
      </p>

      <h2>{isEn ? 'Basic example — Timer' : 'Ejemplo básico — Timer'}</h2>
      <p>
        {isEn
          ? 'The cleanup function (the return inside useEffect) runs before the effect re-runs or when the component unmounts. Always clean up timers and subscriptions!'
          : 'La función de limpieza (el return dentro de useEffect) se ejecuta antes de que el efecto vuelva a correr o cuando el componente se desmonta. ¡Siempre limpia timers y suscripciones!'}
      </p>
      <CodeBlock code={basicCode} language="jsx" title="Timer.jsx" />

      <h2>{isEn ? 'Fetching data' : 'Fetch de datos'}</h2>
      <p>
        {isEn
          ? 'The dependency array controls when the effect runs. If you put userId in the array, the effect re-runs every time userId changes — perfect for loading data based on a prop.'
          : 'El array de dependencias controla cuándo corre el efecto. Si pones userId en el array, el efecto vuelve a correr cada vez que cambia — perfecto para cargar datos basados en una prop.'}
      </p>
      <CodeBlock code={fetchCode} language="jsx" title="UserProfile.jsx" />

      <h2>{isEn ? 'Dependency array rules' : 'Reglas del array de dependencias'}</h2>
      <CodeBlock code={depsCode} language="jsx" title="deps-examples.jsx" />

      <h2>{isEn ? 'Cleanup function' : 'Función de limpieza'}</h2>
      <CodeBlock code={cleanupCode} language="jsx" title="KeyListener.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Create a component that shows the current window width. Update it in real time using a resize event listener. Remember to clean up the listener!'
            : '✍️ Crea un componente que muestre el ancho actual de la ventana. Actualízalo en tiempo real usando un listener del evento resize. ¡Recuerda limpiar el listener!'}
        </p>
      </div>
    </LessonLayout>
  );
}
