import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const virtualDomCode = `// Sin React: actualizar el DOM manualmente 😩
document.getElementById('counter').innerText = count;
document.getElementById('counter').style.color = 'red';

// Con React: solo describe el resultado ✅
function Counter() {
  return <h1 style={{ color: 'red' }}>{count}</h1>;
}`;

const helloCode = `// Tu primer componente React
function App() {
  return (
    <div>
      <h1>¡Hola, React! 👋</h1>
      <p>Esto es JSX dentro de JavaScript</p>
    </div>
  );
}`;

export default function WhatIsReact() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="what-is-react" level="beginner">
      <h1>{isEn ? 'What is React?' : '¿Qué es React?'}</h1>

      <p>
        {isEn
          ? 'React is a JavaScript library created by Meta (Facebook) to build user interfaces. Instead of manipulating the DOM directly, React lets you describe what the UI should look like and handles all updates automatically.'
          : 'React es una biblioteca de JavaScript creada por Meta (Facebook) para construir interfaces de usuario. En lugar de manipular el DOM directamente, React te permite describir cómo debe verse la UI y se encarga de todas las actualizaciones automáticamente.'}
      </p>

      <h2>{isEn ? 'Why React?' : '¿Por qué React?'}</h2>

      <div className="why-grid">
        {[
          { icon: '⚡', en: 'Fast', es: 'Velocidad', descEn: 'The virtual DOM minimizes real DOM updates', descEs: 'El DOM virtual minimiza las actualizaciones del DOM real' },
          { icon: '🧩', en: 'Components', es: 'Componentes', descEn: 'Build reusable, independent pieces of UI', descEs: 'Construye piezas de UI reutilizables e independientes' },
          { icon: '🔁', en: 'Reactive', es: 'Reactivo', descEn: 'The UI updates automatically when data changes', descEs: 'La UI se actualiza automáticamente cuando los datos cambian' },
          { icon: '🌍', en: 'Ecosystem', es: 'Ecosistema', descEn: 'Massive community and rich library ecosystem', descEs: 'Comunidad gigante y ecosistema de librerías enorme' },
        ].map(item => (
          <div key={item.en} className="why-card">
            <span className="why-icon">{item.icon}</span>
            <strong>{isEn ? item.en : item.es}</strong>
            <p>{isEn ? item.descEn : item.descEs}</p>
          </div>
        ))}
      </div>

      <h2>{isEn ? 'The Virtual DOM' : 'El DOM Virtual'}</h2>
      <p>
        {isEn
          ? "React maintains a lightweight copy of the real DOM in memory (the Virtual DOM). When your data changes, React first updates the virtual DOM, then calculates the minimal set of changes needed to the real DOM — this is React's key optimization."
          : 'React mantiene una copia ligera del DOM real en memoria (el DOM Virtual). Cuando tus datos cambian, React primero actualiza el DOM virtual, luego calcula el conjunto mínimo de cambios necesarios en el DOM real — esta es la optimización clave de React.'}
      </p>

      <CodeBlock
        code={virtualDomCode}
        language="jsx"
        title={isEn ? 'React vs Vanilla JS' : 'React vs JS Vanilla'}
      />

      <h2>{isEn ? 'Your first look at React' : 'Tu primera vista de React'}</h2>
      <p>
        {isEn
          ? 'This is what React code looks like. Notice how we write HTML-like syntax inside JavaScript — that\'s JSX, which we\'ll explore in the next lesson.'
          : 'Así es el código React. Nota cómo escribimos sintaxis similar a HTML dentro de JavaScript — eso es JSX, que exploraremos en la siguiente lección.'}
      </p>

      <CodeBlock code={helloCode} language="jsx" title="App.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '🤔 Think: what are 3 websites you use daily that might be built with React? Hint: Facebook, Instagram, Airbnb, Netflix, Discord all use React.'
            : '🤔 Piensa: ¿cuáles son 3 sitios web que usas a diario que podrían estar construidos con React? Pista: Facebook, Instagram, Airbnb, Netflix y Discord usan React.'}
        </p>
      </div>
    </LessonLayout>
  );
}
