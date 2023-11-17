import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { cn } from '../lib/utils';

const firaCode = Fira_Code({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo-Plans',
  description: 'Planning your life with todo-plans app',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn('bg-rose-500', firaCode.className)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
