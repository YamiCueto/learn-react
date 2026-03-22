import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const ternaryCode = `function Welcome({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn
        ? <h1>Welcome back! 👋</h1>
        : <h1>Please log in 🔐</h1>
      }
    </div>
  );
}`;

const andCode = `function Notification({ message }) {
  return (
    <div>
      <h2>Dashboard</h2>

      {/* Only renders if message is truthy */}
      {message && (
        <div className="alert">
          🔔 {message}
        </div>
      )}
    </div>
  );
}`;

const earlyReturnCode = `function UserCard({ user }) {
  // Early return for loading state
  if (!user) return <p>Loading…</p>;

  // Early return for error
  if (user.error) return <p>Error: {user.error}</p>;

  // Happy path
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`;

const multipleCode = `function StatusBadge({ status }) {
  // Multiple conditions → use a variable or switch
  let badge;

  if (status === 'active')  badge = <span className="green">● Active</span>;
  else if (status === 'idle')    badge = <span className="yellow">● Idle</span>;
  else if (status === 'offline') badge = <span className="red">● Offline</span>;
  else                           badge = <span className="gray">● Unknown</span>;

  return <div>{badge}</div>;
}`;

const classCode = `// Applying conditional class names
function Button({ variant = 'primary', disabled }) {
  return (
    <button
      className={\`btn btn-\${variant} \${disabled ? 'btn-disabled' : ''}\`}
      disabled={disabled}
    >
      Click me
    </button>
  );
}`;

export default function Conditional() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="conditional" level="basic">
      <h1>{isEn ? 'Conditional Rendering' : 'Renderizado Condicional'}</h1>
      <p>
        {isEn
          ? 'React lets you conditionally render JSX using JavaScript operators. The most common patterns are the ternary operator (? :), short-circuit evaluation (&&), and early returns.'
          : 'React te permite renderizar JSX condicionalmente usando operadores de JavaScript. Los patrones más comunes son el operador ternario (? :), evaluación de cortocircuito (&&), y returns tempranos.'}
      </p>

      <h2>{isEn ? 'Ternary operator ?: ' : 'Operador ternario ?:'}</h2>
      <p>
        {isEn
          ? 'Use the ternary when you need to choose between two JSX blocks.'
          : 'Usa el ternario cuando necesitas elegir entre dos bloques de JSX.'}
      </p>
      <CodeBlock code={ternaryCode} language="jsx" title="Welcome.jsx" />

      <h2>{isEn ? 'Short-circuit &&' : 'Cortocircuito &&'}</h2>
      <p>
        {isEn
          ? 'Use && when you want to show something only if a condition is true. Be careful: if the left side is 0, React will render "0" — use !! or Boolean() to convert numbers.'
          : 'Usa && cuando quieras mostrar algo solo si una condición es verdadera. Cuidado: si el lado izquierdo es 0, React renderizará "0" — usa !! o Boolean() para convertir números.'}
      </p>
      <CodeBlock code={andCode} language="jsx" title="Notification.jsx" />

      <h2>{isEn ? 'Early return' : 'Return temprano'}</h2>
      <p>
        {isEn
          ? 'For complex conditions, returning early from the component function keeps your JSX clean.'
          : 'Para condiciones complejas, retornar temprano desde la función del componente mantiene tu JSX limpio.'}
      </p>
      <CodeBlock code={earlyReturnCode} language="jsx" title="UserCard.jsx" />

      <h2>{isEn ? 'Multiple conditions' : 'Múltiples condiciones'}</h2>
      <CodeBlock code={multipleCode} language="jsx" title="StatusBadge.jsx" />

      <h2>{isEn ? 'Conditional class names' : 'Class names condicionales'}</h2>
      <CodeBlock code={classCode} language="jsx" title="Button.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a simple auth flow: show a "Login" button when logged out. When clicked, show a welcome message with the username and a "Logout" button. Toggle between both states with useState.'
            : '✍️ Crea un flujo de auth simple: muestra un botón "Login" cuando está deslogueado. Al hacer click, muestra un mensaje de bienvenida con el nombre de usuario y un botón "Logout". Alterna entre ambos estados con useState.'}
        </p>
      </div>
    </LessonLayout>
  );
}
