import { useCallback } from 'react';

const STORAGE_KEY = 'learnreact_progress';

export function useProgress() {
  const getAll = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }, []);

  const isCompleted = useCallback((lessonId) => {
    return !!getAll()[lessonId];
  }, [getAll]);

  const markComplete = useCallback((lessonId) => {
    const current = getAll();
    current[lessonId] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }, [getAll]);

  const unmark = useCallback((lessonId) => {
    const current = getAll();
    delete current[lessonId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }, [getAll]);

  const getCount = useCallback((lessonIds) => {
    const all = getAll();
    return lessonIds.filter(id => all[id]).length;
  }, [getAll]);

  return { isCompleted, markComplete, unmark, getCount };
}
