import { Subject } from '@/types/Subject';
import { Option } from '@/types/Option';

// takes date from back (for example '2023-09-13T00:00:00.000Z') and
// returns on input format (2023-09-13)
export function formatDate(sDate: string) {
  return sDate.split('T')[0];
}

// this functions remove ascents to filter well
export function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function parseSubjectToOption(subjects: Subject[]): Option[] {
  const options: Option[] = subjects.map((subject) => ({
    label: subject.name,
    key: subject.id.toString(),
  }));
  return options;
}
