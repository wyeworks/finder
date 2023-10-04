import Footer from '@/components/common/Footer';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finder',
  description: 'Finder',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <main className='grid flex-1 bg-gray-50'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
