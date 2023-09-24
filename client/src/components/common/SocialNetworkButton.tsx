import { ReactNode } from 'react';
import InstagramIcon from '@/assets/Icons/InstagramIcon';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon';
import TwitterIcon from '@/assets/Icons/TwitterIcon';
import DiscordIcon from '@/assets/Icons/DiscordIcon';

type SocialNetworkButtonProps = {
  name: string;
  icon: ReactNode;
  link: string;
};

function SocialNetworkButton(props: SocialNetworkButtonProps) {
  return (
    <a data-testid={`${props.name}Button`} href={props.link} className='m-2'>
      {props.icon}
    </a>
  );
}

function InstagramButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Instagram'}
      link={props.link}
      icon={<InstagramIcon className='h-8 w-8' />}
    />
  );
}

function LinkedInButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'LinkedIn'}
      link={props.link}
      icon={<LinkedInIcon className='h-8 w-8' />}
    />
  );
}

function TwitterButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Twitter'}
      link={props.link}
      icon={<TwitterIcon className='h-8 w-8' />}
    />
  );
}

function DiscordButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Discord'}
      link={props.link}
      icon={<DiscordIcon className='h-8 w-8' />}
    />
  );
}

export { InstagramButton, LinkedInButton, TwitterButton, DiscordButton };
