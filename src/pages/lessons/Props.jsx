import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const propsBasicCode = `// Props are like function arguments for components
function Greeting({ name, emoji = '👋' }) {
  return <h1>{emoji} Hello, {name}!</h1>;
}

// Passing props (like HTML attributes)
function App() {
  return (
    <>
      <Greeting name="Yamid" emoji="🚀" />
      <Greeting name="Ana" />          {/* uses default emoji */}
      <Greeting name="Carlos" emoji="🔥" />
    </>
  );
}`;

const propsTypesCode = `// Props can be any JavaScript value
function DataCard({
  title,           // string
  count,           // number
  isActive,        // boolean
  tags,            // array
  user,            // object
  onClick,         // function
}) {
  return (
    <div className={isActive ? 'active' : ''}>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={onClick}>Click me</button>
      <ul>
        {tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
    </div>
  );
}`;

const childrenCode = `// The special 'children' prop — content between tags
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Usage — anything between tags becomes 'children'
function App() {
  return (
    <Card title="My Card">
      <p>This is the content! 🎉</p>
      <button>Click me</button>
    </Card>
  );
}`;

export default function Props() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="props" level="beginner">
      <h1>Props</h1>
      <p>
        {isEn
          ? 'Props (short for "properties") are how you pass data from a parent component to a child component. They make components dynamic and reusable.'
          : 'Las props (abreviación de "properties") son la forma de pasar datos de un componente padre a un componente hijo. Hacen los componentes dinámicos y reutilizables.'}
      </p>

      <h2>{isEn ? 'Basic props' : 'Props básicas'}</h2>
      <CodeBlock code={propsBasicCode} language="jsx" title="Greeting.jsx" />

      <h2>{isEn ? 'Props can be any type' : 'Las props pueden ser de cualquier tipo'}</h2>
      <CodeBlock code={propsTypesCode} language="jsx" title="DataCard.jsx" />

      <h2>{isEn ? 'The children prop' : 'La prop children'}</h2>
      <p>
        {isEn
          ? 'React has a special built-in prop called children. It represents whatever you put between the opening and closing tags of your component.'
          : 'React tiene una prop especial llamada children. Representa todo lo que pongas entre las etiquetas de apertura y cierre de tu componente.'}
      </p>
      <CodeBlock code={childrenCode} language="jsx" title="Card.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a UserProfile component with props: avatar (emoji), name, role, and followers (number). Display all of them nicely. Add a default value for followers = 0.'
            : '✍️ Crea un componente UserProfile con props: avatar (emoji), name, role, y followers (número). Muéstralos de forma agradable. Agrega un valor default para followers = 0.'}
        </p>
      </div>
    </LessonLayout>
  );
}
