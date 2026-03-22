import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const setupCode = `// 1. Install react-router-dom
// npm install react-router-dom

// 2. Wrap your app with a Router in main.jsx
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);`;

const basicRoutesCode = `import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Navigation links */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Route definitions — only one renders at a time */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}`;

const useParamsCode = `import { useParams, Link } from 'react-router-dom';

// Route definition:  <Route path="/users/:id" element={<UserDetail />} />

function UserDetail() {
  const { id } = useParams(); // reads :id from the URL

  return (
    <div>
      <h1>User #{id}</h1>
      <Link to="/users">← Back to list</Link>
    </div>
  );
}

// Multiple params:  /posts/:category/:slug
function Post() {
  const { category, slug } = useParams();
  return <h1>{category} / {slug}</h1>;
}`;

const useNavigateCode = `import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(e.target);

    if (ok) {
      navigate('/dashboard');      // go forward
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <button type="submit">Login</button>
    </form>
  );
}`;

const navLinkCode = `import { NavLink } from 'react-router-dom';

// NavLink adds an "active" class automatically when the URL matches
function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        // "active" class applied when on "/"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        end // "end" means match "/" exactly, not "/anything"
      >
        Home
      </NavLink>

      <NavLink
        to="/lessons"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Lessons
      </NavLink>
    </nav>
  );
}`;

const nestedRoutesCode = `// Nested routes share a layout component
import { Routes, Route, Outlet } from 'react-router-dom';

// Layout component — Outlet renders the matched child route
function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </aside>
      <main>
        <Outlet /> {/* child route renders here */}
      </main>
    </div>
  );
}

// Route config
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />      {/* /dashboard */}
        <Route path="profile" element={<Profile />} />  {/* /dashboard/profile */}
        <Route path="settings" element={<Settings />} />{/* /dashboard/settings */}
      </Route>
    </Routes>
  );
}`;

export default function ReactRouter() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="react-router" level="intermediate">
      <h1>React Router</h1>
      <p>
        {isEn
          ? 'React Router is the standard routing library for React. It lets you build single-page applications where the URL changes without a full page reload, mapping each URL to a different component (page).'
          : 'React Router es la librería de enrutamiento estándar para React. Te permite construir aplicaciones de una sola página donde la URL cambia sin recargar la página completa, mapeando cada URL a un componente (página) diferente.'}
      </p>

      <h2>{isEn ? 'Setup' : 'Configuración'}</h2>
      <CodeBlock code={setupCode} language="jsx" title="main.jsx" />

      <h2>{isEn ? 'Routes and Links' : 'Rutas y Links'}</h2>
      <p>
        {isEn
          ? 'Routes defines where components render. Link changes the URL without reloading the page. Only the first matching Route renders.'
          : 'Routes define dónde se renderizan los componentes. Link cambia la URL sin recargar la página. Solo la primera Route que coincide se renderiza.'}
      </p>
      <CodeBlock code={basicRoutesCode} language="jsx" title="App.jsx" />

      <h2>useParams</h2>
      <p>
        {isEn
          ? 'Dynamic segments in a path (like :id) let you create flexible routes. useParams reads these values from the current URL.'
          : 'Los segmentos dinámicos en una ruta (como :id) te permiten crear rutas flexibles. useParams lee estos valores de la URL actual.'}
      </p>
      <CodeBlock code={useParamsCode} language="jsx" title="UserDetail.jsx" />

      <h2>useNavigate</h2>
      <p>
        {isEn
          ? 'useNavigate gives you a function to programmatically change the URL — useful after form submissions, login, or any action that should redirect the user.'
          : 'useNavigate te da una función para cambiar la URL programáticamente — útil después de envíos de formularios, login, o cualquier acción que deba redirigir al usuario.'}
      </p>
      <CodeBlock code={useNavigateCode} language="jsx" title="LoginForm.jsx" />

      <h2>NavLink</h2>
      <p>
        {isEn
          ? 'NavLink is like Link but receives an isActive prop so you can style the active navigation link differently.'
          : 'NavLink es como Link pero recibe una prop isActive para que puedas estilizar el enlace de navegación activo de manera diferente.'}
      </p>
      <CodeBlock code={navLinkCode} language="jsx" title="Navbar.jsx" />

      <h2>{isEn ? 'Nested routes and Outlet' : 'Rutas anidadas y Outlet'}</h2>
      <p>
        {isEn
          ? 'Nested routes let child routes render inside a shared layout component. Outlet is the placeholder where the matched child route will appear.'
          : 'Las rutas anidadas permiten que las rutas hijas se rendericen dentro de un componente de layout compartido. Outlet es el marcador de posición donde aparecerá la ruta hija coincidente.'}
      </p>
      <CodeBlock code={nestedRoutesCode} language="jsx" title="App.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a small blog app with React Router: a home page listing posts (with Link to each), a post detail page using useParams to show the right post, and a 404 catch-all page. Add a Navbar with NavLink so the active page is highlighted.'
            : '✍️ Construye una pequeña app de blog con React Router: una página de inicio que liste los posts (con Link a cada uno), una página de detalle de post usando useParams para mostrar el post correcto, y una página 404 catch-all. Agrega un Navbar con NavLink para que la página activa esté resaltada.'}
        </p>
      </div>
    </LessonLayout>
  );
}
