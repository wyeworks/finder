import Header from '@/components/common/Header';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/providers/SessionProvider';
import { User } from '@/types/User';

export default async function protectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // TODO: ARREGLAR EL CODIGO ACA ESTO ES SOLO PARA PODER TRABAJAR PERO QUE ANDE
  const user = {
    name: 'Bruno Lemus',
    email: 'bruno.lemus@fing.edu.uy',
    profileImage:
      'https://media.licdn.com/dms/image/C4E03AQGXuUN8kAhrPg/profile-displayphoto-shrink_800_800/0/1643247705278?e=1699488000&v=beta&t=WNVQ8jIJuJ5nt1BH_AXLaHpLXsHmP0uOo6N8_E4NWIs',
  } as User;

  // if (!session) {
  //   redirect('/signin');
  // }

  return (
    <section>
      <SessionProvider session={session}>
        <Header user={user} />
        {children}
      </SessionProvider>
    </section>
  );
}
