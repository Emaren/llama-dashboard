'use client';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

export default function CPUMemTrend() {
  const { data } = useQuery({
    queryKey: ['cpu-mem'],
    queryFn: () => fetch('/api/stats/system').then(r => r.json()),
    refetchInterval: 5_000,
  });

  const buf: { ts: number; cpu: number; mem: number }[] =
    (globalThis as any).__cpuMemBuff ??= [];

  /* tolerate either array or scalar shapes */
  const cpu = Array.isArray(data?.cpu) ? data.cpu.at(-1) : data?.cpu_pct;
  const mem = Array.isArray(data?.mem) ? data.mem.at(-1) : data?.mem_pct;

  if (typeof cpu === 'number' && typeof mem === 'number')
    buf.push({ ts: Date.now(), cpu, mem });
  if (buf.length > 60) buf.shift();

  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[...buf]}>
          <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="#3b82f633" />
          <Area type="monotone" dataKey="mem" stroke="#e11d48" fill="#e11d4833" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="text-xs text-center opacity-70">
        CPU {cpu ?? '…'} % • MEM {mem ?? '…'} %
      </div>
    </div>
  );
}
