import { StudyGroup } from '@/types/StudyGroup';
import Image from 'next/image';
import Link from 'next/link';

type GroupCardProps = {
  group: StudyGroup;
  className?: string;
};

export function GroupCard({ group, className = '' }: GroupCardProps) {
  return (
    <Link href={'/groups/' + group.id}>
      <div
        data-testid={`groupCard-${group.name}`}
        className={`flex-col overflow-hidden rounded-2xl shadow-lg ${className}`}
      >
        <Image
          data-testid={`groupBanner-${group.banner ?? 'default'}`}
          src={group.banner ? group.banner : '/default_group_banner.png'}
          alt={group.name}
          width={891}
          height={306}
          className='w-full'
        />
        <div className='bg-white p-5'>
          <h1
            data-testid={`groupSubject-${group.subject_id}`}
            className='text-base font-bold text-[#242760]'
          >
            {group.subject_name}
          </h1>
          <h1
            data-testid={`groupName-${group.name}`}
            className='text-xl font-normal text-[#050838]'
          >
            {group.name}
          </h1>
          <p
            data-testid={`groupDescription-${group.description}`}
            className='text-base font-light text-[#A0A0A0]'
          >
            {group.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
