import Header from '@/components/common/Header';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/providers/SessionProvider';
import { redirect } from 'next/navigation';
import { User } from '@/types/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export default async function ProtectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <section className='flex h-full flex-col'>
      <SessionProvider session={session}>
        {session.user && <Header user={session.user as User} />}
        <main className='flex-1'>{children}</main>
      </SessionProvider>
    </section>
  );
}
