import PlayIcon from '@/assets/Icons/PlayIcon';
import FolderIcon from '@/assets/Icons/FolderIcon';
import ChatIcon from '@/assets/Icons/ChatIcon';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import TimePreferences from './Content/TimePreferences';
import { StudyGroup } from '@/types/StudyGroup';

export type Section = {
  name: string;
  icon: JSX.Element;
  // eslint-disable-next-line no-unused-vars
  content: (group: StudyGroup) => JSX.Element;
};

const sections: Section[] = [
  {
    name: 'Sesiones',
    icon: <PlayIcon className='mr-2 h-5 w-5' />,
    content: (group: StudyGroup) => <TimePreferences group={group} />,
  },
  {
    name: 'Recursos',
    icon: <FolderIcon className='mr-2 h-5 w-5' />,
    // eslint-disable-next-line no-unused-vars
    content: (group: StudyGroup) => <div></div>,
  },
  {
    name: 'Foro',
    icon: <ChatIcon className='mr-2 h-5 w-5' />,
    // eslint-disable-next-line no-unused-vars
    content: (group: StudyGroup) => <div></div>,
  },
  {
    name: 'Miembros',
    icon: <GroupSizeIcon className='mr-2 h-5 w-5' />,
    // eslint-disable-next-line no-unused-vars
    content: (group: StudyGroup) => <div></div>,
  },
];

export default sections;
