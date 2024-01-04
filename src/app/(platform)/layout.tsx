import { CardModalProvider } from '@/components/providers/card-modal-provider';
import { QueryClientProvider } from '@/components/providers/query-client-provider';
import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from 'sonner';

type Props = { children: React.ReactNode };

const PlayformLayout = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <QueryClientProvider>
        <Toaster />
        <CardModalProvider />
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default PlayformLayout;
