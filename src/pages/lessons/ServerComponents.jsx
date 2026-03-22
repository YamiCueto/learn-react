import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const conceptCode = `// Traditional React: ALL components run in the browser
// Server Components: some components run ONLY on the server
//
// Server Components (RSC):
// ✅ Run on the server — zero JS sent to the browser
// ✅ Can directly access databases, filesystems, secrets
// ✅ Output is serialized HTML/JSON — never hydrated
// ❌ Cannot use useState, useEffect, event handlers, browser APIs
//
// Client Components ("use client"):
// ✅ Run in the browser (and pre-rendered on server too)
// ✅ Can use all hooks, events, browser APIs
// ❌ JavaScript bundle shipped to the browser

// The default in React 19 / Next.js 15 is Server Component.
// You opt into client behavior with the "use client" directive.`;

const serverComponentCode = `// ProductList.jsx — Server Component (no "use client")
// This file NEVER ships to the browser as JavaScript

import { db } from '@/lib/db'; // direct database access — safe!

// async components are supported in RSC
export default async function ProductList() {
  // This runs on the server at request time (or build time)
  const products = await db.product.findMany({ take: 20 });

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <span>{product.name}</span>
          <span>\${product.price}</span>
        </li>
      ))}
    </ul>
  );
}`;

const clientComponentCode = `// AddToCartButton.jsx — Client Component
'use client'; // This directive makes it a Client Component

import { useState } from 'react';

export default function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    setAdded(true);
  };

  return (
    <button onClick={handleClick} disabled={added}>
      {added ? '✅ Added!' : 'Add to Cart'}
    </button>
  );
}`;

const compositionCode = `// You can import Client Components inside Server Components
// Server renders the outer shell; browser hydrates only the interactive parts

// page.jsx (Server Component)
import ProductList from './ProductList';        // Server Component
import AddToCartButton from './AddToCartButton'; // Client Component

export default async function Page() {
  const { user } = await getServerSession();

  return (
    <main>
      <h1>Welcome, {user.name}</h1>   {/* rendered on server */}
      <ProductList />                  {/* server — no JS bundle */}
      <AddToCartButton productId={1} /> {/* client — interactive */}
    </main>
  );
}

// What ships to the browser:
// ✅ HTML for <h1> and <ProductList> output
// ✅ Only the JS for <AddToCartButton>
// ❌ NOT the DB query code or session logic`;

const nextjsCode = `// React Server Components shine in frameworks like Next.js 15.
// Here's the file structure that makes them work:

// app/
//   layout.jsx          ← Server Component (wraps all pages)
//   page.jsx            ← Server Component by default
//   products/
//     page.jsx          ← Server Component — fetches data
//     AddToCart.jsx     ← 'use client' — handles interactions

// Fetching data in a Server Component with Next.js:
// app/products/page.jsx
export default async function ProductsPage() {
  // fetch() is extended in Next.js with caching options
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }, // cache for 60 seconds (ISR)
  });
  const products = await res.json();

  return (
    <section>
      {products.map(p => (
        <article key={p.id}>
          <h2>{p.name}</h2>
          <AddToCartButton productId={p.id} />
        </article>
      ))}
    </section>
  );
}`;

const rulesCode = `// ── What Server Components CAN do ────────────────────────
// ✅ async/await at the component level
// ✅ Import server-only packages (database drivers, fs, etc.)
// ✅ Access environment variables securely
// ✅ Import Client Components and pass them serializable props

// ── What Server Components CANNOT do ─────────────────────
// ❌ useState / useReducer / useEffect / useRef
// ❌ Event handlers (onClick, onChange, etc.)
// ❌ Browser APIs (window, document, localStorage)
// ❌ React Context (as provider — they can read it from Client parents)

// ── What Client Components CAN do ────────────────────────
// ✅ All hooks
// ✅ Event handlers
// ✅ Browser APIs

// ── What Client Components CANNOT do ─────────────────────
// ❌ Import Server Components directly into them
//    (you can pass them as children/props though)`;

export default function ServerComponents() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="server-components" level="advanced">
      <h1>Server Components</h1>
      <p>
        {isEn
          ? 'React Server Components (RSC) is the biggest architectural shift in React since hooks. They let you run React components entirely on the server — meaning the database query code, secrets, and heavy dependencies never ship to the browser. Only the rendered HTML output reaches the client.'
          : 'React Server Components (RSC) es el mayor cambio arquitectónico en React desde los hooks. Permiten ejecutar componentes React completamente en el servidor — lo que significa que el código de consulta a la base de datos, los secretos y las dependencias pesadas nunca llegan al navegador. Solo la salida HTML renderizada llega al cliente.'}
      </p>

      <h2>{isEn ? 'Server vs Client Components' : 'Componentes de servidor vs cliente'}</h2>
      <CodeBlock code={conceptCode} language="jsx" title="concept.jsx" />

      <h2>{isEn ? 'A Server Component' : 'Un componente de servidor'}</h2>
      <p>
        {isEn
          ? 'Server Components can be async — they can await database calls, file reads, or API requests directly inside the component body.'
          : 'Los componentes de servidor pueden ser async — pueden esperar llamadas a bases de datos, lecturas de archivos o solicitudes a APIs directamente dentro del cuerpo del componente.'}
      </p>
      <CodeBlock code={serverComponentCode} language="jsx" title="ProductList.jsx" />

      <h2>{isEn ? 'A Client Component' : 'Un componente de cliente'}</h2>
      <p>
        {isEn
          ? 'Add "use client" at the top of any file to mark it and its imports as Client Components. These work exactly like traditional React components.'
          : 'Agrega "use client" en la parte superior de cualquier archivo para marcarlo a él y sus imports como componentes de cliente. Estos funcionan exactamente como los componentes React tradicionales.'}
      </p>
      <CodeBlock code={clientComponentCode} language="jsx" title="AddToCartButton.jsx" />

      <h2>{isEn ? 'Composing them together' : 'Componerlos juntos'}</h2>
      <p>
        {isEn
          ? 'The key insight: Server Components render the outer shell with zero JS cost, then pass off only interactive islands to Client Components.'
          : 'El punto clave: los componentes de servidor renderizan la estructura exterior con cero costo de JS, luego delegan solo las islas interactivas a los componentes de cliente.'}
      </p>
      <CodeBlock code={compositionCode} language="jsx" title="page.jsx" />

      <h2>{isEn ? 'In practice: Next.js 15' : 'En práctica: Next.js 15'}</h2>
      <p>
        {isEn
          ? 'React Server Components require a server runtime. The most popular option is Next.js 15, where the App Router uses RSC by default.'
          : 'Los React Server Components requieren un entorno de servidor. La opción más popular es Next.js 15, donde el App Router usa RSC por defecto.'}
      </p>
      <CodeBlock code={nextjsCode} language="jsx" title="app/products/page.jsx" />

      <h2>{isEn ? 'Rules at a glance' : 'Reglas de un vistazo'}</h2>
      <CodeBlock code={rulesCode} language="jsx" title="rules.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Create a Next.js 15 app with two pages: a blog list (Server Component that fetches from https://jsonplaceholder.typicode.com/posts) and a post detail page with a "Like" button (Client Component). The like count should be stored in useState. Verify in the browser\'s Network tab that the blog list page sends no React JS for the list itself — only for the Like button.'
            : '✍️ Crea una app Next.js 15 con dos páginas: una lista de blog (componente de servidor que obtiene datos de https://jsonplaceholder.typicode.com/posts) y una página de detalle de post con un botón "Like" (componente de cliente). El conteo de likes debe almacenarse en useState. Verifica en la pestaña Network del navegador que la página de lista de blog no envía JS de React para la lista en sí — solo para el botón Like.'}
        </p>
      </div>
    </LessonLayout>
  );
}
