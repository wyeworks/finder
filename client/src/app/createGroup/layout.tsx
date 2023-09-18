import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/providers/SessionProvider';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return (
    <section>
      <SessionProvider session={session}>{children}</SessionProvider>
    </section>
  );
}
