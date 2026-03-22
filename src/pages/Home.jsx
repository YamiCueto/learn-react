import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LESSONS, LESSON_IDS } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import './Home.css';

const features = [
  { icon: '🌐', key: 'bilingual' },
  { icon: '💻', key: 'interactive' },
  { icon: '📈', key: 'progress' },
  { icon: '🎯', key: 'challenges' },
];

export default function Home() {
  const { t } = useTranslation();
  const { getCount } = useProgress();
  const completedCount = getCount(LESSON_IDS);

  return (
    <div className="home animate-fadeIn">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>⚛️</span>
            <span>React · ES · EN</span>
          </div>
          <h1>
            {t('hero.title')}<br />
            <span className="gradient-text">React</span>
          </h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <div className="hero-cta">
            <Link to="/lessons/what-is-react" className="btn btn-primary" id="btn-start">
              🚀 {t('hero.cta')}
            </Link>
            <Link to="/roadmap" className="btn btn-outline" id="btn-roadmap">
              {t('hero.ctaRoadmap')}
            </Link>
          </div>
          {completedCount > 0 && (
            <p className="hero-progress-hint">
              ✅ {completedCount} {t('progress.of')} {LESSON_IDS.length} {t('progress.lessons')} {t('progress.completed')}
            </p>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        {features.map(f => (
          <div key={f.key} className="feature-card card">
            <span className="feature-icon">{f.icon}</span>
            <h3>{t(`home.features.${f.key}`)}</h3>
            <p>{t(`home.features.${f.key}Desc`)}</p>
          </div>
        ))}
      </section>

      {/* Quick roadmap preview */}
      <section className="home-roadmap">
        <h2>{t('roadmap.title')}</h2>
        <div className="roadmap-preview">
          {['beginner', 'basic', 'intermediate'].map(level => {
            const levelLessons = LESSONS.filter(l => l.level === level);
            return (
              <div key={level} className={`roadmap-lane roadmap-lane--${level}`}>
                <div className={`badge badge-${level} roadmap-lane-badge`}>
                  {t(`levels.${level}`)}
                </div>
                <ul>
                  {levelLessons.map(lesson => (
                    <li key={lesson.id}>
                      <Link to={lesson.path} className="roadmap-item">
                        → {t(`lessons.${lesson.i18nKey}.title`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
