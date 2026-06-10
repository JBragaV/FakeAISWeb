import type { Metadata } from 'next';
import { Geist, Geist_Mono, DM_Sans, Share_Tech_Mono } from 'next/font/google';
import './reset.css';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech-mono',
});

export const metadata: Metadata = {
  title: 'AISJoWeb',
  description: 'Minha Fake AISWeb de estudos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${shareTechMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
