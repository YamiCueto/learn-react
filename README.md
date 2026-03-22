# ⚛️ LearnReact

> Sitio web interactivo y bilingüe (ES/EN) para aprender React desde cero hasta nivel intermedio.
> An interactive, bilingual (ES/EN) website to learn React from scratch to intermediate level.

🌐 **Live site:** [yamicueto.github.io/learn-react](https://yamicueto.github.io/learn-react)

---

## ✨ Features

- 🌐 **Bilingüe / Bilingual** — Full content in Spanish 🇲🇽 and English 🇺🇸
- 📚 **15 lessons** structured in 3 levels: Beginner → Basic → Intermediate
- 💻 **Code examples** with syntax highlighting and copy-to-clipboard
- 📈 **Progress tracking** saved locally (no account needed)
- 🎯 **Challenges** at the end of every lesson
- 🌑 **Dark mode** design with a modern, premium look
- 📱 **Responsive** — works on mobile and desktop

---

## 🗺️ Roadmap

| Level | Lessons |
|-------|---------|
| 🐣 **Beginner** (Coquito) | What is React?, JSX, Components, Props, useState |
| 🌱 **Basic** | useEffect, Events, Lists & Keys, Conditional Rendering, Forms |
| 🔥 **Intermediate** | useContext, useRef, useMemo & useCallback, Custom Hooks, React Router |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) | Core framework |
| [React Router DOM v7](https://reactrouter.com/) | Client-side routing |
| [i18next](https://www.i18next.com/) + react-i18next | Bilingual support |
| [gh-pages](https://github.com/tschaub/gh-pages) | GitHub Pages deployment |
| Vanilla CSS | Styling (no frameworks) |

---

## 🚀 Run locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `npm run build` automatically and pushes `/dist` to the `gh-pages` branch.

---

## 📁 Project Structure

```
src/
├── components/       # Navbar, Sidebar, CodeBlock, LessonLayout
├── data/             # lessons.js — single source of truth for all 15 lessons
├── hooks/            # useProgress — localStorage progress tracking
├── locales/
│   ├── es/           # Spanish translations
│   └── en/           # English translations
├── pages/
│   ├── Home.jsx
│   ├── Roadmap.jsx
│   └── lessons/      # One file per lesson
├── i18n.js
├── App.jsx           # Router
└── index.css         # Design system & global styles
```

---

## 🤝 Contributing

This project is open to contributions! If you'd like to add a lesson, fix a typo, or improve translations:

1. Fork the repository
2. Create a branch: `git checkout -b feat/lesson-name`
3. Commit your changes
4. Open a Pull Request

---

## 👤 Author

**Yamid Cueto** — Senior Full Stack Developer

- GitHub: [@YamiCueto](https://github.com/YamiCueto)

---

## 📄 License

MIT — free to use, share and modify.
