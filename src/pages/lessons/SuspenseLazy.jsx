import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const problemCode = `// Without code splitting, your ENTIRE app ships in one JS bundle.
// Users download code for pages they may never visit.
//
// Before lazy:
import HeavyDashboard from './pages/Dashboard';   // always downloaded
import AdminPanel from './pages/AdminPanel';       // always downloaded
import Charts from './pages/Charts';              // always downloaded
//
// bundle.js: 2.4 MB  ← user downloads this on first load
//
// With lazy — each page is a separate chunk downloaded on demand:
// bundle.js: 180 KB   ← fast first load
// dashboard.chunk.js:  loaded when user navigates to /dashboard
// admin.chunk.js:      loaded only if user visits /admin`;

const basicLazyCode = `import { lazy, Suspense } from 'react';

// lazy() takes a dynamic import — Vite splits this into a separate chunk
const HeavyDashboard = lazy(() => import('./pages/Dashboard'));
const Charts = lazy(() => import('./pages/Charts'));

// Suspense shows a fallback while the chunk is being downloaded
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<p>Loading dashboard...</p>}>
            <HeavyDashboard />
          </Suspense>
        }
      />

      <Route
        path="/charts"
        element={
          <Suspense fallback={<Spinner />}>
            <Charts />
          </Suspense>
        }
      />
    </Routes>
  );
}`;

const globalSuspenseCode = `// Better pattern: one Suspense wraps all lazy routes
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile   = lazy(() => import('./pages/Profile'));
const Settings  = lazy(() => import('./pages/Settings'));

function App() {
  return (
    // One Suspense at the route level covers all lazy pages
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile"   element={<Profile />} />
        <Route path="/settings"  element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

function PageSpinner() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
      <div className="spinner" />
    </div>
  );
}`;

const suspenseDataCode = `// React 19: Suspense works with use() for async data too
import { Suspense, use } from 'react';

// Start fetching immediately — outside the component
const userPromise = fetch('/api/user').then(r => r.json());

function UserName() {
  // use() suspends the component until the promise resolves
  const user = use(userPromise);
  return <h1>Hello, {user.name}!</h1>;
}

function App() {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <UserName />  {/* suspends until userPromise resolves */}
    </Suspense>
  );
}`;

const withErrorBoundaryCode = `import { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

const Dashboard = lazy(() => import('./pages/Dashboard'));

// Combine Suspense (loading state) + ErrorBoundary (error state)
function SafeLazyRoute({ component: Component }) {
  return (
    <ErrorBoundary fallback={<p>Failed to load page.</p>}>
      <Suspense fallback={<PageSpinner />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}

// Usage
<Route path="/dashboard" element={<SafeLazyRoute component={Dashboard} />} />`;

export default function SuspenseLazy() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="suspense-lazy" level="advanced">
      <h1>Suspense & lazy</h1>
      <p>
        {isEn
          ? 'React.lazy and Suspense work together to implement code splitting — loading JavaScript bundles only when they\'re needed. This dramatically improves initial load time by shipping users only the code required for the current page.'
          : 'React.lazy y Suspense trabajan juntos para implementar code splitting — cargar bundles de JavaScript solo cuando se necesitan. Esto mejora drásticamente el tiempo de carga inicial al enviar a los usuarios solo el código requerido para la página actual.'}
      </p>

      <h2>{isEn ? 'The problem: one giant bundle' : 'El problema: un bundle gigante'}</h2>
      <CodeBlock code={problemCode} language="jsx" title="concept.jsx" />

      <h2>{isEn ? 'lazy + Suspense basics' : 'lazy + Suspense básico'}</h2>
      <p>
        {isEn
          ? 'lazy() wraps a dynamic import. Suspense defines what to show while the chunk downloads. The combination is that simple.'
          : 'lazy() envuelve un import dinámico. Suspense define qué mostrar mientras el chunk se descarga. La combinación es así de simple.'}
      </p>
      <CodeBlock code={basicLazyCode} language="jsx" title="App.jsx" />

      <h2>{isEn ? 'One Suspense for all routes (recommended)' : 'Un Suspense para todas las rutas (recomendado)'}</h2>
      <CodeBlock code={globalSuspenseCode} language="jsx" title="App.jsx" />

      <h2>{isEn ? 'Suspense with async data (React 19)' : 'Suspense con datos async (React 19)'}</h2>
      <p>
        {isEn
          ? 'React 19 introduces the use() hook that works with Suspense for data fetching. Start the fetch before the component renders to avoid waterfalls.'
          : 'React 19 introduce el hook use() que funciona con Suspense para obtener datos. Inicia el fetch antes de que el componente renderice para evitar waterfalls.'}
      </p>
      <CodeBlock code={suspenseDataCode} language="jsx" title="UserName.jsx" />

      <h2>{isEn ? 'Combining with Error Boundaries' : 'Combinando con Error Boundaries'}</h2>
      <p>
        {isEn
          ? 'Suspense handles the loading state; Error Boundary handles the failure state. Always use both in production.'
          : 'Suspense maneja el estado de carga; Error Boundary maneja el estado de fallo. Siempre usa ambos en producción.'}
      </p>
      <CodeBlock code={withErrorBoundaryCode} language="jsx" title="SafeLazyRoute.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Convert your app\'s routes to use lazy loading. Add a global Suspense boundary with a spinner fallback, and wrap it with an ErrorBoundary. Then open the Network tab in DevTools and navigate between pages — you should see separate .js chunks being downloaded for each route.'
            : '✍️ Convierte las rutas de tu app para usar lazy loading. Agrega un límite Suspense global con un spinner de fallback, y envuélvelo con un ErrorBoundary. Luego abre la pestaña Network en DevTools y navega entre páginas — deberías ver chunks .js separados descargándose para cada ruta.'}
        </p>
      </div>
    </LessonLayout>
  );
}
