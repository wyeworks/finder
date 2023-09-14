import { StudyGroup } from '@/types/StudyGroup';
import Image from 'next/image';

type GroupsLayoutProps = {
  groups: StudyGroup[];
};

function GroupCard(props: { group: StudyGroup }) {
  return (
    <div
      className={
        'm-10 flex w-[444px] flex-col overflow-hidden rounded-2xl shadow-2xl'
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
        <h1 className={'text-xl font-normal text-[#050838]'}>
          {props.group.name}
        </h1>
        <p className={'text-base font-light text-[#A0A0A0]'}>
          {props.group.description}
        </p>
      </div>
    </div>
  );
}

export default function GroupsLayout(props: GroupsLayoutProps) {
  return (
    <div
      className={
        'overflow-hidden border-[#E7E7E7] bg-[#F3F4F6] lg:m-20 lg:rounded-2xl lg:border-2 lg:bg-white'
      }
    >
      <div
        className={
          'p-5 text-[#2B2D54] lg:border-b-2 lg:bg-[#2B2D54] lg:text-white'
        }
      >
        <h1 className={'text-4xl font-extrabold'}>Grupos</h1>
      </div>
      <div
        className={'flex flex-row flex-wrap justify-center lg:justify-start'}
      >
        {props.groups.map((group) => (
          <GroupCard key={group.name} group={group} />
        ))}
      </div>
    </div>
  );
}
