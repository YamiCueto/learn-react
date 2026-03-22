import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';
import './lessons.css';

const jsxBasicCode = `// JSX looks like HTML, but it's JavaScript!
function Greeting() {
  const name = "Yamid";
  return (
    <div className="card">
      <h1>Hello, {name}! 👋</h1>
      <p>Today is {new Date().toLocaleDateString()}</p>
    </div>
  );
}`;

const jsxRulesCode = `// ✅ Must return ONE parent element
function Good() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Or use a Fragment (no extra DOM node)
function AlsoGood() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// ❌ This will FAIL — two root elements
function Bad() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}`;

const jsxExprCode = `function InfoCard({ user }) {
  return (
    <div>
      {/* Comments in JSX look like this */}
      <h2>{user.name}</h2>

      {/* JS expressions inside {} */}
      <p>Age: {user.age * 2} (double)</p>

      {/* Conditional with ternary */}
      <span>{user.isAdmin ? '🛡️ Admin' : '👤 User'}</span>

      {/* class → className in JSX */}
      <div className="highlight">Styled!</div>

      {/* style → object in JSX */}
      <p style={{ color: 'violet', fontWeight: 'bold' }}>Purple!</p>
    </div>
  );
}`;

export default function JSX() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="jsx" level="beginner">
      <h1>JSX</h1>

      <p>
        {isEn
          ? 'JSX (JavaScript XML) is a syntax extension for JavaScript that looks like HTML. It\'s not required to use React, but it makes writing components much more intuitive.'
          : 'JSX (JavaScript XML) es una extensión de sintaxis para JavaScript que parece HTML. No es obligatorio para usar React, pero hace que escribir componentes sea mucho más intuitivo.'}
      </p>

      <h2>{isEn ? 'JSX is JavaScript' : 'JSX es JavaScript'}</h2>
      <p>
        {isEn
          ? 'Under the hood, JSX gets compiled to regular JavaScript function calls. The curly braces {} let you embed any JavaScript expression inside your markup.'
          : 'Por debajo, JSX se compila a llamadas de función JavaScript regulares. Las llaves {} te permiten embeber cualquier expresión JavaScript dentro del markup.'}
      </p>

      <CodeBlock code={jsxBasicCode} language="jsx" title="Greeting.jsx" />

      <h2>{isEn ? 'JSX Rules' : 'Reglas de JSX'}</h2>
      <p>
        {isEn
          ? 'JSX has a few important rules you must follow. The most important: every component must return a single root element.'
          : 'JSX tiene algunas reglas importantes que debes seguir. La más importante: cada componente debe retornar un único elemento raíz.'}
      </p>

      <CodeBlock code={jsxRulesCode} language="jsx" title={isEn ? 'JSX Rules' : 'Reglas JSX'} />

      <h2>{isEn ? 'Expressions & Differences from HTML' : 'Expresiones y diferencias con HTML'}</h2>
      <CodeBlock code={jsxExprCode} language="jsx" title="InfoCard.jsx" />

      <div className="jsx-diffs-table">
        <h3>{isEn ? 'Key differences from HTML' : 'Diferencias clave con HTML'}</h3>
        <table>
          <thead>
            <tr><th>HTML</th><th>JSX</th></tr>
          </thead>
          <tbody>
            <tr><td><code>class="..."</code></td><td><code>className="..."</code></td></tr>
            <tr><td><code>for="..."</code></td><td><code>htmlFor="..."</code></td></tr>
            <tr><td><code>style="color:red"</code></td><td><code>style={'{'}{'{'} color: 'red' {'}'}{'}' }</code></td></tr>
            <tr><td><code>{'<!-- comment -->'}</code></td><td><code>{'{ /* comment */ }'}</code></td></tr>
            <tr><td><code>{'<br>'}</code></td><td><code>{'<br />'}</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Write a JSX component called ProfileCard that shows your name, your role, and at least one emoji. Use a JavaScript expression to calculate how many years you\'ve been coding!'
            : '✍️ Escribe un componente JSX llamado ProfileCard que muestre tu nombre, tu rol, y al menos un emoji. ¡Usa una expresión JavaScript para calcular cuántos años llevas programando!'}
        </p>
      </div>
    </LessonLayout>
  );
}
