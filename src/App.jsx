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
import UseEffect from './pages/lessons/UseEffect';
import Events from './pages/lessons/Events';
import Lists from './pages/lessons/Lists';
import Conditional from './pages/lessons/Conditional';
import Forms from './pages/lessons/Forms';
import UseContext from './pages/lessons/UseContext';
import UseRef from './pages/lessons/UseRef';
import UseMemo from './pages/lessons/UseMemo';
import CustomHooks from './pages/lessons/CustomHooks';
import ReactRouter from './pages/lessons/ReactRouter';

import UseReducer from './pages/lessons/UseReducer';
import ErrorBoundaries from './pages/lessons/ErrorBoundaries';
import SuspenseLazy from './pages/lessons/SuspenseLazy';
import Portals from './pages/lessons/Portals';
import Testing from './pages/lessons/Testing';
import ServerComponents from './pages/lessons/ServerComponents';

import Game from './pages/Game';

import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleCollapse = () => setSidebarCollapsed(prev => !prev);

  return (
    <>
      <Navbar onMenuToggle={toggleSidebar} />
      <div className={`app-layout ${sidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleCollapse}
        />
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

            {/* ── Basic ── */}
            <Route path="/lessons/use-effect" element={<UseEffect />} />
            <Route path="/lessons/events" element={<Events />} />
            <Route path="/lessons/lists" element={<Lists />} />
            <Route path="/lessons/conditional" element={<Conditional />} />
            <Route path="/lessons/forms" element={<Forms />} />

            {/* ── Intermediate ── */}
            <Route path="/lessons/use-context" element={<UseContext />} />
            <Route path="/lessons/use-ref" element={<UseRef />} />
            <Route path="/lessons/use-memo" element={<UseMemo />} />
            <Route path="/lessons/custom-hooks" element={<CustomHooks />} />
            <Route path="/lessons/react-router" element={<ReactRouter />} />

            {/* ── Advanced ── */}
            <Route path="/lessons/use-reducer" element={<UseReducer />} />
            <Route path="/lessons/error-boundaries" element={<ErrorBoundaries />} />
            <Route path="/lessons/suspense-lazy" element={<SuspenseLazy />} />
            <Route path="/lessons/portals" element={<Portals />} />
            <Route path="/lessons/testing" element={<Testing />} />
            <Route path="/lessons/server-components" element={<ServerComponents />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
