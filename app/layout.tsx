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
    <html lang='en'>
      <head>
        {/* For iOS */}
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='apple-mobile-web-app-title' content='PadelMate' />
        <link rel='apple-touch-icon' sizes='57x57' href='app-logo-1.jpg' />
        <link rel='apple-touch-icon' sizes='114x114' href='app-logo-1.jpg' />
        <link rel='apple-touch-icon' sizes='72x72' href='app-logo-1.jpg' />
        <link rel='apple-touch-icon' sizes='144x144' href='app-logo-1.jpg' />
        <link rel='apple-touch-icon' sizes='60x60' href='app-logo-1.jpg' />
        <link rel='apple-touch-icon' sizes='120x120' href='app-logo-1.jpg' />
        <link rel='apple-touch-icon' sizes='76x76' href='app-logo-1.jpg' />
        <link rel='apple-touch-icon' sizes='152x152' href='app-logo-1.jpg' />

        {/* For Android */}
        <meta name='theme-color' content='#1d232a' />
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
