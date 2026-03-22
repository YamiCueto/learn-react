import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const conceptCode = `// useReducer is an alternative to useState for complex state
// dispatch(action) → reducer(state, action) → newState

const [state, dispatch] = useReducer(reducer, initialState);

// The reducer is a PURE function — no side effects, no mutations
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET':     return { count: 0 };
    default: throw new Error('Unknown action: ' + action.type);
  }
}`;

const counterCode = `import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET':     return { count: 0 };
    case 'SET':       return { count: action.payload };
    default: throw new Error('Unknown action: ' + action.type);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 100 })}>Set 100</button>
    </div>
  );
}`;

const todoCode = `import { useReducer } from 'react';

const initialState = { todos: [], nextId: 1, filter: 'all' };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [...state.todos, { id: state.nextId, text: action.text, done: false }],
        nextId: state.nextId + 1,
      };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
    case 'DELETE':
      return { ...state, todos: state.todos.filter(t => t.id !== action.id) };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const visible = state.todos.filter(t => {
    if (state.filter === 'active') return !t.done;
    if (state.filter === 'done')   return t.done;
    return true;
  });

  return (
    <div>
      <input
        onKeyDown={e => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            dispatch({ type: 'ADD', text: e.target.value.trim() });
            e.target.value = '';
          }
        }}
        placeholder="Add todo and press Enter"
      />
      <div>
        {['all', 'active', 'done'].map(f => (
          <button
            key={f}
            onClick={() => dispatch({ type: 'SET_FILTER', filter: f })}
            style={{ fontWeight: state.filter === f ? 'bold' : 'normal' }}
          >
            {f}
          </button>
        ))}
      </div>
      <ul>
        {visible.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch({ type: 'TOGGLE', id: todo.id })}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

const vsStateCode = `// ✅ Use useState when:
const [name, setName] = useState('');          // simple primitive
const [isOpen, setIsOpen] = useState(false);   // boolean toggle

// ✅ Use useReducer when:
// - Multiple related pieces of state that change together
// - Next state depends on previous state in complex ways
// - State transitions have named business rules (ADD, DELETE, TOGGLE)
// - You want easier testing (reducer is a plain function)

// Rule of thumb: if setState calls start referencing other state
// values, it's time to switch to useReducer.`;

export default function UseReducer() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="use-reducer" level="advanced">
      <h1>useReducer</h1>
      <p>
        {isEn
          ? 'useReducer is an alternative to useState for managing complex state logic. Instead of calling setState directly, you dispatch actions that describe what happened — a reducer function then decides how state should change. It\'s the same pattern Redux is built on, built right into React.'
          : 'useReducer es una alternativa a useState para manejar lógica de estado compleja. En lugar de llamar a setState directamente, despachas acciones que describen qué pasó — una función reducer luego decide cómo debe cambiar el estado. Es el mismo patrón en el que se basa Redux, incorporado directamente en React.'}
      </p>

      <h2>{isEn ? 'The concept' : 'El concepto'}</h2>
      <CodeBlock code={conceptCode} language="jsx" title="concept.jsx" />

      <h2>{isEn ? 'Basic counter' : 'Contador básico'}</h2>
      <p>
        {isEn
          ? 'Actions can carry a payload for dynamic values. The reducer handles every possible transition in one place.'
          : 'Las acciones pueden llevar un payload para valores dinámicos. El reducer maneja cada transición posible en un solo lugar.'}
      </p>
      <CodeBlock code={counterCode} language="jsx" title="Counter.jsx" />

      <h2>{isEn ? 'Real-world: Todo app' : 'Caso real: app de tareas'}</h2>
      <p>
        {isEn
          ? 'This is where useReducer shines — multiple related state slices (todos, nextId, filter) that change together via clearly named actions.'
          : 'Aquí es donde useReducer brilla — múltiples porciones de estado relacionadas (todos, nextId, filter) que cambian juntas mediante acciones con nombres claros.'}
      </p>
      <CodeBlock code={todoCode} language="jsx" title="TodoApp.jsx" />

      <h2>{isEn ? 'useState vs useReducer' : 'useState vs useReducer'}</h2>
      <CodeBlock code={vsStateCode} language="jsx" title="when-to-use.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a shopping cart with useReducer. Actions: ADD_ITEM (with quantity), REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART. State should include items array and total. Render the cart with item list, quantity controls, total price, and a checkout button that clears the cart.'
            : '✍️ Construye un carrito de compras con useReducer. Acciones: ADD_ITEM (con cantidad), REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART. El estado debe incluir un array de items y el total. Renderiza el carrito con lista de items, controles de cantidad, precio total y un botón de checkout que vacíe el carrito.'}
        </p>
      </div>
    </LessonLayout>
  );
}
