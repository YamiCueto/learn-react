import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { LESSONS } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { LESSON_IDS } from '../data/lessons';
import './Sidebar.css';

export default function Sidebar({ isOpen }) {
  const { t } = useTranslation();
  const { isCompleted, getCount } = useProgress();
  const completedCount = getCount(LESSON_IDS);
  const totalCount = LESSON_IDS.length;

  const levels = ['beginner', 'basic', 'intermediate'];
  const levelLabels = {
    beginner:     t('levels.beginner'),
    basic:        t('levels.basic'),
    intermediate: t('levels.intermediate'),
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
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
          return (
            <div key={level} className="sidebar-group">
              <div className={`sidebar-group-label badge badge-${level}`}>
                {levelLabels[level]}
              </div>
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
          );
        })}
      </nav>
    </aside>
  );
}
