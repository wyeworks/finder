import { Session } from '@/types/Session';

export function filterExpiredSessions(sessions?: Session[]) {
  if (!sessions) return [];
  const today = new Date();
  const expiredSessions = sessions.filter(
    (session) => new Date(session.end_time.replace('Z', '')) < today
  );
  expiredSessions.sort(
    (a, b) =>
      new Date(b.start_time.replace('Z', '')).getTime() -
      new Date(a.start_time.replace('Z', '')).getTime()
  );
  return expiredSessions;
}

export function filterNextSessions(sessions?: Session[]) {
  if (!sessions) return [];
  const today = new Date();
  const nextSessions = sessions.filter(
    (session) => new Date(session.end_time.replace('Z', '')) >= today
  );
  nextSessions.sort(
    (a: any, b: any) =>
      new Date(b.start_time.replace('Z', '')).getTime() -
      new Date(a.start_time.replace('Z', '')).getTime()
  );
  return nextSessions;
}
