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
    <a data-testid={`${props.name}Button`} href={props.link} className={'m-2'}>
      {props.icon}
    </a>
  );
}

function InstagramButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Instagram'}
      link={props.link}
      icon={<InstagramIcon />}
    />
  );
}

function LinkedInButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'LinkedIn'}
      link={props.link}
      icon={<LinkedInIcon />}
    />
  );
}

function TwitterButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Twitter'}
      link={props.link}
      icon={<TwitterIcon />}
    />
  );
}

function DiscordButton(props: { link: string }) {
  return (
    <SocialNetworkButton
      name={'Discord'}
      link={props.link}
      icon={<DiscordIcon />}
    />
  );
}

export { InstagramButton, LinkedInButton, TwitterButton, DiscordButton };
