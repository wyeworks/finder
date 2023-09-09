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

export default function UserBanner(props: { user: User }) {
  // TODO: QUE EL FONDO NO SEA AMARILLO POR FAVOR
  return (
    <div className={'flex w-full flex-col border-2 border-red-600'}>
      <Image
        src={props.user.bannerImage}
        alt='Banner'
        sizes='100vw'
        width={1920}
        height={1080}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <div className={'flex flex-row justify-between bg-white pl-20'}>
        <div className={'flex flex-row'}>
          <Image
            src={props.user.profileImage}
            alt={'Foto de perfil'}
            width={250}
            height={250}
            className={'-translate-y-1/3 rounded-full border-8 border-white'}
          />
          <div className={'ml-10 mt-6'}>
            <h1 className={'text-5xl font-bold text-[#2B2D54]'}>
              {props.user.name}
            </h1>
            <div className={'flex items-center justify-items-start md:mt-4'}>
              <LocationIcon className={'flex-shrink-0'} />
              <h1 className={'ml-2 text-2xl text-[#212B36]'}>
                {props.user.department}
              </h1>
            </div>
            <h1 className={'text-2xl text-[#3D405B] md:mt-2'}>
              {props.user.bio}
            </h1>
          </div>
        </div>
        <div className={'0 mr-7 flex flex-col justify-around'}>
          <div className={'flex flex-row justify-evenly'}>
            {props.user.socialNetworks.instagram ? (
              <InstagramButton link={props.user.socialNetworks.instagram} />
            ) : null}
            {props.user.socialNetworks.linkedin ? (
              <LinkedInButton link={props.user.socialNetworks.linkedin} />
            ) : null}
            {props.user.socialNetworks.twitter ? (
              <TwitterButton link={props.user.socialNetworks.twitter} />
            ) : null}
            {props.user.socialNetworks.discord ? (
              <DiscordButton link={props.user.socialNetworks.discord} />
            ) : null}
          </div>
          <button
            className={
              'flex w-fit items-center self-end rounded-md bg-[#2B2D54] p-2'
            }
          >
            <EditIcon className={'m-2 h-5 w-5 fill-white'} />
            <p className={'ml-2 mr-2 text-lg font-medium text-white'}>
              Editar Perfil
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
