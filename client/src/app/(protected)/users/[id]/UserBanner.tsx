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
import { getServerSession } from 'next-auth';
import { CareerService } from '@/services/CareerService';
import React, { Suspense } from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import Loading from '@/components/common/Loading';
import { SocialNetworks } from '@/types/SocialNetworks';

type UserBannerProps = {
  user: User;
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

function SocialNetworkButtons(props: { social_networks: SocialNetworks }) {
  return (
    <div className='mt-10 flex flex-row items-center justify-evenly'>
      {props.social_networks.instagram && (
        <InstagramButton link={props.social_networks.instagram} />
      )}
      {props.social_networks.linkedin && (
        <LinkedInButton link={props.social_networks.linkedin} />
      )}
      {props.social_networks.twitter && (
        <TwitterButton link={props.social_networks.twitter} />
      )}
      {props.social_networks.discord && (
        <DiscordButton link={props.social_networks.discord} />
      )}
      {props.social_networks.reddit && (
        <RedditButton link={props.social_networks.reddit} />
      )}
      {props.social_networks.facebook && (
        <FacebookButton link={props.social_networks.facebook} />
      )}
    </div>
  );
}

function SocialNetworksLayout(props: { user: User }) {
  return (
    <>
      {props.user.social_networks && (
        <SocialNetworkButtons social_networks={props.user.social_networks} />
      )}
    </>
  );
}

function PhoneNumberLayout(props: { user: User }) {
  return (
    <>
      {props.user.social_networks?.whatsapp && (
        <WhatsappButton number={props.user.social_networks.whatsapp} />
      )}
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

function UserCareers(props: { careers: string[] }) {
  if (props.careers.length == 1) {
    return (
      <div className='mb-2 flex h-full items-center justify-center self-center lg:mt-4 lg:self-start'>
        <h1 className='text-2xl text-[#212B36]'>{props.careers[0]}</h1>
      </div>
    );
  } else if (props.careers.length > 0) {
    const careers = props.careers;
    const firstCareer = careers.shift();
    return (
      <div className='flex h-min w-fit flex-col items-center justify-center self-center lg:flex-row lg:self-start'>
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

function UserProfileImage({ profileImage }: { profileImage?: string }) {
  return (
    <Image
      data-testid={profileImage ? 'profileImage' : 'defaultProfileImage'}
      src={profileImage ?? defaultUser}
      alt='Foto de perfil'
      width={250}
      height={250}
      className='rounded-full border-8 border-white lg:border-[#FAFAFA]'
    />
  );
}

async function Careers({ user }: { user: User }) {
  const careers = await CareerService.getByUser(user);

  return (
    <div className='flex flex-col flex-wrap lg:flex-row'>
      {careers.length > 0 && (
        <div className='flex w-fit items-center justify-center'>
          <svg
            width='35'
            height='35'
            viewBox='0 0 35 35'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='mr-2 mt-2'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.5336 2.57465C16.8952 2.39353 17.3211 2.39353 17.6827 2.57465C22.7372 5.10605 27.4429 8.22984 31.7088 11.8548C32.0633 12.156 32.227 12.6254 32.1366 13.0818C32.0463 13.5381 31.716 13.9097 31.2735 14.0532C26.4589 15.6134 21.9406 17.8333 17.8252 20.6066C17.3918 20.8987 16.8245 20.8987 16.3911 20.6066C15.2354 19.8278 14.048 19.0926 12.8311 18.4035V16.3898C12.8311 15.9732 13.0291 15.5982 13.3472 15.3777C15.163 14.1191 17.0507 12.9571 19.0027 11.899C19.6257 11.5613 19.857 10.7825 19.5193 10.1595C19.1816 9.53647 18.4028 9.30519 17.7798 9.64289C15.7451 10.7458 13.7777 11.957 11.8853 13.2686C10.8514 13.9852 10.2649 15.1614 10.2649 16.3898V17.0404C7.91613 15.8731 5.47029 14.8722 2.94279 14.0532C2.50027 13.9097 2.17003 13.5381 2.07967 13.0818C1.98932 12.6254 2.15302 12.156 2.5075 11.8548C6.77345 8.22984 11.4791 5.10605 16.5336 2.57465ZM10.2649 19.924C8.89982 19.2024 7.49847 18.5406 6.06433 17.9421C5.77592 19.6967 5.55263 21.4733 5.39702 23.2692C5.35115 23.7986 5.63634 24.3015 6.11421 24.5339C7.01741 24.9731 7.90387 25.4415 8.77237 25.9377C8.4153 26.4919 7.99414 27.0168 7.50889 27.502C7.0078 28.0031 7.0078 28.8155 7.50889 29.3166C8.00997 29.8177 8.8224 29.8177 9.32348 29.3166C9.9559 28.6842 10.5028 27.9984 10.9642 27.2739C10.2473 26.8085 9.51644 26.3629 8.7724 25.9377C9.76747 24.3935 10.2649 22.6221 10.2649 20.8485V19.924ZM16.2603 31.2908C14.5983 29.8274 12.8284 28.484 10.9642 27.2739C12.1119 25.4717 12.7305 23.4292 12.8198 21.3699C13.544 21.8076 14.2566 22.2627 14.957 22.7347C16.2573 23.611 17.9591 23.611 19.2593 22.7347C22.0428 20.859 25.0192 19.2494 28.1521 17.9421C28.4405 19.6967 28.6638 21.4733 28.8194 23.2692C28.8653 23.7986 28.5801 24.3015 28.1022 24.5339C24.4131 26.3279 21.0033 28.6078 17.9561 31.2908C17.4714 31.7176 16.745 31.7176 16.2603 31.2908Z'
              fill='#2B2D54'
            />
          </svg>
          <UserCareers careers={careers.map((c) => c.name)} />
        </div>
      )}
    </div>
  );
}

export default async function UserBanner({ user }: UserBannerProps) {
  const session = await getServerSession(authOptions);
  return (
    <div className='flex w-full flex-col border-b-2 border-gray-100 bg-transparent'>
      <div className='flex flex-col justify-center lg:mt-0 lg:flex-row lg:justify-between lg:pl-20'>
        <div className='mt-10 flex flex-col items-center lg:flex-row'>
          <UserProfileImage profileImage={user.profileImage} />
          <div className={'flex flex-col lg:ml-10 lg:justify-start'}>
            <UserName user={user} />
            <Suspense fallback={<Loading />}>
              <Careers user={user} />
            </Suspense>
            {user.bio && <UserBio bio={user.bio} />}
            <div className='mt-3 flex h-16 flex-col items-center justify-center lg:flex-row lg:justify-start'>
              <SocialNetworksLayout user={user} />
              <PhoneNumberLayout user={user} />
            </div>
          </div>
        </div>
        <div className='m-10 flex justify-center lg:mr-20 lg:mt-10'>
          {session?.user?.email === user.email && <EditButton user={user} />}
        </div>
      </div>
    </div>
  );
}
