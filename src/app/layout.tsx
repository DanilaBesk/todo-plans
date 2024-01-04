import type { Metadata } from 'next';
import './globals.css';
import { appConfig } from '../../config/app';

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  icons: [
    {
      url: '/app-logo.svg',
      href: '/app-logo.svg',
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
