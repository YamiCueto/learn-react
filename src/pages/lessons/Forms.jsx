import LessonLayout from '../../components/LessonLayout';
import CodeBlock from '../../components/CodeBlock';
import { useTranslation } from 'react-i18next';

const controlledCode = `import { useState } from 'react';

function LoginForm() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}`;

const objectStateCode = `import { useState } from 'react';

function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'dev',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spread prev state, update only the changed field
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <input name="name"  value={form.name}  onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <select name="role" value={form.role}  onChange={handleChange}>
        <option value="dev">Developer</option>
        <option value="design">Designer</option>
        <option value="pm">PM</option>
      </select>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}`;

const validationCode = `import { useState } from 'react';

function SignupForm() {
  const [email, setEmail]   = useState('');
  const [error, setError]   = useState('');

  const validate = (value) => {
    if (!value.includes('@')) return 'Invalid email';
    if (value.length < 5)    return 'Email too short';
    return '';
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setError(validate(val));
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        className={error ? 'input-error' : ''}
      />
      {error && <p className="error-msg">⚠️ {error}</p>}
      <button disabled={!!error || !email}>Sign up</button>
    </div>
  );
}`;

const checkboxCode = `import { useState } from 'react';

function Preferences() {
  const [agree, setAgree]         = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        I agree to the terms
      </label>

      <label>
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
        Subscribe to newsletter
      </label>

      <button disabled={!agree}>Continue</button>
    </div>
  );
}`;

export default function Forms() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId="forms" level="basic">
      <h1>{isEn ? 'Forms in React' : 'Formularios en React'}</h1>
      <p>
        {isEn
          ? 'React uses controlled components for forms: the input value is always driven by React state. This means you have full control over what the user types, making validation and submission straightforward.'
          : 'React usa componentes controlados para formularios: el valor del input siempre está manejado por el estado de React. Esto significa que tienes control total sobre lo que escribe el usuario, haciendo la validación y el envío sencillos.'}
      </p>

      <h2>{isEn ? 'Controlled inputs' : 'Inputs controlados'}</h2>
      <p>
        {isEn
          ? 'A controlled input has its value set from state, and updates state on every change via onChange. The state is always the single source of truth.'
          : 'Un input controlado tiene su valor establecido desde el estado, y actualiza el estado en cada cambio a través de onChange. El estado siempre es la única fuente de verdad.'}
      </p>
      <CodeBlock code={controlledCode} language="jsx" title="LoginForm.jsx" />

      <h2>{isEn ? 'Form with one state object' : 'Formulario con un solo objeto de estado'}</h2>
      <p>
        {isEn
          ? 'For forms with many fields, store them all in one object. Use the name attribute to update the right field dynamically.'
          : 'Para formularios con muchos campos, guárdalos todos en un objeto. Usa el atributo name para actualizar el campo correcto dinámicamente.'}
      </p>
      <CodeBlock code={objectStateCode} language="jsx" title="RegisterForm.jsx" />

      <h2>{isEn ? 'Validation' : 'Validación'}</h2>
      <p>
        {isEn
          ? 'Validate on every change or on blur. Disable the submit button while there are errors.'
          : 'Valida en cada cambio o al perder el foco. Desactiva el botón de envío mientras haya errores.'}
      </p>
      <CodeBlock code={validationCode} language="jsx" title="SignupForm.jsx" />

      <h2>{isEn ? 'Checkboxes' : 'Checkboxes'}</h2>
      <p>
        {isEn
          ? 'Checkboxes use checked (not value) and e.target.checked (not e.target.value).'
          : 'Los checkboxes usan checked (no value) y e.target.checked (no e.target.value).'}
      </p>
      <CodeBlock code={checkboxCode} language="jsx" title="Preferences.jsx" />

      <div className="challenge-box">
        <h3>{t('lesson.challenge')}</h3>
        <p>
          {isEn
            ? '✍️ Build a contact form with fields: name, email, message. Add validation: name must be at least 2 characters, email must contain @, message at least 10 characters. Show error messages and disable the Send button until all fields are valid.'
            : '✍️ Crea un formulario de contacto con campos: name, email, message. Agrega validación: name mínimo 2 caracteres, email debe contener @, message mínimo 10 caracteres. Muestra mensajes de error y desactiva el botón Enviar hasta que todos los campos sean válidos.'}
        </p>
      </div>
    </LessonLayout>
  );
}
