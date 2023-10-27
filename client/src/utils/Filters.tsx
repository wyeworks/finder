import { Session } from '@/types/Session';

export function filterExpiredSessions(sessions?: Session[]) {
  if (!sessions) return [];
  const today = new Date();
  return sessions.filter((session) => new Date(session.end_time) < today);
}

export function filterNextSessions(sessions?: Session[]) {
  if (!sessions) return [];
  const today = new Date();
  return sessions.filter((session) => new Date(session.end_time) >= today);
}
