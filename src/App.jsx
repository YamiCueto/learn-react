import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';

// Lessons with full content
import WhatIsReact from './pages/lessons/WhatIsReact';
import JSX from './pages/lessons/JSX';
import Components from './pages/lessons/Components';
import Props from './pages/lessons/Props';
import UseState from './pages/lessons/UseState';

import Game from './pages/Game';

// ComingSoon wrapper for remaining lessons
import ComingSoon from './pages/lessons/ComingSoon';

import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <>
      <Navbar onMenuToggle={toggleSidebar} />
      <div className="app-layout">
        <Sidebar isOpen={sidebarOpen} />
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/game" element={<Game />} />

            {/* ── Beginner ── */}
            <Route path="/lessons/what-is-react" element={<WhatIsReact />} />
            <Route path="/lessons/jsx" element={<JSX />} />
            <Route path="/lessons/components" element={<Components />} />
            <Route path="/lessons/props" element={<Props />} />
            <Route path="/lessons/use-state" element={<UseState />} />

            {/* ── Basic (coming soon) ── */}
            <Route path="/lessons/use-effect" element={<ComingSoon lessonId="use-effect" level="basic" titleKey="useEffect" />} />
            <Route path="/lessons/events" element={<ComingSoon lessonId="events" level="basic" titleKey="events" />} />
            <Route path="/lessons/lists" element={<ComingSoon lessonId="lists" level="basic" titleKey="lists" />} />
            <Route path="/lessons/conditional" element={<ComingSoon lessonId="conditional" level="basic" titleKey="conditional" />} />
            <Route path="/lessons/forms" element={<ComingSoon lessonId="forms" level="basic" titleKey="forms" />} />

            {/* ── Intermediate (coming soon) ── */}
            <Route path="/lessons/use-context" element={<ComingSoon lessonId="use-context" level="intermediate" titleKey="useContext" />} />
            <Route path="/lessons/use-ref" element={<ComingSoon lessonId="use-ref" level="intermediate" titleKey="useRef" />} />
            <Route path="/lessons/use-memo" element={<ComingSoon lessonId="use-memo" level="intermediate" titleKey="useMemo" />} />
            <Route path="/lessons/custom-hooks" element={<ComingSoon lessonId="custom-hooks" level="intermediate" titleKey="customHooks" />} />
            <Route path="/lessons/react-router" element={<ComingSoon lessonId="react-router" level="intermediate" titleKey="reactRouter" />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
