import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../hooks/useProgress';
import { getAdjacentLessons, LEVELS } from '../data/lessons';
import './LessonLayout.css';

export default function LessonLayout({ lessonId, level, children }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isCompleted, markComplete, unmark } = useProgress();
  const [done, setDone] = useState(isCompleted(lessonId));
  const { prev, next } = getAdjacentLessons(lessonId);

  const toggleDone = () => {
    if (done) {
      unmark(lessonId);
      setDone(false);
    } else {
      markComplete(lessonId);
      setDone(true);
    }
  };

  return (
    <article className="lesson-layout animate-fadeUp">
      {/* Level badge */}
      <div className="lesson-meta">
        <span className={`badge badge-${level}`}>
          {t(`levels.${level}`)}
        </span>
      </div>

      {/* Lesson content */}
      <div className="lesson-body">
        {children}
      </div>

      {/* Mark complete */}
      <div className="lesson-actions">
        <button
          id={`btn-complete-${lessonId}`}
          className={`btn ${done ? 'btn-done' : 'btn-primary'}`}
          onClick={toggleDone}
        >
          {done ? t('lesson.done') : t('lesson.markDone')}
        </button>
      </div>

      {/* Navigation */}
      <nav className="lesson-nav">
        {prev ? (
          <Link to={prev.path} className="btn btn-outline lesson-nav-btn">
            {t('lesson.prev')} <span>{t(`lessons.${prev.i18nKey}.title`)}</span>
          </Link>
        ) : <div />}

        {next ? (
          <Link to={next.path} className="btn btn-primary lesson-nav-btn">
            <span>{t(`lessons.${next.i18nKey}.title`)}</span> {t('lesson.next')}
          </Link>
        ) : <div />}
      </nav>
    </article>
  );
}
