import PlayIcon from '@/assets/Icons/PlayIcon';
import FolderIcon from '@/assets/Icons/FolderIcon';
import ChatIcon from '@/assets/Icons/ChatIcon';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import { StudyGroup } from '@/types/StudyGroup';
import Members from './Content/Members';
import UserPlusIcon from '@/assets/Icons/UserPlusIcon';
import RequestJoinGroup from './Content/RequestJoinGroup';
import Sessions from './Content/Sessions/Sessions';

export type Section = {
  name: string;
  icon: JSX.Element;
  // eslint-disable-next-line no-unused-vars
  content: (group: StudyGroup, fetchGroup?: () => void) => JSX.Element;
};

const sections: Section[] = [
  {
    name: 'Sesiones',
    icon: <PlayIcon className='mr-2 h-5 w-5' />,
    content: (group: StudyGroup, fetchGroup?: () => void) => (
      <Sessions group={group} fetchGroup={fetchGroup} />
    ),
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
    content: () => <Members />,
  },
  {
    name: 'Solicitudes',
    icon: <UserPlusIcon className='mr-2 h-5 w-5' />,
    content: () => <RequestJoinGroup />,
  },
];

export default sections;
