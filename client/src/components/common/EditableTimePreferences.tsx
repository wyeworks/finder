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

function buildInitialValues(timePreferences?: TimePreference) {
  return {
    Lunes: timePreferences?.Monday ?? TimeOfDay.NoPreferences,
    Martes: timePreferences?.Tuesday ?? TimeOfDay.NoPreferences,
    Miércoles: timePreferences?.Wednesday ?? TimeOfDay.NoPreferences,
    Jueves: timePreferences?.Thursday ?? TimeOfDay.NoPreferences,
    Viernes: timePreferences?.Friday ?? TimeOfDay.NoPreferences,
    Sábado: timePreferences?.Saturday ?? TimeOfDay.NoPreferences,
    Domingo: timePreferences?.Sunday ?? TimeOfDay.NoPreferences,
  };
}

export default function EditableTimePreferences({
  initialTimePreferences,
  onTimePreferenceForDayChange,
  paddingAroundSelectors,
  maxWidth = true,
  className = 'my-3',
}: {
  initialTimePreferences?: TimePreference;
  // eslint-disable-next-line no-unused-vars
  onTimePreferenceForDayChange: (day: string, value: string) => void;
  paddingAroundSelectors?: number;
  maxWidth?: boolean;
  className?: string;
}) {
  const initialValues = buildInitialValues(initialTimePreferences);

  const entries = Object.entries(initialValues);

  return (
    <div className={`${maxWidth && 'max-w-sm'} ${className}`}>
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
              paddingTB={paddingAroundSelectors}
              maxWidth={maxWidth}
            />
            <div className='h-4' />
          </div>
        );
      })}
    </div>
  );
}
