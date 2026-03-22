import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const clickCode = `function Counter() {
  const [count, setCount] = useState(0);

  // Event handler = regular JS function
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}`;

const eventObjectCode = `function InputLogger() {
  const [value, setValue] = useState('');

  // 'e' is the SyntheticEvent object
  const handleChange = (e) => {
    console.log(e.target.value); // current input value
    setValue(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
}`;

const preventCode = `function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload!
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <button type="submit">Login</button>
    </form>
  );
}`;

const commonEventsCode = `// Mouse events
<button onClick={fn}>Click</button>
<div onMouseEnter={fn} onMouseLeave={fn}>Hover</div>
<div onDoubleClick={fn}>Double click</div>

// Keyboard events
<input onKeyDown={fn} onKeyUp={fn} />

// Form events
<input onChange={fn} onFocus={fn} onBlur={fn} />
<form onSubmit={fn} />
<select onChange={fn} />

// Drag events
<div onDragStart={fn} onDrop={fn} onDragOver={fn} />`;

const passingArgsCode = `function List() {
  const items = ['React', 'Vue', 'Angular'];

  const handleSelect = (name) => {
    alert(\`Selected: \${name}\`);
  };

  return (
    <ul>
      {items.map(item => (
        // Use arrow function to pass arguments
        <li key={item} onClick={() => handleSelect(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
}`;

export default function Events() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="events" level="basic">
      <h1>{isEn ? 'Events in React' : 'Eventos en React'}</h1>
      <p>
        {isEn
          ? 'React handles events using camelCase props like onClick, onChange, onSubmit. You pass a function — not a string — as the handler. React wraps native events in a SyntheticEvent for cross-browser consistency.'
          : 'React maneja eventos usando props en camelCase como onClick, onChange, onSubmit. Pasas una función — no un string — como handler. React envuelve los eventos nativos en un SyntheticEvent para consistencia entre navegadores.'}
      </p>

      <h2>{isEn ? 'Click events' : 'Eventos de click'}</h2>
      <CodeBlock code={clickCode} language="jsx" title="Counter.jsx" />

      <h2>{isEn ? 'The event object' : 'El objeto evento'}</h2>
      <p>
        {isEn
          ? 'Every handler receives a SyntheticEvent object. For inputs, e.target.value gives you the current field value.'
          : 'Cada handler recibe un objeto SyntheticEvent. Para inputs, e.target.value te da el valor actual del campo.'}
      </p>
      <CodeBlock code={eventObjectCode} language="jsx" title="InputLogger.jsx" />

      <h2>e.preventDefault()</h2>
      <p>
        {isEn
          ? 'For form submissions, always call e.preventDefault() to stop the browser from reloading the page.'
          : 'Para envíos de formularios, siempre llama e.preventDefault() para evitar que el navegador recargue la página.'}
      </p>
      <CodeBlock code={preventCode} language="jsx" title="LoginForm.jsx" />

      <h2>{isEn ? 'Common events' : 'Eventos comunes'}</h2>
      <CodeBlock code={commonEventsCode} language="jsx" title="events-reference.jsx" />

      <h2>{isEn ? 'Passing arguments to handlers' : 'Pasar argumentos a los handlers'}</h2>
      <p>
        {isEn
          ? 'Wrap the handler in an arrow function to pass custom arguments. Never call the function directly in JSX (onClick={handleSelect(item)} would fire on render, not on click).'
          : 'Envuelve el handler en una arrow function para pasar argumentos personalizados. Nunca llames la función directamente en JSX (onClick={handleSelect(item)} se dispararía al renderizar, no al hacer click).'}
      </p>
      <CodeBlock code={passingArgsCode} language="jsx" title="List.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Create a color picker: show 5 colored buttons (red, green, blue, purple, orange). When you click one, the background of a box changes to that color. Use useState to track the active color.'
            : '✍️ Crea un selector de color: muestra 5 botones de colores (rojo, verde, azul, morado, naranja). Al hacer click, el fondo de un cuadro cambia a ese color. Usa useState para guardar el color activo.'}
        </p>
      </div>
    </LessonLayout>
  );
}
