import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';
import './lessons.css';

const componentCode = `// A component is just a JavaScript function
// that returns JSX

function WelcomeCard({ name }) {
  return (
    <div className="card">
      <h2>¡Bienvenido, {name}! 🎉</h2>
      <p>React te va a encantar.</p>
    </div>
  );
}

// Using the component (like an HTML tag)
function App() {
  return (
    <div>
      <WelcomeCard name="Yamid" />
      <WelcomeCard name="Ana" />
      <WelcomeCard name="Carlos" />
    </div>
  );
}`;

const nestedCode = `// Components can be nested inside each other
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />;
}

function UserBadge({ user }) {
  return (
    <div className="badge">
      <Avatar src={user.photo} alt={user.name} />
      <span>{user.name}</span>
    </div>
  );
}

function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <UserBadge user={user} />
        </li>
      ))}
    </ul>
  );
}`;

export default function Components() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="components" level="beginner">
      <h1>{isEn ? 'Components' : 'Componentes'}</h1>

      <p>
        {isEn
          ? 'Components are the heart of React. They\'re independent, reusable pieces of UI — like LEGO blocks you can assemble to build complex interfaces.'
          : 'Los componentes son el corazón de React. Son piezas de UI independientes y reutilizables — como bloques de LEGO que puedes ensamblar para construir interfaces complejas.'}
      </p>

      <h2>{isEn ? 'Creating your first component' : 'Creando tu primer componente'}</h2>
      <p>
        {isEn
          ? 'A React component is simply a JavaScript function that starts with a capital letter and returns JSX. That\'s it!'
          : 'Un componente React es simplemente una función JavaScript que comienza con mayúscula y retorna JSX. ¡Eso es todo!'}
      </p>

      <CodeBlock code={componentCode} language="jsx" title="WelcomeCard.jsx" />

      <h2>{isEn ? 'Nesting components' : 'Anidando componentes'}</h2>
      <p>
        {isEn
          ? 'Components can render other components. This is how you build complex UIs from small, simple pieces.'
          : 'Los componentes pueden renderizar otros componentes. Así es como construyes UIs complejas a partir de piezas pequeñas y simples.'}
      </p>

      <CodeBlock code={nestedCode} language="jsx" title={isEn ? 'Nested components' : 'Componentes anidados'} />

      <div className="why-grid">
        {[
          { icon: '🔄', en: 'Reusable', es: 'Reutilizable', dEn: 'Write once, use everywhere', dEs: 'Escribe una vez, usa en todos lados' },
          { icon: '🧪', en: 'Testable', es: 'Testeable', dEn: 'Easy to test in isolation', dEs: 'Fácil de probar de forma aislada' },
          { icon: '📦', en: 'Encapsulated', es: 'Encapsulado', dEn: 'Logic and UI together', dEs: 'Lógica y UI juntas' },
          { icon: '🤝', en: 'Composable', es: 'Componible', dEn: 'Small pieces build big apps', dEs: 'Piezas pequeñas hacen grandes apps' },
        ].map(item => (
          <div key={item.en} className="why-card">
            <span className="why-icon">{item.icon}</span>
            <strong>{isEn ? item.en : item.es}</strong>
            <p>{isEn ? item.dEn : item.dEs}</p>
          </div>
        ))}
      </div>

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Create a ProductCard component that receives name, price, and emoji as props and renders a nice card. Then use it 3 times in App with different products!'
            : '✍️ Crea un componente ProductCard que reciba nombre, precio y emoji como props y renderice una tarjeta. ¡Luego úsalo 3 veces en App con diferentes productos!'}
        </p>
      </div>
    </LessonLayout>
  );
}
