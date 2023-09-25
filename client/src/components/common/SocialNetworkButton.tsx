import { ReactNode } from 'react';
import InstagramIcon from '@/assets/Icons/InstagramIcon';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon';
import TwitterIcon from '@/assets/Icons/TwitterIcon';
import DiscordIcon from '@/assets/Icons/DiscordIcon';
import RedditIcon from '@/assets/Icons/RedditIcon';
import FacebookIcon from '@/assets/Icons/FacebookIcon';

type SocialNetworkButtonProps = {
  name: string;
  icon: ReactNode;
  link: string;
};

function SocialNetworkButton(props: SocialNetworkButtonProps) {
  return (
    <a
      data-testid={`${props.name}Button`}
      href={`https://${props.link}`}
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
      icon={<InstagramIcon className='h-16 w-16' />}
    />
  );
}

function LinkedInButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'LinkedIn'}
      link={props.link}
      icon={<LinkedInIcon className='h-16 w-16' />}
    />
  );
}

function TwitterButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Twitter'}
      link={props.link}
      icon={<TwitterIcon className='h-16 w-16' />}
    />
  );
}

function DiscordButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Discord'}
      link={props.link}
      icon={<DiscordIcon className='h-16 w-16' />}
    />
  );
}

function RedditButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Reddit'}
      link={props.link}
      icon={<RedditIcon className='h-16 w-16' />}
    />
  );
}

function FacebookButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Facebook'}
      link={props.link}
      icon={<FacebookIcon className='h-16 w-16' />}
    />
  );
}

export {
  InstagramButton,
  LinkedInButton,
  TwitterButton,
  DiscordButton,
  RedditButton,
  FacebookButton,
};
