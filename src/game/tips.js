// React tips shown when collecting coins
// type: 'gold' = basic, 'blue' = advanced, 'star' = fun fact

export const TIPS = [
  // ── GOLD: Basic ───────────────────────────────
  {
    id: 1, type: 'gold',
    es: { title: 'Componentes', body: 'Un componente React es una función que retorna JSX. Reutilizable como bloques de LEGO 🧱', code: 'function Btn({ label }) {\n  return <button>{label}</button>;\n}' },
    en: { title: 'Components', body: 'A React component is a function that returns JSX. Reusable like LEGO blocks 🧱', code: 'function Btn({ label }) {\n  return <button>{label}</button>;\n}' },
  },
  {
    id: 2, type: 'gold',
    es: { title: 'JSX', body: 'JSX parece HTML pero es JavaScript. Una regla clave: retorna siempre UN elemento raíz.', code: 'return (\n  <div>\n    <h1>Hola</h1>\n    <p>Mundo</p>\n  </div>\n);' },
    en: { title: 'JSX', body: 'JSX looks like HTML but is JavaScript. Key rule: always return ONE root element.', code: 'return (\n  <div>\n    <h1>Hello</h1>\n    <p>World</p>\n  </div>\n);' },
  },
  {
    id: 3, type: 'gold',
    es: { title: 'Props', body: 'Las props pasan datos de padre a hijo. Son de solo lectura — nunca las mutés directamente.', code: '<Card name="Yamid"\n      role="Dev"\n      level={42} />' },
    en: { title: 'Props', body: 'Props pass data from parent to child. They are read-only — never mutate them directly.', code: '<Card name="Yamid"\n      role="Dev"\n      level={42} />' },
  },
  {
    id: 4, type: 'gold',
    es: { title: 'useState', body: 'useState retorna [valor, setter]. Al llamar el setter, React re-renderiza con el nuevo valor.', code: 'const [count, setCount] = useState(0);\nsetCount(count + 1);' },
    en: { title: 'useState', body: 'useState returns [value, setter]. Calling the setter triggers a re-render with the new value.', code: 'const [count, setCount] = useState(0);\nsetCount(count + 1);' },
  },
  {
    id: 5, type: 'gold',
    es: { title: 'Eventos', body: 'Los eventos React usan camelCase. onClick, onChange, onSubmit... El handler recibe el evento como argumento.', code: '<input onChange={(e) =>\n  setValue(e.target.value)\n} />' },
    en: { title: 'Events', body: 'React events use camelCase: onClick, onChange, onSubmit... The handler receives the event object.', code: '<input onChange={(e) =>\n  setValue(e.target.value)\n} />' },
  },
  {
    id: 6, type: 'gold',
    es: { title: 'Listas y Keys', body: 'Usa .map() para listas. La prop key es OBLIGATORIA y debe ser única. Nunca uses el index en listas dinámicas.', code: 'items.map(item => (\n  <li key={item.id}>\n    {item.name}\n  </li>\n))' },
    en: { title: 'Lists & Keys', body: 'Use .map() for lists. The key prop is REQUIRED and must be unique. Never use index in dynamic lists.', code: 'items.map(item => (\n  <li key={item.id}>\n    {item.name}\n  </li>\n))' },
  },
  {
    id: 7, type: 'gold',
    es: { title: 'Renderizado Condicional', body: 'Usa el ternario ? : o el operador && para mostrar/ocultar elementos según el estado.', code: '{isLogged\n  ? <Dashboard />\n  : <Login />}\n{error && <ErrorMsg />}' },
    en: { title: 'Conditional Rendering', body: 'Use ternary ? : or the && operator to show/hide elements based on state.', code: '{isLogged\n  ? <Dashboard />\n  : <Login />}\n{error && <ErrorMsg />}' },
  },
  {
    id: 8, type: 'gold',
    es: { title: 'Children Prop', body: 'Lo que pones entre etiquetas de un componente se convierte en la prop children. Ideal para wrappers.', code: 'function Card({ children }) {\n  return (\n    <div className="card">\n      {children}\n    </div>\n  );\n}' },
    en: { title: 'Children Prop', body: 'What you put between a component\'s tags becomes the children prop. Great for wrapper components.', code: 'function Card({ children }) {\n  return (\n    <div className="card">\n      {children}\n    </div>\n  );\n}' },
  },
  // ── BLUE: Advanced ────────────────────────────
  {
    id: 9, type: 'blue',
    es: { title: 'useEffect', body: 'Se ejecuta después del render. Úsalo para: fetch de datos, subscripciones, manipular el DOM. El array de deps controla cuándo corre.', code: 'useEffect(() => {\n  fetchUser(id).then(setUser);\n}, [id]);' },
    en: { title: 'useEffect', body: 'Runs after render. Use it for: data fetching, subscriptions, DOM manipulation. The deps array controls when it runs.', code: 'useEffect(() => {\n  fetchUser(id).then(setUser);\n}, [id]);' },
  },
  {
    id: 10, type: 'blue',
    es: { title: 'useContext', body: 'Elimina el prop drilling. Crea un contexto global que cualquier hijo puede consumir directamente.', code: 'const theme = useContext(ThemeCtx);\n// Sin pasar props por 10 niveles 🎉' },
    en: { title: 'useContext', body: 'Eliminates prop drilling. Create global context that any child can consume directly.', code: 'const theme = useContext(ThemeCtx);\n// No passing props through 10 levels 🎉' },
  },
  {
    id: 11, type: 'blue',
    es: { title: 'Custom Hooks', body: 'Funciones que usan otros hooks. Siempre empiezan con "use". Extraen y reutilizan lógica entre componentes.', code: 'function useCounter(init = 0) {\n  const [n, setN] = useState(init);\n  return { n, inc: () => setN(n+1) };\n}' },
    en: { title: 'Custom Hooks', body: 'Functions that use other hooks. Always start with "use". They extract and reuse logic across components.', code: 'function useCounter(init = 0) {\n  const [n, setN] = useState(init);\n  return { n, inc: () => setN(n+1) };\n}' },
  },
  {
    id: 12, type: 'blue',
    es: { title: 'useMemo', body: 'Memoriza el resultado de un cálculo costoso. Solo recalcula cuando cambian las dependencias. Evita trabajo innecesario.', code: 'const sorted = useMemo(() =>\n  list.sort(compare),\n  [list]\n);' },
    en: { title: 'useMemo', body: 'Memoizes the result of an expensive computation. Only recalculates when dependencies change.', code: 'const sorted = useMemo(() =>\n  list.sort(compare),\n  [list]\n);' },
  },
  // ── STAR: Fun facts ───────────────────────────
  {
    id: 13, type: 'star',
    es: { title: '¿Sabías que...? 🌟', body: 'React fue creado por Jordan Walke en Facebook en 2013. La primera app pública en usarlo fue... ¡el feed de noticias de Facebook!', code: '// React cumplirá 13 años en 2026\n// 220k+ ⭐ en GitHub' },
    en: { title: 'Did you know...? 🌟', body: 'React was created by Jordan Walke at Facebook in 2013. The first public app to use it was... the Facebook News Feed!', code: '// React will turn 13 years old in 2026\n// 220k+ ⭐ on GitHub' },
  },
  {
    id: 14, type: 'star',
    es: { title: '¿Sabías que...? 🌟', body: 'El nombre "React" viene de "reaccionar" a los cambios de estado. ¡La UI reacciona automáticamente cuando los datos cambian!', code: '// UI = f(state)\n// Tu UI es una función de tu estado ⚛️' },
    en: { title: 'Did you know...? 🌟', body: 'The name "React" comes from "reacting" to state changes. The UI automatically reacts when data changes!', code: '// UI = f(state)\n// Your UI is a function of your state ⚛️' },
  },
  {
    id: 15, type: 'star',
    es: { title: '¿Sabías que...? 🌟', body: 'React Native usa los mismos conceptos de React para construir apps móviles nativas para iOS y Android. ¡Un solo lenguaje, múltiples plataformas!', code: '// Web → React\n// Mobile → React Native\n// Desktop → Electron + React' },
    en: { title: 'Did you know...? 🌟', body: 'React Native uses the same React concepts to build native mobile apps for iOS and Android. One language, multiple platforms!', code: '// Web → React\n// Mobile → React Native\n// Desktop → Electron + React' },
  },
];

export function getRandomTip(type) {
  const pool = type ? TIPS.filter(t => t.type === type) : TIPS;
  return pool[Math.floor(Math.random() * pool.length)];
}
