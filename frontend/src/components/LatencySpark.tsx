'use client';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

export default function LatencySpark() {
  const { data } = useQuery({
    queryKey: ['latency'],
    queryFn: () => fetch('/api/stats/llm').then(r => r.json()),
    refetchInterval: 5_000,
  });

  /* rolling 60-sample buffer lives on window */
  const buf: { ts: number; v: number }[] =
    (globalThis as any).__tokBuff ??= [];

  /* endpoint sometimes returns an array (`lat_ms`) and other times a scalar */
  const rate = Array.isArray(data?.lat_ms) ? data.lat_ms.at(-1)
                                          : data?.latency_ms;

  if (typeof rate === 'number') buf.push({ ts: Date.now(), v: rate });
  if (buf.length > 60) buf.shift();

  return (
    <div className="w-full h-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={[...buf]}>
          <Line
            type="monotone"
            dataKey="v"
            stroke="#38bdf8"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="text-xs text-center mt-1 opacity-70">
        Latency (ms) – {rate ?? '…'}
      </div>
    </div>
  );
}
