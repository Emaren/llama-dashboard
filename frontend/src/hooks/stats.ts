import { useQuery } from '@tanstack/react-query';

/** tiny helper */
const fetcher = (url: string) => fetch(url).then(r => r.json());

/* ───────── System Extra  ─────────────────────────────── */
export const useStatsExtra = () =>
  useQuery({
    queryKey: ['stats-extra'],
    queryFn : () => fetcher('/api/stats/system-extra'),
    refetchInterval: 5_000,          // 5 s
  });

/* ───────── Ops  ──────────────────────────────────────── */
export const useStatsOps = () =>
  useQuery({
    queryKey: ['stats-ops'],
    queryFn : () => fetcher('/api/stats/ops'),
    refetchInterval: 5_000,
  });

/* ───────── Data  ─────────────────────────────────────── */
export const useStatsData = () =>
  useQuery({
    queryKey: ['stats-data'],
    queryFn : () => fetcher('/api/stats/data'),
    refetchInterval: 5_000,
  });
