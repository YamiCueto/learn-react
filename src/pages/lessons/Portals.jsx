import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const conceptCode = `import { createPortal } from 'react-dom';

// createPortal(children, domNode)
// Renders children into domNode instead of the parent DOM node

function Modal({ children, onClose }) {
  // Even though <Modal> is inside <App>, its DOM outputs to document.body
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body  // ← render target outside the React root
  );
}`;

const whyCode = `// Problem: CSS overflow:hidden or z-index stacking context
// can clip or hide children even at z-index: 9999
//
// ❌ Without portal — modal is inside a clipping parent:
//
// <div style="overflow: hidden; z-index: 1">   ← clips children!
//   <Modal />   ← visually clipped, even with z-index: 9999
// </div>
//
// ✅ With portal — modal renders directly on <body>:
//
// <div style="overflow: hidden; z-index: 1">
//   {/* nothing here in the DOM */}
// </div>
// <div class="modal-overlay">...</div>  ← on <body>, no clipping
//
// Events still bubble up through the React tree (not the DOM tree).
// So React context still works inside portals!`;

const modalCode = `import { createPortal } from 'react-dom';
import { useState } from 'react';

function Modal({ title, children, onClose }) {
  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'grid', placeItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 320 }}
        onClick={e => e.stopPropagation()}
      >
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ overflow: 'hidden' }}> {/* won't clip the modal! */}
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <Modal title="Hello from a Portal!" onClose={() => setOpen(false)}>
          <p>I render on document.body, not inside the overflow:hidden div.</p>
        </Modal>
      )}
    </div>
  );
}`;

const toastCode = `import { createPortal } from 'react-dom';
import { useState, useCallback } from 'react';

// Toasts rendered directly on body, always on top
function ToastContainer({ toasts, onRemove }) {
  return createPortal(
    <div style={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{ background: '#1e293b', color: '#f8fafc', padding: '12px 20px', borderRadius: 8, cursor: 'pointer' }}
          onClick={() => onRemove(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>,
    document.body
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message) => {
    const id = Date.now();
    setToasts(t => [...t, { id, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  const removeToast = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);
  return { toasts, addToast, removeToast };
}

function App() {
  const { toasts, addToast, removeToast } = useToast();
  return (
    <div>
      <button onClick={() => addToast('Action completed ✅')}>Show Toast</button>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}`;

export default function Portals() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="portals" level="advanced">
      <h1>Portals</h1>
      <p>
        {isEn
          ? 'Portals let you render a component\'s output into a different DOM node than its parent. This is the correct solution for modals, tooltips, dropdowns, and toast notifications — anything that needs to visually escape its container\'s CSS constraints (overflow, z-index, etc.).'
          : 'Los portales te permiten renderizar la salida de un componente en un nodo DOM diferente al de su padre. Esta es la solución correcta para modals, tooltips, dropdowns y notificaciones toast — cualquier cosa que necesite escapar visualmente de las restricciones CSS de su contenedor (overflow, z-index, etc.).'}
      </p>

      <h2>{isEn ? 'The API' : 'La API'}</h2>
      <CodeBlock code={conceptCode} language="jsx" title="Modal.jsx" />

      <h2>{isEn ? 'Why portals exist' : 'Por qué existen los portales'}</h2>
      <p>
        {isEn
          ? 'Key insight: events still bubble through the React component tree (not the DOM tree), so context and event handlers work normally inside portals.'
          : 'Punto clave: los eventos siguen propagándose por el árbol de componentes React (no por el árbol del DOM), así que el context y los manejadores de eventos funcionan normalmente dentro de los portales.'}
      </p>
      <CodeBlock code={whyCode} language="jsx" title="concept.jsx" />

      <h2>{isEn ? 'Modal with portal' : 'Modal con portal'}</h2>
      <CodeBlock code={modalCode} language="jsx" title="App.jsx" />

      <h2>{isEn ? 'Toast notification system' : 'Sistema de notificaciones toast'}</h2>
      <p>
        {isEn
          ? 'Toasts are another classic portal use case — they must always appear on top of everything, regardless of where in the component tree they\'re triggered.'
          : 'Los toasts son otro caso de uso clásico de portal — deben aparecer siempre encima de todo, independientemente de dónde en el árbol de componentes se disparen.'}
      </p>
      <CodeBlock code={toastCode} language="jsx" title="Toast.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a Tooltip component using a portal. When hovering over a button, show a tooltip at the correct position (using getBoundingClientRect() on the button ref). The tooltip should render on document.body. Ensure it disappears on mouse leave and handles window resize correctly.'
            : '✍️ Construye un componente Tooltip usando un portal. Al hacer hover sobre un botón, muestra un tooltip en la posición correcta (usando getBoundingClientRect() en el ref del botón). El tooltip debe renderizarse en document.body. Asegúrate de que desaparece al salir con el mouse y maneja correctamente el resize de la ventana.'}
        </p>
      </div>
    </LessonLayout>
  );
}
