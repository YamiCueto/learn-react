import LessonLayout from '../../components/LessonLayout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './ComingSoon.css';

export default function ComingSoon({ lessonId, level, titleKey }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <LessonLayout lessonId={lessonId} level={level}>
      <div className="coming-soon">
        <div className="coming-soon-icon">🚧</div>
        <h1>{t(`lessons.${titleKey}.title`)}</h1>
        <p className="coming-soon-desc">
          {isEn
            ? `This lesson is coming soon. We're working hard on it!`
            : `Esta lección está en camino. ¡Estamos trabajando en ella!`}
        </p>
        <div className="coming-soon-hint">
          <p>
            {isEn
              ? '👆 You can still mark this lesson as completed to track your progress.'
              : '👆 Igual puedes marcarla como completada para llevar tu progreso.'}
          </p>
        </div>
      </div>
    </LessonLayout>
  );
}
