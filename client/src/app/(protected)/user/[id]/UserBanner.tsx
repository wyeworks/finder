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
import Link from 'next/link';
import defaultUser from '@/assets/images/default_user.png';
import { Session } from 'next-auth';

type UserBannerProps = {
  user: User;
  session: Session | null;
};

function EditButton() {
  return (
    <Link data-testid={'editButton'} href={'/configperfil'}>
      <button
        className={
          'flex w-fit items-center rounded-md bg-[#2B2D54] p-2 lg:self-end'
        }
      >
        <EditIcon className={'m-2 h-5 w-5 fill-white'} />
        <p className={'mr-2 text-lg font-medium text-white'}>Editar Perfil</p>
      </button>
    </Link>
  );
}

function SocialLinksLayout(props: { user: User }) {
  return (
    <div
      data-testid={'socialNetworksLayout'}
      className={'mb-5 flex max-w-[375px] flex-row items-center justify-evenly'}
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
    </div>
  );
}

function UserBio(props: { user: User }) {
  return (
    <h1 className={'text-center text-2xl text-[#3D405B] lg:mt-2 lg:text-left'}>
      {props.user.bio ?? 'Sin bio'}
    </h1>
  );
}

// eslint-disable-next-line no-unused-vars
function UserLocation(props: { user: User }) {
  //TODO: Agregar user location
  return (
    <div className={'mb-2 flex w-fit self-center lg:mt-4 lg:self-start'}>
      <LocationIcon className={'flex-shrink-0'} />
      <h1 className={'ml-2 text-2xl text-[#212B36]'}>Montevideo</h1>
    </div>
  );
}

function UserName(props: { user: User }) {
  return (
    <h1
      className={
        'mb-2 text-center text-5xl font-bold text-[#2B2D54] lg:text-start'
      }
    >
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

export default function UserBanner({ user, session }: UserBannerProps) {
  return (
    <div className={'flex w-full flex-col bg-transparent'}>
      <BannerBackground />
      <div
        className={
          'mt-10 flex flex-col justify-center lg:mt-0 lg:flex-row lg:justify-between lg:pl-20'
        }
      >
        <div className={'mb-5 flex flex-col items-center lg:mb-0 lg:flex-row'}>
          <UserProfileImage profileImage={user.profileImage} />
          <div className={'m-5 flex flex-col lg:ml-10 lg:justify-start'}>
            <UserName user={user} />
            <UserLocation user={user} />
            <UserBio user={user} />
          </div>
        </div>
        <div
          className={
            'mb-10 flex flex-col items-center lg:mb-0 lg:mr-20 lg:justify-around'
          }
        >
          {user.social_networks && <SocialLinksLayout user={user} />}
          {session?.user?.email === user.email && <EditButton />}
        </div>
      </div>
    </div>
  );
}

//<Link href={'/(protected)/configuser'}>