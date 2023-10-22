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

function validateUrl(url: string) {
  if (url.startsWith('https://')) return url;
  else return `https://${url}`;
}

function SocialNetworkButton(props: SocialNetworkButtonProps) {
  return (
    <a
      data-testid={`${props.name}Button`}
      href={validateUrl(props.link)}
      className='m-2 h-6 w-6'
    >
      <div className={'flex items-center justify-center'}>{props.icon}</div>
    </a>
  );
}

function InstagramButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Instagram'}
      link={props.link}
      icon={
        <InstagramIcon
          className='h-full w-full fill-gray-600'
          width={16}
          height={16}
        />
      }
    />
  );
}

function LinkedInButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'LinkedIn'}
      link={props.link}
      icon={
        <LinkedInIcon
          className='h-full w-full fill-gray-600'
          width={16}
          height={16}
        />
      }
    />
  );
}

function TwitterButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Twitter'}
      link={props.link}
      icon={
        <TwitterIcon
          className='h-full w-full fill-gray-600'
          width={16}
          height={16}
        />
      }
    />
  );
}

function DiscordButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Discord'}
      link={props.link}
      icon={
        <DiscordIcon
          className='h-full w-full fill-gray-600'
          width={16}
          height={16}
        />
      }
    />
  );
}

function RedditButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Reddit'}
      link={props.link}
      icon={
        <RedditIcon
          className='h-full w-full fill-gray-600'
          width={16}
          height={16}
        />
      }
    />
  );
}

function FacebookButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Facebook'}
      link={props.link}
      icon={
        <FacebookIcon
          className='h-full w-full fill-gray-600'
          width={16}
          height={16}
        />
      }
    />
  );
}

function WhatsappButton(props: { number: string }) {
  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=598${props.number}`}
      className='flex h-12 flex-row items-start justify-center p-2'
    >
      <WhatsappIcon className='fill-gray-600 lg:ml-2' width={16} height={16} />
      <p className='ml-2 text-lg/6 text-gray-600'>{props.number}</p>
    </a>
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
