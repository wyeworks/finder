'use client';

import { User } from '@/types/User';
import Image from 'next/image';
import LocationIcon from '@/assets/Icons/LocationIcon';
import EditIcon from '@/assets/Icons/EditProfileIcon';
import {
  DiscordButton,
  InstagramButton,
  LinkedInButton,
  TwitterButton,
} from '@/components/common/SocialNetworkButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UserBanner(props: { user: User }) {
  const { profileImage, name, bio, socialNetworks, email } = props.user;
  const { data: session } = useSession();
  const router = useRouter();

  function renderSocialNetworkButtons() {
    if (socialNetworks) {
      return (
        <div className='mb-5 flex max-w-[375px] flex-row items-center justify-evenly'>
          {socialNetworks.instagram && (
            <InstagramButton link={socialNetworks.instagram} />
          )}
          {socialNetworks.linkedin && (
            <LinkedInButton link={socialNetworks.linkedin} />
          )}
          {socialNetworks.twitter && (
            <TwitterButton link={socialNetworks.twitter} />
          )}
          {socialNetworks.discord && (
            <DiscordButton link={socialNetworks.discord} />
          )}
        </div>
      );
    }
  }

  return (
    <div className='flex w-full flex-col bg-transparent'>
      <Image
        src={profileImage ?? '/default_user_banner.svg'}
        alt='Banner'
        sizes='100vw'
        width={1920}
        height={1080}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <div className='mt-10 flex flex-col justify-center lg:mt-0 lg:flex-row lg:justify-between lg:pl-20'>
        <div className='mb-5 flex flex-col items-center lg:mb-0 lg:flex-row'>
          <Image
            src={
              profileImage ?? 'https://randomuser.me/api/portraits/women/81.jpg'
            }
            alt='Foto de perfil'
            width={250}
            height={250}
            className='-mb-28 -translate-y-1/2 justify-self-center rounded-full border-8 border-white lg:-mb-16 lg:-translate-y-1/4 lg:border-[#FAFAFA]'
          />
          <div className='m-5 flex flex-col lg:ml-10 lg:justify-start'>
            <h1 className='mb-2 text-center text-5xl font-bold text-[#2B2D54] lg:text-start'>
              {name}
            </h1>
            <div className='mb-2 flex w-fit self-center lg:mt-4 lg:self-start'>
              <LocationIcon className='flex-shrink-0' />
              <h1 className='ml-2 text-2xl text-[#212B36]'>Montevideo</h1>
            </div>
            <h1 className='text-center text-2xl text-[#3D405B] lg:mt-2 lg:text-left'>
              {bio}
            </h1>
          </div>
        </div>
        <div className='mb-10 flex flex-col items-center lg:mb-0 lg:mr-20 lg:justify-around'>
          {renderSocialNetworkButtons()}
          {session?.user?.email === email && (
            <button
              onClick={() => router.push('/protected/configuser')}
              className='flex w-fit items-center rounded-md bg-[#2B2D54] p-2 lg:self-end'
            >
              <EditIcon className='m-2 h-5 w-5 fill-white' />
              <p className='mr-2 text-lg font-medium text-white'>
                Editar Perfil
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
