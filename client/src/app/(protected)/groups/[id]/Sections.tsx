/* eslint-disable react-hooks/rules-of-hooks */
import PlayIcon from '@/assets/Icons/PlayIcon';
import FolderIcon from '@/assets/Icons/FolderIcon';
import ChatIcon from '@/assets/Icons/ChatIcon';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import TimePreferences from './Content/TimePreferences';
import { StudyGroup } from '@/types/StudyGroup';
import Members from './Content/Members';
import { Member } from '@/types/Member';
import UserPlusIcon from '@/assets/Icons/UserPlusIcon';
import RequestJoinGroup from './Content/RequestJoinGroup';
// import { GroupService } from '@/services/GroupService';

export type Section = {
  name: string;
  icon: JSX.Element;
  // eslint-disable-next-line no-unused-vars
  content: (group: StudyGroup) => JSX.Element;
};

export const exampleUsers: Member[] = [
  {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'participant',
  },
  {
    name: 'María González',
    email: 'maria@example.com',
    role: 'admin',
  },
  {
    name: 'Luis Rodríguez',
    email: 'luis@example.com',
    role: 'participant',
  },
  {
    name: 'Ana López',
    email: 'ana@exampleeeeeelargeeeeeeee.com',
    role: 'admin',
  },
  {
    name: 'Carlos Martínez',
    email: 'carlos@example.com',
    role: 'participant',
  },
  {
    name: 'Laura Sánchez',
    email: 'laura@example.com',
    role: 'participant',
  },
  {
    name: 'Pedro Ramirez',
    email: 'pedro@example.com',
    role: 'participant',
  },
  {
    name: 'Isabel Pérez',
    email: 'isabel@example.com',
    role: 'admin',
  },
  {
    name: 'Antonio García',
    email: 'antonio@example.com',
    role: 'participant',
  },
  {
    name: 'Carmen Torres',
    email: 'carmen@example.com',
    role: 'participant',
  },
];

const isAdmin = true;

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
    content: (group: StudyGroup) => <Members />,
  },
  // this section will render only for admins
  isAdmin && {
    name: 'Solicitudes',
    icon: <UserPlusIcon className='mr-2 h-5 w-5' />,
    // eslint-disable-next-line no-unused-vars
    content: (group: StudyGroup) => <RequestJoinGroup />,
  },
];

export default sections;
