import React from 'react';
import { StudyGroup, TimeOfDay, TimePreference } from '@/types/StudyGroup';

type TimePreferencesProps = {
  group: StudyGroup;
};

const translateDay = (day: keyof TimePreference): string => {
  const days = {
    Sunday: 'Domingo',
    Monday: 'Lunes',
    Tuesday: 'Martes',
    Wednesday: 'Miércoles',
    Thursday: 'Jueves',
    Friday: 'Viernes',
    Saturday: 'Sábado',
  };

  return days[day];
};

const translatePreference = (preference: TimeOfDay): string => {
  const preferences = {
    [TimeOfDay.Morning]: 'Mañana',
    [TimeOfDay.Afternoon]: 'Tarde',
    [TimeOfDay.Night]: 'Noche',
    [TimeOfDay.None]: 'Sin preferencia',
  };

  return preferences[preference];
};

export default function TimePreferences({ group }: TimePreferencesProps) {
  return (
    <>
      {group.time_preferences && (
        <table className='min-w-full border-collapse'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Día</th>
              <th className='border px-4 py-2'>Preferencia de Horario</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(group.time_preferences).map(([day, time]) => (
              <tr key={day}>
                <td className='border px-4 py-2'>
                  {translateDay(day as keyof TimePreference)}
                </td>
                <td className='border px-4 py-2'>
                  {translatePreference(time as TimeOfDay)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
