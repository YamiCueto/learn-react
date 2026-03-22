// All lessons with their metadata
export const LESSONS = [
  // ── Coquito 🐣 ──────────────────────────────────
  {
    id: 'what-is-react',
    i18nKey: 'whatIsReact',
    level: 'beginner',
    path: '/lessons/what-is-react',
    order: 1,
  },
  {
    id: 'jsx',
    i18nKey: 'jsx',
    level: 'beginner',
    path: '/lessons/jsx',
    order: 2,
  },
  {
    id: 'components',
    i18nKey: 'components',
    level: 'beginner',
    path: '/lessons/components',
    order: 3,
  },
  {
    id: 'props',
    i18nKey: 'props',
    level: 'beginner',
    path: '/lessons/props',
    order: 4,
  },
  {
    id: 'use-state',
    i18nKey: 'useState',
    level: 'beginner',
    path: '/lessons/use-state',
    order: 5,
  },
  // ── Básico 🌱 ────────────────────────────────────
  {
    id: 'use-effect',
    i18nKey: 'useEffect',
    level: 'basic',
    path: '/lessons/use-effect',
    order: 6,
  },
  {
    id: 'events',
    i18nKey: 'events',
    level: 'basic',
    path: '/lessons/events',
    order: 7,
  },
  {
    id: 'lists',
    i18nKey: 'lists',
    level: 'basic',
    path: '/lessons/lists',
    order: 8,
  },
  {
    id: 'conditional',
    i18nKey: 'conditional',
    level: 'basic',
    path: '/lessons/conditional',
    order: 9,
  },
  {
    id: 'forms',
    i18nKey: 'forms',
    level: 'basic',
    path: '/lessons/forms',
    order: 10,
  },
  // ── Intermedio 🔥 ────────────────────────────────
  {
    id: 'use-context',
    i18nKey: 'useContext',
    level: 'intermediate',
    path: '/lessons/use-context',
    order: 11,
  },
  {
    id: 'use-ref',
    i18nKey: 'useRef',
    level: 'intermediate',
    path: '/lessons/use-ref',
    order: 12,
  },
  {
    id: 'use-memo',
    i18nKey: 'useMemo',
    level: 'intermediate',
    path: '/lessons/use-memo',
    order: 13,
  },
  {
    id: 'custom-hooks',
    i18nKey: 'customHooks',
    level: 'intermediate',
    path: '/lessons/custom-hooks',
    order: 14,
  },
  {
    id: 'react-router',
    i18nKey: 'reactRouter',
    level: 'intermediate',
    path: '/lessons/react-router',
    order: 15,
  },
  // ── Avanzado ⚡ ──────────────────────────────────
  {
    id: 'use-reducer',
    i18nKey: 'useReducer',
    level: 'advanced',
    path: '/lessons/use-reducer',
    order: 16,
  },
  {
    id: 'error-boundaries',
    i18nKey: 'errorBoundaries',
    level: 'advanced',
    path: '/lessons/error-boundaries',
    order: 17,
  },
  {
    id: 'suspense-lazy',
    i18nKey: 'suspenseLazy',
    level: 'advanced',
    path: '/lessons/suspense-lazy',
    order: 18,
  },
  {
    id: 'portals',
    i18nKey: 'portals',
    level: 'advanced',
    path: '/lessons/portals',
    order: 19,
  },
  {
    id: 'testing',
    i18nKey: 'testing',
    level: 'advanced',
    path: '/lessons/testing',
    order: 20,
  },
  {
    id: 'server-components',
    i18nKey: 'serverComponents',
    level: 'advanced',
    path: '/lessons/server-components',
    order: 21,
  },
];

export const LESSON_IDS = LESSONS.map(l => l.id);

export const LEVELS = {
  beginner:     { color: '#f59e0b', badge: 'badge-beginner' },
  basic:        { color: '#10b981', badge: 'badge-basic' },
  intermediate: { color: '#7c3aed', badge: 'badge-intermediate' },
  advanced:     { color: '#dc2626', badge: 'badge-advanced' },
};

export function getLessonById(id) {
  return LESSONS.find(l => l.id === id);
}

export function getAdjacentLessons(id) {
  const idx = LESSONS.findIndex(l => l.id === id);
  return {
    prev: idx > 0 ? LESSONS[idx - 1] : null,
    next: idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null,
  };
}
