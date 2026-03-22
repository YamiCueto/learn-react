import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { LESSONS } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { LESSON_IDS } from '../data/lessons';
import './Sidebar.css';

export default function Sidebar({ isOpen, isCollapsed, onToggleCollapse }) {
  const { t } = useTranslation();
  const { isCompleted, getCount } = useProgress();
  const completedCount = getCount(LESSON_IDS);
  const totalCount = LESSON_IDS.length;

  const [openGroups, setOpenGroups] = useState({
    beginner: true,
    basic: true,
    intermediate: true,
    advanced: true,
  });

  const toggleGroup = useCallback((level) => {
    setOpenGroups(prev => ({ ...prev, [level]: !prev[level] }));
  }, []);

  const levels = ['beginner', 'basic', 'intermediate', 'advanced'];
  const levelLabels = {
    beginner:     t('levels.beginner'),
    basic:        t('levels.basic'),
    intermediate: t('levels.intermediate'),
    advanced:     t('levels.advanced'),
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>

      {/* Sidebar-wide collapse toggle (desktop) */}
      <button
        className="sidebar-collapse-btn"
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '›' : '‹'}
      </button>

      {/* Overall progress */}
      <div className="sidebar-progress">
        <div className="sidebar-progress-label">
          <span>{completedCount} {t('progress.of')} {totalCount} {t('progress.lessons')}</span>
          <span className="sidebar-progress-pct">
            {Math.round((completedCount / totalCount) * 100)}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Lessons grouped by level */}
      <nav className="sidebar-nav">
        {levels.map(level => {
          const levelLessons = LESSONS.filter(l => l.level === level);
          const groupOpen = openGroups[level];
          const doneInGroup = levelLessons.filter(l => isCompleted(l.id)).length;

          return (
            <div key={level} className="sidebar-group">
              <button
                className={`sidebar-group-header badge badge-${level}`}
                onClick={() => toggleGroup(level)}
                aria-expanded={groupOpen}
              >
                <span className="sidebar-group-label-text">{levelLabels[level]}</span>
                <span className="sidebar-group-meta">
                  <span className="sidebar-group-count">{doneInGroup}/{levelLessons.length}</span>
                  <span className={`sidebar-group-chevron ${groupOpen ? 'open' : ''}`}>›</span>
                </span>
              </button>

              <div className={`sidebar-list-wrapper ${groupOpen ? 'open' : ''}`}>
                <ul className="sidebar-list">
                  {levelLessons.map(lesson => {
                    const done = isCompleted(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <NavLink
                          to={lesson.path}
                          className={({ isActive }) =>
                            `sidebar-item ${isActive ? 'active' : ''} ${done ? 'done' : ''}`
                          }
                        >
                          <span className="sidebar-item-icon">
                            {done ? '✅' : '○'}
                          </span>
                          <span className="sidebar-item-text">
                            {t(`lessons.${lesson.i18nKey}.title`)}
                          </span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
