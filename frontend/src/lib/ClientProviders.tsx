'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientProviders({ children }: { children: ReactNode }) {
  // one QueryClient per tab
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5_000,
        cacheTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  }));

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

