import PadelMateClerkProvider from '@app/PadelMateClerkProvider';
import PostHogPageView from '@app/PostHogPageView';
import { PHProvider } from '@app/providers';
import { SignedOut } from '@clerk/nextjs';
import Navbar from '@components/Navbar';
import SignInModal from '@components/SignInModal';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PadelMate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PadelMateClerkProvider>
      <html lang='en'>
        <head>
          <link
            rel='icon'
            href='/icons/favicon-16x16.png'
            type='image/x-icon'
            sizes='16x16'
          />
          <link
            rel='icon'
            href='/icons/favicon-32x32.png'
            type='image/x-icon'
            sizes='32x32'
          />

          {/* For iOS */}
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='black-translucent'
          />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-title' content='PadelMate' />
          <link
            rel='apple-touch-icon'
            sizes='57x57'
            href='icons/app-logo-1.jpg'
          />
          <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='icons/app-logo-1.jpg'
          />
          <link
            rel='apple-touch-icon'
            sizes='72x72'
            href='icons/app-logo-1.jpg'
          />
          <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='icons/app-logo-1.jpg'
          />
          <link
            rel='apple-touch-icon'
            sizes='60x60'
            href='icons/app-logo-1.jpg'
          />
          <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='icons/app-logo-1.jpg'
          />
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='icons/app-logo-1.jpg'
          />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='icons/app-logo-1.jpg'
          />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='#1d232a'
          ></meta>

          {/* For Android */}
          <meta name='theme-color' content='#1d232a' />
        </head>
        <body className={inter.className}>
          <PHProvider>
            <Navbar />
            <div className='pt-16'></div>
            <PostHogPageView />
            {children}
            <SignedOut>
              <SignInModal />
            </SignedOut>
          </PHProvider>
        </body>
      </html>
    </PadelMateClerkProvider>
  );
}
