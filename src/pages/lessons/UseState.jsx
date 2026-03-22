import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const useStateCode = `import { useState } from 'react';

function Counter() {
  // [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`;

const useStateMultiCode = `import { useState } from 'react';

function UserForm() {
  const [name, setName]       = useState('');
  const [age, setAge]         = useState(0);
  const [isDark, setIsDark]   = useState(false);

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <button type="button" onClick={() => setIsDark(!isDark)}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
      <p>Hello {name}, you are {age} years old!</p>
    </form>
  );
}`;

const useStateObjectCode = `import { useState } from 'react';

function Profile() {
  const [user, setUser] = useState({
    name: 'Yamid',
    role: 'Developer',
    level: 1,
  });

  const levelUp = () => {
    // Always spread to keep other properties!
    setUser(prev => ({ ...prev, level: prev.level + 1 }));
  };

  return (
    <div>
      <p>{user.name} — {user.role}</p>
      <p>Level: {user.level} ⭐</p>
      <button onClick={levelUp}>Level Up!</button>
    </div>
  );
}`;

export default function UseState() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="use-state" level="beginner">
      <h1>useState</h1>
      <p>
        {isEn
          ? 'useState is React\'s most fundamental hook. It lets you add state to your components — data that changes over time and triggers re-renders when updated.'
          : 'useState es el hook más fundamental de React. Te permite agregar estado a tus componentes — datos que cambian con el tiempo y disparan re-renders cuando se actualizan.'}
      </p>

      <h2>{isEn ? 'Basic usage' : 'Uso básico'}</h2>
      <p>
        {isEn
          ? 'useState returns an array with two items: the current state value, and a function to update it. When you call the setter, React re-renders the component.'
          : 'useState retorna un array con dos elementos: el valor actual del estado, y una función para actualizarlo. Cuando llamas al setter, React re-renderiza el componente.'}
      </p>
      <CodeBlock code={useStateCode} language="jsx" title="Counter.jsx" />

      <h2>{isEn ? 'Multiple state variables' : 'Múltiples variables de estado'}</h2>
      <CodeBlock code={useStateMultiCode} language="jsx" title="UserForm.jsx" />

      <h2>{isEn ? 'State with objects' : 'Estado con objetos'}</h2>
      <p>
        {isEn
          ? 'When your state is an object, always spread the previous state when updating. Never mutate state directly!'
          : 'Cuando tu estado es un objeto, siempre haz spread del estado anterior al actualizar. ¡Nunca mutes el estado directamente!'}
      </p>
      <CodeBlock code={useStateObjectCode} language="jsx" title="Profile.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a StopWatch component using useState. It should have a seconds counter, and Start/Stop/Reset buttons. Hint: you\'ll need two state variables: seconds and isRunning.'
            : '✍️ Crea un componente StopWatch usando useState. Debe tener un contador de segundos, y botones de Start/Stop/Reset. Pista: necesitarás dos variables de estado: seconds e isRunning.'}
        </p>
      </div>
    </LessonLayout>
  );
}
