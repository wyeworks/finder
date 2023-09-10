/* eslint-disable */
// TODO: Habilitar el eslint cuando estos datos se consigan del back

import { User } from '@/types/User';
import { SocialNetworks } from '@/types/SocialNetworks';

function findById(id: string) {
  const mySocialNetworks: SocialNetworks = {
    instagram: 'https://www.instagram.com/bruno.lemus/',
    linkedin: 'https://www.linkedin.com/in/bruno-lemus/',
    twitter: 'https://twitter.com/bruno_lemus',
    discord: 'https://discord.com/users/bruno.lemus#0001',
  };

  return Promise.resolve({
    name: 'Bruno Lemus',
    email: 'bruno.lemus@fing.edu.uy',
    bio: 'I have crippling depression, I study programming because I want to earn petro dollars and escape from Latin America, the place where dreams go to die',
    profileImage:
      'https://media.licdn.com/dms/image/C4E03AQGXuUN8kAhrPg/profile-displayphoto-shrink_800_800/0/1643247705278?e=1699488000&v=beta&t=WNVQ8jIJuJ5nt1BH_AXLaHpLXsHmP0uOo6N8_E4NWIs',
    bannerImage:
      'https://media.licdn.com/dms/image/C4E16AQELcC0h3DgQcg/profile-displaybackgroundimage-shrink_350_1400/0/1634470199535?e=1699488000&v=beta&t=UXFliwimhid64zS8vn3FyWRxLKZtT2Ru1EQfZh2bzns',
    department: 'Montevideo',
    socialNetworks: mySocialNetworks,
  } as User);
}

export { findById };
