// src/lib/ReactQueryProvider.tsx
'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';

/**
 * Provides a QueryClient per browser tab with sensible defaults for queries and mutations.
 */
export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          console.error('React Query error:', error);
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          console.error('React Mutation error:', error);
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 5 * 1000,           // 5s freshness
          retry: 1,                      // one retry on failure
          refetchOnWindowFocus: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
