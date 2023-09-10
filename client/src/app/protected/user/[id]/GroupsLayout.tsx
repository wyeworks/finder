import { StudyGroup } from '@/types/StudyGroup';
import Image from 'next/image';

interface GroupsLayoutProps {
  groups: StudyGroup[];
}

function GroupCard(props: { group: StudyGroup }) {
  return (
    <div
      className={
        'm-10 flex w-[320px] flex-col overflow-hidden rounded-2xl shadow-2xl md:w-[444px]'
      }
    >
      <Image
        src={'/default_group_banner.png'}
        alt={props.group.name}
        width={891}
        height={306}
        className={'w-full'}
      />
      <div className={'bg-white p-5'}>
        <h1 className={'text-base font-bold text-[#242760]'}>
          {props.group.subject}
        </h1>
        <h1>{props.group.name}</h1>
        <p>{props.group.description}</p>
      </div>
    </div>
  );
}

export default function GroupsLayout(props: GroupsLayoutProps) {
  return (
    <div
      className={
        'overflow-hidden border-[#E7E7E7] bg-[#F3F4F6] md:m-20 md:rounded-2xl md:border-2 md:bg-white'
      }
    >
      <div
        className={
          'p-5 text-[#2B2D54] md:border-b-2 md:bg-[#2B2D54] md:text-white'
        }
      >
        <h1 className={'text-2xl font-extrabold md:text-4xl'}>Grupos</h1>
      </div>
      <div className={'flex flex-row flex-wrap'}>
        {props.groups.map((group) => (
          <GroupCard key={group.name} group={group} />
        ))}
      </div>
    </div>
  );
}
