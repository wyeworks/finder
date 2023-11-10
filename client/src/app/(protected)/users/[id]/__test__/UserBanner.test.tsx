import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserBanner from '@/app/(protected)/users/[id]/UserBanner';
import {
  SocialNetworksBuilder,
  UserBuilder,
} from '../../../../../../tests/builders/UserBuilder';
import React from 'react';
import { Career } from '@/types/Career';

const testCareer: Career = {
  id: 101,
  name: 'Test career',
  code: 'CS101',
  approved_on: '2023-01-01',
  years: 4,
  credits: 120,
};

describe('UserBanner Component', () => {
  const usuarioTipico = UserBuilder.aUser().withCareers([testCareer]).build();

  it('should render without crashing', () => {
    render(<UserBanner user={usuarioTipico} isLoggedUser={false} />);
  });

  it('should show the users name', () => {
    render(<UserBanner user={usuarioTipico} isLoggedUser={false} />);

    expect(document.querySelector('h1')).toHaveTextContent(usuarioTipico.name);
  });

  it('should show the users profile picture if it exists', () => {
    render(<UserBanner user={usuarioTipico} isLoggedUser={false} />);

    const profileImage = screen.getByTestId('profileImage');

    expect(profileImage).toBeInTheDocument();
  });

  it('should show a default profile picture if the users does not have one', () => {
    const usuarioSinFoto = UserBuilder.aUser()
      .withProfileImage(undefined)
      .build();

    render(<UserBanner user={usuarioSinFoto} isLoggedUser={false} />);

    const profileImage = screen.getByTestId('defaultProfileImage');

    expect(profileImage).toBeInTheDocument();
  });

  it('should show the users bio if it exists', () => {
    const usuarioConBio = UserBuilder.aUser().withBio('Bio de prueba').build();

    render(<UserBanner user={usuarioConBio} isLoggedUser={false} />);

    expect(screen.getByText('Bio de prueba')).toBeInTheDocument();
  });

  it('should not show a bio if the user does not have one', () => {
    const usuarioSinBio = UserBuilder.aUser().withBio(undefined).build();

    render(<UserBanner user={usuarioSinBio} isLoggedUser={false} />);

    expect(screen.queryByTestId('BioField')).not.toBeInTheDocument();
  });

  describe('Social Networks links', () => {
    describe('When the users has social networks', () => {
      it("should show the users's social media link instagram if it exists", () => {
        const usuarioConInstagram = UserBuilder.aUser()
          .withSocialNetworks(
            SocialNetworksBuilder.aSocialNetworks().withInstagram('instagram')
          )
          .build();

        render(<UserBanner user={usuarioConInstagram} isLoggedUser={false} />);

        expect(screen.getByTestId('InstagramButton')).toBeInTheDocument();
      });

      it("should show the users's social media link twitter if it exists", () => {
        const usuarioConTwitter = UserBuilder.aUser()
          .withSocialNetworks(
            SocialNetworksBuilder.aSocialNetworks().withTwitter('twitter')
          )
          .build();

        render(<UserBanner user={usuarioConTwitter} isLoggedUser={false} />);

        expect(screen.getByTestId('TwitterButton')).toBeInTheDocument();
      });

      it("should show the users's social media link linkedin if it exists", () => {
        const usuarioConLinkedIn = UserBuilder.aUser()
          .withSocialNetworks(
            SocialNetworksBuilder.aSocialNetworks().withLinkedin('linkedin')
          )
          .build();

        render(<UserBanner user={usuarioConLinkedIn} isLoggedUser={false} />);

        expect(screen.getByTestId('LinkedInButton')).toBeInTheDocument();
      });

      it("should show the users's social media link discord if it exists", () => {
        const usuarioConDiscord = UserBuilder.aUser()
          .withSocialNetworks(
            SocialNetworksBuilder.aSocialNetworks().withDiscord('discord')
          )
          .build();

        render(<UserBanner user={usuarioConDiscord} isLoggedUser={false} />);

        expect(screen.getByTestId('DiscordButton')).toBeInTheDocument();
      });

      it('should have each social network link in the correct place', () => {
        const usuarioConTodasLasRedes = UserBuilder.aUser()
          .withSocialNetworks(
            SocialNetworksBuilder.aSocialNetworks()
              .withInstagram('instagram')
              .withTwitter('twitter')
              .withLinkedin('linkedin')
              .withDiscord('discord')
          )
          .build();

        render(
          <UserBanner user={usuarioConTodasLasRedes} isLoggedUser={false} />
        );

        expect(screen.getByTestId('InstagramButton')).toBeInTheDocument();
        expect(screen.getByTestId('TwitterButton')).toBeInTheDocument();
        expect(screen.getByTestId('LinkedInButton')).toBeInTheDocument();
        expect(screen.getByTestId('DiscordButton')).toBeInTheDocument();
      });
    });

    it("When the users doesn't have social networks", () => {
      const usuarioSinRedes = UserBuilder.aUser()
        .withSocialNetworks(undefined)
        .build();

      render(<UserBanner user={usuarioSinRedes} isLoggedUser={false} />);

      expect(
        screen.queryByTestId('socialNetworksLayout')
      ).not.toBeInTheDocument();
    });
  });

  it('should show a button to edit the profile if the users is the owner of the profile', () => {
    const usuarioLogueado = UserBuilder.aUser().build();

    render(<UserBanner user={usuarioLogueado} isLoggedUser={true} />);

    expect(screen.getByTestId('editButton')).toBeInTheDocument();
  });

  it('should not show a button to edit the profile if the users is not the owner of the profile', () => {
    const usuario = UserBuilder.aUser().build();

    render(<UserBanner user={usuario} isLoggedUser={false} />);

    expect(screen.queryByTestId('editButton')).not.toBeInTheDocument();
  });

  it('should display multiple careers correctly', () => {
    // Create a user with multiple careers
    const careers = [
      { ...testCareer, name: 'Career 1' },
      { ...testCareer, name: 'Career 2' },
      { ...testCareer, name: 'Career 3' },
    ];
    const userWithMultipleCareers = UserBuilder.aUser()
      .withCareers(careers)
      .build();

    // Render UserBanner with the user
    render(<UserBanner user={userWithMultipleCareers} isLoggedUser={false} />);

    // Check if the first career is displayed correctly
    expect(screen.getByText('Career 1')).toBeInTheDocument();

    // Check if the other careers are displayed correctly
    careers.slice(1).forEach((career) => {
      expect(screen.getByText(career.name)).toBeInTheDocument();
    });
  });
});
