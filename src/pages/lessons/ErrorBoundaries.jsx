import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const whyCode = `// React renders your component tree top-down.
// If any component throws during render, the entire tree crashes.
//
// ❌ Without an Error Boundary — white screen of death:
//
//  <App>
//    <Header />
//    <BrokenChart />   ← throws here → whole app unmounts
//    <Footer />
//
// ✅ With an Error Boundary — only the broken subtree is replaced:
//
//  <App>
//    <Header />
//    <ErrorBoundary fallback={<p>Chart failed</p>}>
//      <BrokenChart />  ← throws → only this is replaced
//    </ErrorBoundary>
//    <Footer />         ← still works!`;

const classBasedCode = `// Error Boundaries MUST be class components (as of React 19)
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Called when a descendant throws — update state to show fallback
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Called with full error info — great for logging to Sentry, etc.
  componentDidCatch(error, info) {
    console.error('Caught by boundary:', error);
    console.error('Component stack:', info.componentStack);
    // logErrorToService(error, info); // send to monitoring
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI
      return this.props.fallback ?? (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;`;

const usageCode = `import ErrorBoundary from './ErrorBoundary';

// Wrap only the sections that might fail
function App() {
  return (
    <div>
      <Header />

      {/* Isolate risky data-fetching components */}
      <ErrorBoundary fallback={<p>⚠️ Dashboard failed to load.</p>}>
        <Dashboard />
      </ErrorBoundary>

      {/* Each chart has its own boundary */}
      <ErrorBoundary fallback={<p>Chart unavailable</p>}>
        <SalesChart />
      </ErrorBoundary>

      <Footer />
    </div>
  );
}`;

const reactErrorBoundaryCode = `// react-error-boundary library gives you a cleaner API
// npm install react-error-boundary

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => { /* reset app state here */ }}
      onError={(error, info) => logToSentry(error, info)}
    >
      <Dashboard />
    </ErrorBoundary>
  );
}`;

const limitsCode = `// ⚠️ Error Boundaries do NOT catch:
// - Errors in event handlers (use try/catch inside onClick, etc.)
// - Errors in async code (setTimeout, fetch callbacks)
// - Errors in the Error Boundary itself
// - Server-side rendering errors

// ✅ For event handler errors, use regular try/catch:
function Button() {
  const handleClick = async () => {
    try {
      await riskyOperation();
    } catch (err) {
      setError(err.message); // show error in UI
    }
  };
  return <button onClick={handleClick}>Go</button>;
}`;

export default function ErrorBoundaries() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="error-boundaries" level="advanced">
      <h1>Error Boundaries</h1>
      <p>
        {isEn
          ? 'Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of crashing the whole application. They\'re the React equivalent of a try/catch block, but for render errors.'
          : 'Los Error Boundaries son componentes de React que capturan errores de JavaScript en cualquier parte del árbol de componentes hijo y muestran una UI de respaldo en lugar de crashear toda la aplicación. Son el equivalente en React de un bloque try/catch, pero para errores de renderizado.'}
      </p>

      <h2>{isEn ? 'Why they matter' : 'Por qué importan'}</h2>
      <CodeBlock code={whyCode} language="jsx" title="concept.jsx" />

      <h2>{isEn ? 'Building one' : 'Cómo construir uno'}</h2>
      <p>
        {isEn
          ? 'Error Boundaries require class components because they rely on lifecycle methods not yet available as hooks (getDerivedStateFromError and componentDidCatch).'
          : 'Los Error Boundaries requieren componentes de clase porque dependen de métodos del ciclo de vida aún no disponibles como hooks (getDerivedStateFromError y componentDidCatch).'}
      </p>
      <CodeBlock code={classBasedCode} language="jsx" title="ErrorBoundary.jsx" />

      <h2>{isEn ? 'Usage' : 'Uso'}</h2>
      <CodeBlock code={usageCode} language="jsx" title="App.jsx" />

      <h2>react-error-boundary</h2>
      <p>
        {isEn
          ? 'The react-error-boundary library wraps the class boilerplate and adds useful features like reset callbacks and error logging hooks.'
          : 'La librería react-error-boundary envuelve el boilerplate de clase y añade funcionalidades útiles como callbacks de reset y hooks de logging de errores.'}
      </p>
      <CodeBlock code={reactErrorBoundaryCode} language="jsx" title="App.jsx" />

      <h2>{isEn ? 'Limitations' : 'Limitaciones'}</h2>
      <CodeBlock code={limitsCode} language="jsx" title="limits.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Create an ErrorBoundary component with a "Try again" button that resets the error state. Then build a UserProfile component that randomly throws an error 50% of the time (Math.random() < 0.5). Wrap it with your ErrorBoundary and verify that clicking "Try again" retries the render.'
            : '✍️ Crea un componente ErrorBoundary con un botón "Intentar de nuevo" que resetee el estado de error. Luego construye un componente UserProfile que lanza un error aleatoriamente el 50% de las veces (Math.random() < 0.5). Envuélvelo con tu ErrorBoundary y verifica que al hacer clic en "Intentar de nuevo" se reintenta el render.'}
        </p>
      </div>
    </LessonLayout>
  );
}
