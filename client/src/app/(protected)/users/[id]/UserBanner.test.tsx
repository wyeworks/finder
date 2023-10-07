// import { render, screen } from '@testing-library/react';
// import UserBanner from '@/app/(protected)/users/[id]/UserBanner';
// import {
//   SocialNetworksBuilder,
//   UserBuilder,
// } from '../../../../../tests/builders/UserBuilder';
// import { Session } from 'next-auth';
//
// describe('UserBanner Component', () => {
//   const usuarioTipico = UserBuilder.aUser().build();
//
//   it('should render without crashing', () => {
//     render(<UserBanner user={usuarioTipico} session={null} />);
//   });
//
//   it('should show the users name', () => {
//     render(<UserBanner user={usuarioTipico} session={null} />);
//
//     expect(document.querySelector('h1')).toHaveTextContent(usuarioTipico.name);
//   });
//
//   it('should show the users profile picture if it exists', () => {
//     render(<UserBanner user={usuarioTipico} session={null} />);
//
//     const profileImage = screen.getByTestId('profileImage');
//
//     expect(profileImage).toBeInTheDocument();
//   });
//
//   it('should show a default profile picture if the users does not have one', () => {
//     const usuarioSinFoto = UserBuilder.aUser()
//       .withProfileImage(undefined)
//       .build();
//
//     render(<UserBanner user={usuarioSinFoto} session={null} />);
//
//     const profileImage = screen.getByTestId('defaultProfileImage');
//
//     expect(profileImage).toBeInTheDocument();
//   });
//
//   it('should show the users bio if it exists', () => {
//     const usuarioConBio = UserBuilder.aUser().withBio('Bio de prueba').build();
//
//     render(<UserBanner user={usuarioConBio} session={null} />);
//
//     expect(screen.getByText('Bio de prueba')).toBeInTheDocument();
//   });
//
//   it('should show a default bio if the users does not have one', () => {
//     const usuarioSinBio = UserBuilder.aUser().withBio(undefined).build();
//
//     render(<UserBanner user={usuarioSinBio} session={null} />);
//
//     expect(screen.getByText('Sin bio')).toBeInTheDocument();
//   });
//
//   describe('Social Networks links', () => {
//     describe('When the users has social networks', () => {
//       it("should show the users's social media link instagram if it exists", () => {
//         const usuarioConInstagram = UserBuilder.aUser()
//           .withSocialNetworks(
//             SocialNetworksBuilder.aSocialNetworks().withInstagram('instagram')
//           )
//           .build();
//
//         render(<UserBanner user={usuarioConInstagram} session={null} />);
//
//         expect(screen.getByTestId('InstagramButton')).toBeInTheDocument();
//       });
//
//       it("should show the users's social media link twitter if it exists", () => {
//         const usuarioConTwitter = UserBuilder.aUser()
//           .withSocialNetworks(
//             SocialNetworksBuilder.aSocialNetworks().withTwitter('twitter')
//           )
//           .build();
//
//         render(<UserBanner user={usuarioConTwitter} session={null} />);
//
//         expect(screen.getByTestId('TwitterButton')).toBeInTheDocument();
//       });
//
//       it("should show the users's social media link linkedin if it exists", () => {
//         const usuarioConLinkedIn = UserBuilder.aUser()
//           .withSocialNetworks(
//             SocialNetworksBuilder.aSocialNetworks().withLinkedin('linkedin')
//           )
//           .build();
//
//         render(<UserBanner user={usuarioConLinkedIn} session={null} />);
//
//         expect(screen.getByTestId('LinkedInButton')).toBeInTheDocument();
//       });
//
//       it("should show the users's social media link discord if it exists", () => {
//         const usuarioConDiscord = UserBuilder.aUser()
//           .withSocialNetworks(
//             SocialNetworksBuilder.aSocialNetworks().withDiscord('discord')
//           )
//           .build();
//
//         render(<UserBanner user={usuarioConDiscord} session={null} />);
//
//         expect(screen.getByTestId('DiscordButton')).toBeInTheDocument();
//       });
//
//       it('should have each social network link in the correct place', () => {
//         const usuarioConTodasLasRedes = UserBuilder.aUser()
//           .withSocialNetworks(
//             SocialNetworksBuilder.aSocialNetworks()
//               .withInstagram('instagram')
//               .withTwitter('twitter')
//               .withLinkedin('linkedin')
//               .withDiscord('discord')
//           )
//           .build();
//
//         render(<UserBanner user={usuarioConTodasLasRedes} session={null} />);
//
//         expect(screen.getByTestId('InstagramButton')).toBeInTheDocument();
//         expect(screen.getByTestId('TwitterButton')).toBeInTheDocument();
//         expect(screen.getByTestId('LinkedInButton')).toBeInTheDocument();
//         expect(screen.getByTestId('DiscordButton')).toBeInTheDocument();
//       });
//     });
//
//     it("When the users doesn't have social networks", () => {
//       const usuarioSinRedes = UserBuilder.aUser()
//         .withSocialNetworks(undefined)
//         .build();
//
//       render(<UserBanner user={usuarioSinRedes} session={null} />);
//
//       expect(
//         screen.queryByTestId('socialNetworksLayout')
//       ).not.toBeInTheDocument();
//     });
//   });
//
//   it('should show a button to edit the profile if the users is the owner of the profile', () => {
//     const usuarioLogueado = UserBuilder.aUser().build();
//     const sessionDeUsuario = {
//       user: {
//         email: usuarioLogueado.email,
//       },
//     } as Session;
//
//     render(<UserBanner user={usuarioLogueado} session={sessionDeUsuario} />);
//
//     expect(screen.getByTestId('editButton')).toBeInTheDocument();
//   });
//
//   it('should not show a button to edit the profile if the users is not the owner of the profile', () => {
//     const usuario = UserBuilder.aUser().build();
//     const sessionDeOtroUsuario = {
//       user: {
//         email: 'someOtherEmail',
//       },
//     } as Session;
//
//     render(<UserBanner user={usuario} session={sessionDeOtroUsuario} />);
//
//     expect(screen.queryByTestId('editButton')).not.toBeInTheDocument();
//   });
// });
