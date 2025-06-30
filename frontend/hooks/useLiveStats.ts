'use client';
import { useEffect, useState } from 'react';

export function useLiveStats<T>(endpoint: string, interval = 1000) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    let mounted = true;
    async function run() {
      try {
        const r = await fetch(endpoint);
        if (!r.ok) throw new Error();
        const j = await r.json();
        if (mounted) setData(j);
      } catch {}
    }
    run(); const id = setInterval(run, interval);
    return () => { mounted = false; clearInterval(id); };
  }, [endpoint, interval]);
  return data;
}
