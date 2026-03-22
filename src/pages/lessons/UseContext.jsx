import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const problemCode = `// ❌ Prop drilling — passing theme through every level
function App() {
  const [theme, setTheme] = useState('dark');
  return <Page theme={theme} setTheme={setTheme} />;
}

function Page({ theme, setTheme }) {
  return <Sidebar theme={theme} setTheme={setTheme} />;
}

function Sidebar({ theme, setTheme }) {
  return <ThemeToggle theme={theme} setTheme={setTheme} />;
}

// ThemeToggle finally uses the props 3 levels deep!`;

const createContextCode = `import { createContext, useContext, useState } from 'react';

// 1. Create the context (outside any component)
const ThemeContext = createContext('dark');

// 2. Create a Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for easy consumption
export function useTheme() {
  return useContext(ThemeContext);
}`;

const consumeCode = `// Now ANY component in the tree can use the theme
// No prop drilling needed!

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

function Page() {
  const { theme } = useTheme();
  return (
    <div className={\`page page--\${theme}\`}>
      <ThemeToggle />
      <p>Current theme: {theme}</p>
    </div>
  );
}

// Wrap your app with the Provider
function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}`;

const authContextCode = `// Real-world example: Auth context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login  = (userData) => setUser(userData);
  const logout = ()         => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Usage anywhere in the tree
function Navbar() {
  const { user, logout } = useAuth();
  return user
    ? <button onClick={logout}>Logout ({user.name})</button>
    : <button>Login</button>;
}`;

export default function UseContext() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="use-context" level="intermediate">
      <h1>useContext</h1>
      <p>
        {isEn
          ? 'Context solves prop drilling — the problem of passing data through many component layers just to reach a deeply nested child. With useContext, any component in the tree can access shared data directly.'
          : 'Context resuelve el prop drilling — el problema de pasar datos a través de muchas capas de componentes solo para llegar a un hijo profundamente anidado. Con useContext, cualquier componente en el árbol puede acceder a los datos compartidos directamente.'}
      </p>

      <h2>{isEn ? 'The problem: prop drilling' : 'El problema: prop drilling'}</h2>
      <CodeBlock code={problemCode} language="jsx" title="prop-drilling.jsx" />

      <h2>{isEn ? 'Solution: createContext + Provider' : 'Solución: createContext + Provider'}</h2>
      <p>
        {isEn
          ? 'The pattern has 3 steps: (1) create the context, (2) create a Provider that wraps your tree, (3) consume with useContext anywhere inside the Provider.'
          : 'El patrón tiene 3 pasos: (1) crear el contexto, (2) crear un Provider que envuelva tu árbol, (3) consumir con useContext en cualquier lugar dentro del Provider.'}
      </p>
      <CodeBlock code={createContextCode} language="jsx" title="ThemeContext.jsx" />

      <h2>{isEn ? 'Consuming the context' : 'Consumir el contexto'}</h2>
      <CodeBlock code={consumeCode} language="jsx" title="App.jsx" />

      <h2>{isEn ? 'Real-world example: Auth context' : 'Ejemplo real: contexto de Auth'}</h2>
      <CodeBlock code={authContextCode} language="jsx" title="AuthContext.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Create a CartContext that stores a list of products. Expose addItem and removeItem functions. Build two components: ProductList (shows products with "Add" buttons) and Cart (shows added items with "Remove" buttons and a total). Both should use the context.'
            : '✍️ Crea un CartContext que almacene una lista de productos. Expón funciones addItem y removeItem. Crea dos componentes: ProductList (muestra productos con botones "Agregar") y Cart (muestra los elementos agregados con botones "Eliminar" y un total). Ambos deben usar el contexto.'}
        </p>
      </div>
    </LessonLayout>
  );
}
