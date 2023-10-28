'use client';

import { StudyGroup } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';

export default function DeleteGroupSection({ group }: { group: StudyGroup }) {
  Logger.debug(group);
  return <div>Aca va el formulario de eliminacion de grupo</div>;
}
