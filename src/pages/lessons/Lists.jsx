import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const basicListCode = `const fruits = ['🍎 Apple', '🍌 Banana', '🍇 Grapes'];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}`;

const keyCode = `// ❌ BAD — index as key in dynamic lists
items.map((item, index) => (
  <Item key={index} data={item} />
));

// ✅ GOOD — unique stable ID
items.map(item => (
  <Item key={item.id} data={item} />
));

// ✅ GOOD — unique string
items.map(item => (
  <Item key={item.slug} data={item} />
));`;

const realListCode = `const users = [
  { id: 1, name: 'Yamid', role: 'Dev', avatar: '🧑‍💻' },
  { id: 2, name: 'Ana',   role: 'Design', avatar: '🎨' },
  { id: 3, name: 'Carlos',role: 'PM', avatar: '📋' },
];

function UserList() {
  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <span>{user.avatar}</span>
          <div>
            <strong>{user.name}</strong>
            <p>{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}`;

const filterCode = `function TaskList({ tasks }) {
  const pending = tasks.filter(t => !t.done);
  const done    = tasks.filter(t => t.done);

  return (
    <div>
      <h3>Pending ({pending.length})</h3>
      {pending.map(task => (
        <p key={task.id}>⏳ {task.title}</p>
      ))}

      <h3>Done ({done.length})</h3>
      {done.map(task => (
        <p key={task.id}>✅ {task.title}</p>
      ))}
    </div>
  );
}`;

const nestedCode = `const categories = [
  { id: 1, name: 'Frontend', techs: ['React', 'Vue', 'Angular'] },
  { id: 2, name: 'Backend',  techs: ['Node', 'Django', 'Spring'] },
];

function CategoryList() {
  return (
    <ul>
      {categories.map(cat => (
        <li key={cat.id}>
          <strong>{cat.name}</strong>
          <ul>
            {cat.techs.map(tech => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}`;

export default function Lists() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="lists" level="basic">
      <h1>{isEn ? 'Lists & Keys' : 'Listas y Keys'}</h1>
      <p>
        {isEn
          ? 'In React you render lists using the JavaScript .map() method. Every item needs a key prop — a unique, stable identifier that helps React track what changed, was added, or removed.'
          : 'En React renderizas listas usando el método .map() de JavaScript. Cada elemento necesita una prop key — un identificador único y estable que ayuda a React a rastrear qué cambió, se agregó o eliminó.'}
      </p>

      <h2>{isEn ? 'Basic list' : 'Lista básica'}</h2>
      <CodeBlock code={basicListCode} language="jsx" title="FruitList.jsx" />

      <h2>{isEn ? 'Why keys matter' : 'Por qué importan las keys'}</h2>
      <p>
        {isEn
          ? 'Keys must be unique among siblings. Avoid using the array index as key in dynamic lists (where items can be added, removed, or reordered) — it causes subtle bugs. Use a stable ID from your data instead.'
          : 'Las keys deben ser únicas entre hermanos. Evita usar el índice del array como key en listas dinámicas (donde los items se pueden agregar, eliminar o reordenar) — causa bugs sutiles. Usa un ID estable de tus datos.'}
      </p>
      <CodeBlock code={keyCode} language="jsx" title="keys-example.jsx" />

      <h2>{isEn ? 'Real-world list' : 'Lista del mundo real'}</h2>
      <CodeBlock code={realListCode} language="jsx" title="UserList.jsx" />

      <h2>{isEn ? 'Filter + map' : 'Filter + map'}</h2>
      <p>
        {isEn
          ? 'Combine .filter() before .map() to show only the items you need.'
          : 'Combina .filter() antes de .map() para mostrar solo los elementos que necesitas.'}
      </p>
      <CodeBlock code={filterCode} language="jsx" title="TaskList.jsx" />

      <h2>{isEn ? 'Nested lists' : 'Listas anidadas'}</h2>
      <CodeBlock code={nestedCode} language="jsx" title="CategoryList.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a shopping cart: start with an array of products (name, price, emoji). Render them as a list. Add a button to remove each item. Show the total price at the bottom.'
            : '✍️ Crea un carrito de compras: empieza con un array de productos (name, price, emoji). Renderízalos como lista. Agrega un botón para eliminar cada item. Muestra el precio total al final.'}
        </p>
      </div>
    </LessonLayout>
  );
}
