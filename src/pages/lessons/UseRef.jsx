import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const domRefCode = `import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  // useRef returns a mutable object: { current: null }
  const inputRef = useRef(null);

  useEffect(() => {
    // After mount, focus the input directly
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="I'm focused!" />;
}`;

const valueRefCode = `import { useRef, useState } from 'react';

function StopWatch() {
  const [display, setDisplay] = useState('00:00');
  // intervalRef does NOT cause re-renders when changed
  const intervalRef = useRef(null);

  const start = () => {
    let secs = 0;
    intervalRef.current = setInterval(() => {
      secs++;
      const m = String(Math.floor(secs / 60)).padStart(2, '0');
      const s = String(secs % 60).padStart(2, '0');
      setDisplay(\`\${m}:\${s}\`);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>{display}</p>
      <button onClick={start}>▶ Start</button>
      <button onClick={stop}>⏹ Stop</button>
    </div>
  );
}`;

const prevValueCode = `import { useRef, useEffect, useState } from 'react';

// Custom hook to get the previous value of a state
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current; // returns value from PREVIOUS render
}

function Counter() {
  const [count, setCount] = useState(0);
  const prev = usePrevious(count);

  return (
    <div>
      <p>Now: {count} — Before: {prev ?? '—'}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}`;

const forwardRefCode = `import { forwardRef, useRef } from 'react';

// Custom input that exposes its DOM ref to the parent
const FancyInput = forwardRef((props, ref) => (
  <input ref={ref} className="fancy-input" {...props} />
));

function Form() {
  const inputRef = useRef(null);

  return (
    <div>
      <FancyInput ref={inputRef} placeholder="Fancy!" />
      <button onClick={() => inputRef.current.focus()}>
        Focus input
      </button>
    </div>
  );
}`;

export default function UseRef() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="use-ref" level="intermediate">
      <h1>useRef</h1>
      <p>
        {isEn
          ? 'useRef gives you a mutable container that persists across renders without causing re-renders when it changes. It has two main uses: accessing DOM elements directly, and storing mutable values (like timers or previous state) that you don\'t want to trigger renders.'
          : 'useRef te da un contenedor mutable que persiste entre renders sin causar re-renders cuando cambia. Tiene dos usos principales: acceder a elementos del DOM directamente, y almacenar valores mutables (como timers o estado anterior) que no quieres que disparen renders.'}
      </p>

      <h2>{isEn ? 'Accessing DOM elements' : 'Acceder a elementos del DOM'}</h2>
      <CodeBlock code={domRefCode} language="jsx" title="AutoFocusInput.jsx" />

      <h2>{isEn ? 'Storing mutable values (no re-render)' : 'Almacenar valores mutables (sin re-render)'}</h2>
      <p>
        {isEn
          ? 'Unlike useState, changing ref.current does NOT trigger a re-render. This is perfect for storing timer IDs, previous values, or any data that needs to persist but shouldn\'t affect the UI directly.'
          : 'A diferencia de useState, cambiar ref.current NO dispara un re-render. Esto es perfecto para almacenar IDs de timers, valores anteriores, o cualquier dato que necesite persistir pero no deba afectar la UI directamente.'}
      </p>
      <CodeBlock code={valueRefCode} language="jsx" title="StopWatch.jsx" />

      <h2>{isEn ? 'Tracking previous values' : 'Rastrear valores anteriores'}</h2>
      <CodeBlock code={prevValueCode} language="jsx" title="usePrevious.jsx" />

      <h2>forwardRef</h2>
      <p>
        {isEn
          ? 'To pass a ref to a custom component (not a native element), wrap it with forwardRef. This lets parent components control a child\'s DOM node.'
          : 'Para pasar un ref a un componente personalizado (no un elemento nativo), envuélvelo con forwardRef. Esto permite a los componentes padres controlar el nodo DOM de un hijo.'}
      </p>
      <CodeBlock code={forwardRefCode} language="jsx" title="FancyInput.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a video player controller: use useRef to control a <video> element. Add Play, Pause, and Mute buttons that call .play(), .pause(), and toggle .muted on the video element through the ref.'
            : '✍️ Crea un controlador de video: usa useRef para controlar un elemento <video>. Agrega botones de Play, Pause y Mute que llamen a .play(), .pause(), y toggleen .muted en el elemento video a través del ref.'}
        </p>
      </div>
    </LessonLayout>
  );
}
