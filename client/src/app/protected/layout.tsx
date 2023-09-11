import Header from '@/components/common/Header';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/providers/SessionProvider';
import { redirect } from 'next/navigation';
import { User } from '@/types/User';
import { authOptions } from '../api/auth/[...nextauth]/auth';

export default async function protectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <section>
      <SessionProvider session={session}>
        {session.user && <Header user={session.user as User} />}
        {children}
      </SessionProvider>
    </section>
  );
}
