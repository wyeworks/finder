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
      <head>
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
        />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <main className='grid flex-1 bg-gray-50'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
