import { User } from '@/types/User';
import Image from 'next/image';
import EditIcon from '@/assets/Icons/EditProfileIcon';
import {
  DiscordButton,
  FacebookButton,
  InstagramButton,
  LinkedInButton,
  RedditButton,
  TwitterButton,
  WhatsappButton,
} from '@/components/common/SocialNetworkButton';
import Link from 'next/link';
import defaultUser from '@/assets/images/default_user.png';
import { Session } from 'next-auth';
import { CareerService } from '@/services/CareerService';
import React from 'react';

type UserBannerProps = {
  user: User;
  session: Session | null;
};

function EditButton(props: { user: User }) {
  return (
    <Link data-testid={'editButton'} href={`/users/${props.user.id}/edit`}>
      <button className='flex w-fit items-center rounded-md bg-[#2B2D54] p-2 lg:self-end'>
        <EditIcon className={'m-2 h-5 w-5 fill-white'} />
        <p className={'mr-2 text-lg font-medium text-white'}>Editar perfil</p>
      </button>
    </Link>
  );
}

function SocialNetworksLayout(props: { user: User }) {
  return (
    <div
      data-testid='socialNetworksLayout'
      className='flex max-w-[375px] flex-row items-center justify-evenly'
    >
      {props.user.social_networks?.instagram && (
        <InstagramButton link={props.user.social_networks.instagram} />
      )}
      {props.user.social_networks?.linkedin && (
        <LinkedInButton link={props.user.social_networks.linkedin} />
      )}
      {props.user.social_networks?.twitter && (
        <TwitterButton link={props.user.social_networks.twitter} />
      )}
      {props.user.social_networks?.discord && (
        <DiscordButton link={props.user.social_networks.discord} />
      )}
      {props.user.social_networks?.reddit && (
        <RedditButton link={props.user.social_networks.reddit} />
      )}
      {props.user.social_networks?.facebook && (
        <FacebookButton link={props.user.social_networks.facebook} />
      )}
    </div>
  );
}

function PhoneNumberLayout(props: { user: User }) {
  return (
    <div className={'mb-3'}>
      {props.user.social_networks?.whatsapp && (
        <WhatsappButton number={props.user.social_networks.whatsapp} />
      )}
    </div>
  );
}

function SocialLinksLayout(props: { user: User }) {
  return (
    <>
      <SocialNetworksLayout user={props.user} />
      <PhoneNumberLayout user={props.user} />
    </>
  );
}

function UserBio(props: { bio: string }) {
  return (
    <h1 className='text-center text-2xl text-[#3D405B] lg:mt-2 lg:text-left'>
      {props.bio}
    </h1>
  );
}

function UserCareer(props: { career: string }) {
  return (
    <div className={'mb-2 flex w-fit self-center lg:mt-4 lg:self-start'}>
      <h1 className={'text-2xl text-[#212B36]'}>{props.career}</h1>
    </div>
  );
}

function UserCareers(props: { careers: string[] }) {
  if (props.careers.length == 1) {
    return <UserCareer career={props.careers[0]} />;
  } else if (props.careers.length > 0) {
    const careers = props.careers;
    const firstCareer = careers.shift();
    return (
      <div className='mb-2 flex w-fit flex-col items-center justify-center self-center lg:mt-4 lg:flex-row lg:self-start'>
        <h1 className={'text-2xl text-[#212B36]'}>{firstCareer}</h1>
        {careers.map((career) => (
          <>
            <div className='invisible text-2xl lg:visible lg:ml-2'> |</div>
            <h1 className={'ml-2 text-2xl text-[#212B36]'}>{career}</h1>
          </>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}

function UserName(props: { user: User }) {
  return (
    <h1 className='mb-2 text-center text-5xl font-bold text-[#2B2D54] lg:text-start'>
      {props.user.name}
    </h1>
  );
}

function BannerBackground() {
  return (
    <Image
      src={'/default_user_banner.svg'}
      alt='Banner'
      sizes='100vw'
      width={1920}
      height={1080}
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
}

function UserProfileImage({ profileImage }: { profileImage?: string }) {
  return (
    <Image
      data-testid={profileImage ? 'profileImage' : 'defaultProfileImage'}
      src={profileImage ?? defaultUser}
      alt={'Foto de perfil'}
      width={250}
      height={250}
      className={
        '-mb-28 -translate-y-1/2 justify-self-center rounded-full border-8 border-white lg:-mb-16 lg:-translate-y-1/4 lg:border-[#FAFAFA]'
      }
    />
  );
}

export default async function UserBanner({ user, session }: UserBannerProps) {
  const careers = await CareerService.getByUser(user);
  return (
    <div className={'flex w-full flex-col bg-transparent'}>
      <BannerBackground />
      <div className='mt-10 flex flex-col justify-center lg:mt-0 lg:flex-row lg:justify-between lg:pl-20'>
        <div className={'mb-5 flex flex-col items-center lg:mb-0 lg:flex-row'}>
          <UserProfileImage profileImage={user.profileImage} />
          <div className={'m-5 flex flex-col lg:ml-10 lg:justify-start'}>
            <UserName user={user} />
            <div className='flex flex-col flex-wrap lg:flex-row'>
              {careers.length > 0 && (
                <UserCareers careers={careers.map((c) => c.name)} />
              )}
            </div>
            {user.bio && <UserBio bio={user.bio} />}
          </div>
        </div>
        <div className='mb-10 flex flex-col items-center lg:mb-0 lg:mr-20 lg:justify-around'>
          {user.social_networks && <SocialLinksLayout user={user} />}
          {session?.user?.email === user.email && <EditButton user={user} />}
        </div>
      </div>
    </div>
  );
}
