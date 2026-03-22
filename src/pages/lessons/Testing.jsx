import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const setupCode = `# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom vitest jsdom

# vitest.config.js (add to your vite.config.js)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
});

# src/setupTests.js
import '@testing-library/jest-dom';`;

const basicTestCode = `// src/components/Greeting.test.jsx
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

// describe() groups related tests
describe('Greeting', () => {

  // it() or test() defines a single test
  it('renders a greeting with the user name', () => {
    render(<Greeting name="Ana" />);

    // screen.getByText — finds element by text content
    const heading = screen.getByText('Hello, Ana!');
    expect(heading).toBeInTheDocument();
  });

  it('renders a default message when no name is provided', () => {
    render(<Greeting />);
    expect(screen.getByText('Hello, stranger!')).toBeInTheDocument();
  });

});

// The component being tested
function Greeting({ name }) {
  return <h1>{name ? \`Hello, \${name}!\` : 'Hello, stranger!'}</h1>;
}`;

const userEventCode = `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  it('increments the count when + is clicked', async () => {
    // userEvent simulates real browser events (focus, keydown, etc.)
    const user = userEvent.setup();

    render(<Counter />);

    const button = screen.getByRole('button', { name: '+' });
    const count = screen.getByText('Count: 0');

    await user.click(button);

    // After one click, count should be 1
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('decrements below zero', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: '-' }));
    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });
});`;

const formTestCode = `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('calls onSubmit with email and password', async () => {
    const user = userEvent.setup();
    // jest.fn() creates a mock function to spy on calls
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123',
    });
  });

  it('shows an error when email is empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});`;

const queryCheatsheetCode = `// ── Queries (priority order — highest to lowest) ──────────
screen.getByRole('button', { name: /submit/i })    // ✅ best — accessible
screen.getByLabelText('Email')                      // ✅ form inputs
screen.getByPlaceholderText('Enter name')           // 🆗 ok
screen.getByText('Hello world')                     // 🆗 ok
screen.getByTestId('submit-btn')                    // ⚠️ last resort

// ── get vs query vs find ───────────────────────────────────
screen.getByText(...)      // throws if not found (sync)
screen.queryByText(...)    // returns null if not found (sync)
screen.findByText(...)     // returns Promise — waits for element (async)

// ── Common matchers ────────────────────────────────────────
expect(el).toBeInTheDocument()
expect(el).toBeVisible()
expect(el).toBeDisabled()
expect(el).toHaveTextContent('Hello')
expect(el).toHaveValue('test@test.com')
expect(el).toHaveClass('active')`;

export default function Testing() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="testing" level="advanced">
      <h1>Testing</h1>
      <p>
        {isEn
          ? 'React Testing Library is the standard way to test React components. Its philosophy: test your components the way users interact with them — by finding elements via accessible roles, labels, and text — not by inspecting implementation details like state or component names.'
          : 'React Testing Library es la forma estándar de probar componentes React. Su filosofía: prueba tus componentes como los usuarios interactúan con ellos — encontrando elementos por roles accesibles, labels y texto — no inspeccionando detalles de implementación como el estado o los nombres de componentes.'}
      </p>

      <h2>{isEn ? 'Setup with Vitest' : 'Configuración con Vitest'}</h2>
      <CodeBlock code={setupCode} language="bash" title="terminal" />

      <h2>{isEn ? 'Your first test' : 'Tu primer test'}</h2>
      <p>
        {isEn
          ? 'Every test follows the same pattern: render → find elements → assert. The render function returns a virtual DOM you can query.'
          : 'Cada test sigue el mismo patrón: render → encontrar elementos → afirmar. La función render retorna un DOM virtual que puedes consultar.'}
      </p>
      <CodeBlock code={basicTestCode} language="jsx" title="Greeting.test.jsx" />

      <h2>{isEn ? 'Testing user interactions' : 'Testear interacciones del usuario'}</h2>
      <p>
        {isEn
          ? 'userEvent simulates real browser events more accurately than fireEvent. Always prefer it for clicks, typing, and keyboard interactions.'
          : 'userEvent simula eventos del navegador reales con mayor precisión que fireEvent. Siempre prefiérelo para clics, escritura e interacciones de teclado.'}
      </p>
      <CodeBlock code={userEventCode} language="jsx" title="Counter.test.jsx" />

      <h2>{isEn ? 'Testing forms' : 'Testear formularios'}</h2>
      <CodeBlock code={formTestCode} language="jsx" title="LoginForm.test.jsx" />

      <h2>{isEn ? 'Query cheatsheet' : 'Cheatsheet de queries'}</h2>
      <CodeBlock code={queryCheatsheetCode} language="jsx" title="queries.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Write tests for a SearchBar component that: 1) renders an input and a button, 2) calls onSearch with the input value when the button is clicked, 3) also calls onSearch when Enter is pressed, 4) shows a "Query is too short" message if less than 3 characters are entered before searching.'
            : '✍️ Escribe tests para un componente SearchBar que: 1) renderiza un input y un botón, 2) llama a onSearch con el valor del input cuando se hace clic en el botón, 3) también llama a onSearch cuando se presiona Enter, 4) muestra un mensaje "La búsqueda es muy corta" si se ingresan menos de 3 caracteres antes de buscar.'}
        </p>
      </div>
    </LessonLayout>
  );
}
