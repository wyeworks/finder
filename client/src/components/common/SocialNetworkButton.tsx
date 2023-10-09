import React from 'react';
import InstagramIcon from '@/assets/Icons/InstagramIcon';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon';
import TwitterIcon from '@/assets/Icons/TwitterIcon';
import DiscordIcon from '@/assets/Icons/DiscordIcon';
import RedditIcon from '@/assets/Icons/RedditIcon';
import FacebookIcon from '@/assets/Icons/FacebookIcon';
import WhatsappIcon from '@/assets/Icons/WhatsappIcon';

type SocialNetworkButtonProps = {
  name: string;
  icon: React.ReactNode;
  link: string;
};

function SocialNetworkButton(props: SocialNetworkButtonProps) {
  return (
    <a
      data-testid={`${props.name}Button`}
      href={props.link}
      className='h-16 w-16'
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
      icon={<InstagramIcon className='h-full w-full fill-gray-600' />}
    />
  );
}

function LinkedInButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'LinkedIn'}
      link={props.link}
      icon={<LinkedInIcon className='h-full w-full fill-gray-600' />}
    />
  );
}

function TwitterButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Twitter'}
      link={props.link}
      icon={<TwitterIcon className='h-full w-full fill-gray-600' />}
    />
  );
}

function DiscordButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Discord'}
      link={props.link}
      icon={<DiscordIcon className='h-full w-full fill-gray-600' />}
    />
  );
}

function RedditButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Reddit'}
      link={props.link}
      icon={<RedditIcon className='h-full w-full fill-gray-600' />}
    />
  );
}

function FacebookButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Facebook'}
      link={props.link}
      icon={<FacebookIcon className='h-full w-full fill-gray-600' />}
    />
  );
}

function WhatsappButton(props: { number: string }) {
  return (
    <div className='flex h-16 flex-row items-start justify-center'>
      <WhatsappIcon className='h-16 w-16 fill-gray-600 lg:ml-2' />
      <p className='text-4xl text-gray-600'>{props.number}</p>
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
