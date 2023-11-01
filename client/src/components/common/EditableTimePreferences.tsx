import { TimeOfDay, TimePreference } from '@/types/StudyGroup';
import { Option } from '@/types/Option';
import { translatePreference } from '@/utils/Formatter';
import Dropdown from '@/components/common/DropDown';

const preferences: Option[] = [
  {
    key: TimeOfDay.NoPreferences,
    label: translatePreference(TimeOfDay.NoPreferences),
  },
  { key: TimeOfDay.No, label: translatePreference(TimeOfDay.No) },
  { key: TimeOfDay.Afternoon, label: translatePreference(TimeOfDay.Afternoon) },
  { key: TimeOfDay.Morning, label: translatePreference(TimeOfDay.Morning) },
  { key: TimeOfDay.Night, label: translatePreference(TimeOfDay.Night) },
];

export default function EditableTimePreferences({
  initialTimePreferences,
  onTimePreferenceForDayChange,
}: {
  initialTimePreferences?: TimePreference;
  // eslint-disable-next-line no-unused-vars
  onTimePreferenceForDayChange: (day: string, value: string) => void;
}) {
  const initialValues = initialTimePreferences ?? {
    Lunes: TimeOfDay.NoPreferences,
    Martes: TimeOfDay.NoPreferences,
    Miércoles: TimeOfDay.NoPreferences,
    Jueves: TimeOfDay.NoPreferences,
    Viernes: TimeOfDay.NoPreferences,
    Sábado: TimeOfDay.NoPreferences,
    Domingo: TimeOfDay.NoPreferences,
  };

  const entries = Object.entries(initialValues);

  return (
    <div className='my-3'>
      {entries.map((entry, index) => {
        const day = entry[0];
        const value = entry[1];

        function handleTime(value: string) {
          onTimePreferenceForDayChange(day, value);
        }

        return (
          <div key={index}>
            <Dropdown
              id={`dropdown-${day}`}
              options={preferences}
              label={day}
              onSelect={handleTime}
              initialValue={translatePreference(value)}
            />
          </div>
        );
      })}
    </div>
  );
}
