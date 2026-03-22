// React tips shown when collecting coins
// type: 'gold' = basic, 'blue' = advanced, 'star' = fun fact

export const TIPS = [
  // ── GOLD: Basic ───────────────────────────────
  {
    id: 1, type: 'gold',
    es: { title: 'Componentes 🧱', body: 'Una función que retorna JSX. ¡Reutilizable!', code: 'function Btn({ label }) {\n  return <button>{label}</button>;\n}' },
    en: { title: 'Components 🧱', body: 'A function that returns JSX. Reusable!', code: 'function Btn({ label }) {\n  return <button>{label}</button>;\n}' },
  },
  {
    id: 2, type: 'gold',
    es: { title: 'JSX', body: 'HTML dentro de JS. Siempre retorna UN elemento raíz.', code: 'return (\n  <div>\n    <h1>Hola</h1>\n    <p>Mundo</p>\n  </div>\n);' },
    en: { title: 'JSX', body: 'HTML inside JS. Always return ONE root element.', code: 'return (\n  <div>\n    <h1>Hello</h1>\n    <p>World</p>\n  </div>\n);' },
  },
  {
    id: 3, type: 'gold',
    es: { title: 'Props', body: 'Datos que van del padre al hijo. Solo lectura.', code: '<Card name="Yamid" level={42} />' },
    en: { title: 'Props', body: 'Data from parent to child. Read-only.', code: '<Card name="Yamid" level={42} />' },
  },
  {
    id: 4, type: 'gold',
    es: { title: 'useState', body: 'Guarda un valor y actualiza la pantalla al cambiarlo.', code: 'const [count, setCount] = useState(0);\nsetCount(count + 1);' },
    en: { title: 'useState', body: 'Stores a value and updates the screen when it changes.', code: 'const [count, setCount] = useState(0);\nsetCount(count + 1);' },
  },
  {
    id: 5, type: 'gold',
    es: { title: 'Eventos', body: 'Usa camelCase: onClick, onChange, onSubmit.', code: '<input onChange={(e) =>\n  setValue(e.target.value)\n} />' },
    en: { title: 'Events', body: 'Use camelCase: onClick, onChange, onSubmit.', code: '<input onChange={(e) =>\n  setValue(e.target.value)\n} />' },
  },
  {
    id: 6, type: 'gold',
    es: { title: 'Listas 📋', body: 'Usa .map() y siempre pon una key única.', code: 'items.map(item => (\n  <li key={item.id}>{item.name}</li>\n))' },
    en: { title: 'Lists 📋', body: 'Use .map() and always add a unique key.', code: 'items.map(item => (\n  <li key={item.id}>{item.name}</li>\n))' },
  },
  {
    id: 7, type: 'gold',
    es: { title: 'Condicional', body: 'Muestra u oculta elementos con ? : o &&.', code: '{isLogged ? <Dashboard /> : <Login />}\n{error && <ErrorMsg />}' },
    en: { title: 'Conditional', body: 'Show or hide elements with ? : or &&.', code: '{isLogged ? <Dashboard /> : <Login />}\n{error && <ErrorMsg />}' },
  },
  {
    id: 8, type: 'gold',
    es: { title: 'Children', body: 'Lo que pones entre etiquetas llega como children.', code: 'function Card({ children }) {\n  return <div>{children}</div>;\n}' },
    en: { title: 'Children', body: 'What you put between tags arrives as children.', code: 'function Card({ children }) {\n  return <div>{children}</div>;\n}' },
  },
  // ── BLUE: Advanced ────────────────────────────
  {
    id: 9, type: 'blue',
    es: { title: 'useEffect', body: 'Corre después del render. Ideal para fetch de datos.', code: 'useEffect(() => {\n  fetchUser(id).then(setUser);\n}, [id]);' },
    en: { title: 'useEffect', body: 'Runs after render. Great for data fetching.', code: 'useEffect(() => {\n  fetchUser(id).then(setUser);\n}, [id]);' },
  },
  {
    id: 10, type: 'blue',
    es: { title: 'useContext', body: 'Comparte datos globales sin pasar props a cada hijo.', code: 'const theme = useContext(ThemeCtx);' },
    en: { title: 'useContext', body: 'Share global data without passing props everywhere.', code: 'const theme = useContext(ThemeCtx);' },
  },
  {
    id: 11, type: 'blue',
    es: { title: 'Custom Hooks', body: 'Empieza con "use". Reutiliza lógica entre componentes.', code: 'function useCounter(init = 0) {\n  const [n, setN] = useState(init);\n  return { n, inc: () => setN(n+1) };\n}' },
    en: { title: 'Custom Hooks', body: 'Start with "use". Reuse logic across components.', code: 'function useCounter(init = 0) {\n  const [n, setN] = useState(init);\n  return { n, inc: () => setN(n+1) };\n}' },
  },
  {
    id: 12, type: 'blue',
    es: { title: 'useMemo', body: 'Evita recalcular algo costoso si los datos no cambiaron.', code: 'const sorted = useMemo(\n  () => list.sort(compare),\n  [list]\n);' },
    en: { title: 'useMemo', body: 'Skip expensive recalculations when data hasn\'t changed.', code: 'const sorted = useMemo(\n  () => list.sort(compare),\n  [list]\n);' },
  },
  // ── STAR: Fun facts ───────────────────────────
  {
    id: 13, type: 'star',
    es: { title: '¿Sabías? 🌟', body: 'React nació en Facebook en 2013. ¡Tiene más de 220k ⭐ en GitHub!', code: '// 220k+ ⭐ en GitHub' },
    en: { title: 'Did you know? 🌟', body: 'React was born at Facebook in 2013. Over 220k ⭐ on GitHub!', code: '// 220k+ ⭐ on GitHub' },
  },
  {
    id: 14, type: 'star',
    es: { title: '¿Sabías? 🌟', body: '"React" porque la UI reacciona a los datos. ¡Simple!', code: '// UI = f(state) ⚛️' },
    en: { title: 'Did you know? 🌟', body: '"React" because the UI reacts to data. Simple!', code: '// UI = f(state) ⚛️' },
  },
  {
    id: 15, type: 'star',
    es: { title: '¿Sabías? 🌟', body: 'Con React Native haces apps móviles. ¡Un lenguaje, tres plataformas!', code: '// Web, Mobile y Desktop con React' },
    en: { title: 'Did you know? 🌟', body: 'React Native builds mobile apps. One language, three platforms!', code: '// Web, Mobile & Desktop with React' },
  },
];

export function getRandomTip(type) {
  const pool = type ? TIPS.filter(t => t.type === type) : TIPS;
  return pool[Math.floor(Math.random() * pool.length)];
}
