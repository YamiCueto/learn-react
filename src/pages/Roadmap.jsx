import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LESSONS } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { LESSON_IDS } from '../data/lessons';
import './Roadmap.css';

export default function Roadmap() {
  const { t } = useTranslation();
  const { isCompleted, getCount } = useProgress();
  const completedCount = getCount(LESSON_IDS);

  const levels = ['beginner', 'basic', 'intermediate'];

  return (
    <div className="roadmap-page animate-fadeIn">
      <div className="roadmap-header">
        <h1>
          {t('roadmap.title')} <span className="gradient-text">React</span>
        </h1>
        <p>{t('roadmap.description')}</p>
        <div className="roadmap-overall-progress">
          <div className="roadmap-progress-label">
            <span>{completedCount} / {LESSON_IDS.length} {t('progress.lessons')}</span>
            <span className="roadmap-pct">{Math.round((completedCount / LESSON_IDS.length) * 100)}%</span>
          </div>
          <div className="progress-bar roadmap-bar">
            <div
              className="progress-fill"
              style={{ width: `${(completedCount / LESSON_IDS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="roadmap-levels">
        {levels.map((level, levelIdx) => {
          const levelLessons = LESSONS.filter(l => l.level === level);
          const levelDone = levelLessons.filter(l => isCompleted(l.id)).length;
          return (
            <div key={level} className={`roadmap-section roadmap-section--${level}`}>
              <div className="roadmap-section-header">
                <span className={`badge badge-${level}`}>{t(`levels.${level}`)}</span>
                <span className="roadmap-section-count">
                  {levelDone}/{levelLessons.length}
                </span>
              </div>
              <div className="roadmap-cards">
                {levelLessons.map((lesson, idx) => {
                  const done = isCompleted(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      to={lesson.path}
                      id={`roadmap-${lesson.id}`}
                      className={`roadmap-card ${done ? 'done' : ''}`}
                    >
                      <div className="roadmap-card-num">{lesson.order}</div>
                      <div className="roadmap-card-body">
                        <h3>{t(`lessons.${lesson.i18nKey}.title`)}</h3>
                        <p>{t(`lessons.${lesson.i18nKey}.description`)}</p>
                      </div>
                      <div className="roadmap-card-status">
                        {done ? '✅' : '→'}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
