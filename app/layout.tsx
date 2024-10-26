import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../app/components/Header/index';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

import { ReactNode } from 'react';
import PageTransition from './components/Layout/PageTransition';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <PageTransition>
        {children}
        </PageTransition>
      </body>
    </html>
  )
}