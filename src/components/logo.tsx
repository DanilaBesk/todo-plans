import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
});

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          alt="Logo"
          height={30}
          width={30}
          src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%20512%20512%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M189.5%2C207.1c7.2-46.3%2C30.8-89.3%2C66.5-120.3c89.5%2C77.9%2C90.9%2C214%2C7.9%2C294.1c14%2C12%2C28.6%2C21.6%2C49%2C30.7C422.1%2C293.7%2C396.8%2C103.7%2C258.8%2C19c-1.7-1.1-3.8-1.1-5.5%2C0c-76%2C46.7-119.6%2C127.4-122.1%2C210.7C148.8%2C220.2%2C168.3%2C212.5%2C189.5%2C207.1z%22%2F%3E%3Cpath%20d%3D%22M391.4%2C248c-0.6%2C21.8-4.1%2C41.8-9.9%2C62.2c36.3%2C29.3%2C61.4%2C70.7%2C70.5%2C116.4c-112.1%2C38.6-230.5-29-258.5-139.7c-16%2C5.3-35.3%2C15.4-50.9%2C27.3c47.4%2C152.1%2C223.7%2C226%2C366.6%2C148.6c1.8-1%2C2.8-2.8%2C2.8-4.8C510.2%2C376.2%2C467.1%2C295.1%2C391.4%2C248z%22%2F%3E%3Cpath%20d%3D%22M196.4%2C424.1c-42.8%2C16.6-91.4%2C17.9-136.4%2C2.5c22.2-112.8%2C137.7-185.9%2C250.6-153.4c3.6-16.9%2C4.7-37%2C2.3-57.5C154.3%2C179.8%2C3.5%2C298.6%2C0%2C458c-0.1%2C2%2C1%2C3.8%2C2.8%2C4.8c76.3%2C41.4%2C168.3%2C40.7%2C242.7%2C0.8C227.1%2C452.2%2C209.8%2C438.1%2C196.4%2C424.1z%22%2F%3E%3C%2Fsvg%3E"
        />
        <p
          className={cn(
            'text-lg text-neutral-700 pt-1.5',
            headingFont.className
          )}
        >
          Todo-Plans
        </p>
      </div>
    </Link>
  );
};

export { Logo };
