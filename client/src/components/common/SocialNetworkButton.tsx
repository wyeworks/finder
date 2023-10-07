import { ReactNode } from 'react';
import InstagramIcon from '@/assets/Icons/InstagramIcon';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon';
import TwitterIcon from '@/assets/Icons/TwitterIcon';
import DiscordIcon from '@/assets/Icons/DiscordIcon';
import RedditIcon from '@/assets/Icons/RedditIcon';
import FacebookIcon from '@/assets/Icons/FacebookIcon';
import WhatsappIcon from '@/assets/Icons/WhatsappIcon';

type SocialNetworkButtonProps = {
  name: string;
  icon: ReactNode;
  link: string;
};

function SocialNetworkButton(props: SocialNetworkButtonProps) {
  return (
    <a
      data-testid={`${props.name}Button`}
      href={props.link}
      className='m-2 lg:mt-10'
    >
      {props.icon}
    </a>
  );
}

function InstagramButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Instagram'}
      link={props.link}
      icon={<InstagramIcon className='h-16 w-16 fill-gray-600' />}
    />
  );
}

function LinkedInButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'LinkedIn'}
      link={props.link}
      icon={<LinkedInIcon className='h-16 w-16 fill-gray-600' />}
    />
  );
}

function TwitterButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Twitter'}
      link={props.link}
      icon={<TwitterIcon className='h-16 w-16 fill-gray-600' />}
    />
  );
}

function DiscordButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Discord'}
      link={props.link}
      icon={<DiscordIcon className='h-16 w-16 fill-gray-600' />}
    />
  );
}

function RedditButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Reddit'}
      link={props.link}
      icon={<RedditIcon className='h-16 w-16 fill-gray-600' />}
    />
  );
}

function FacebookButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Facebook'}
      link={props.link}
      icon={<FacebookIcon className='h-16 w-16 fill-gray-600' />}
    />
  );
}

function WhatsappButton(props: { number: string }) {
  return (
    <div className='m-2 flex items-center justify-center'>
      <WhatsappIcon className='mt-3 h-16 w-16 fill-gray-600' />
      <p className='ml-2 h-min text-4xl text-gray-600'>{props.number}</p>
    </div>
  );
}

export {
  InstagramButton,
  LinkedInButton,
  TwitterButton,
  DiscordButton,
  RedditButton,
  FacebookButton,
  WhatsappButton,
};
