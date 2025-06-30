'use client';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { BatteryCharging, Cpu, Activity } from 'lucide-react';

/* helpers */
const last = <T,>(v: T | T[]) => (Array.isArray(v) ? v.at(-1) : v);

function splitValue(raw: unknown): { num?: number; pretty: string } {
  if (raw == null) return { pretty: '—' };
  if (typeof raw === 'number') return { num: raw, pretty: `${raw}%` };

  const num = parseFloat(raw as string);
  return Number.isFinite(num)
    ? { num, pretty: (raw as string).trim() }
    : { pretty: (raw as string).trim() };
}

/* component */
export default function SystemVitals() {
  const { data, isError } = useQuery({
    queryKey: ['system-vitals'],
    queryFn: () => fetch('/api/system-vitals').then(r => r.json()),
    refetchInterval: 5_000,
  });

  if (isError) return <p className="text-red-500">⚠️ offline</p>;
  if (!data)    return <p className="animate-pulse opacity-50">…</p>;

  const cpu      = splitValue(last(data.cpu_load));
  const vram     = splitValue(last(data.vram_util));
  const netInMB  = last(data.net_in_mb);
  const netOutMB = last(data.net_out_mb);

  pushToBuf('_cpu',  cpu.num);
  pushToBuf('_vram', vram.num);

  return (
    <div className="space-y-2 text-sm">
      <div className="flex gap-4">
        <Stat icon={Cpu} label="CPU" v={cpu.pretty} />
        {netInMB != null && netOutMB != null && (
          <Stat icon={Activity} label="Net I/O" v={`${netInMB} / ${netOutMB} MB`} />
        )}
        {vram.pretty !== '—' && (
          <Stat icon={BatteryCharging} label="VRAM" v={vram.pretty} />
        )}
      </div>

      <Spark id="_cpu" stroke="#3b82f6" />
      <Spark id="_vram" stroke="#10b981" />

      <div className="text-xs text-gray-400 space-y-0.5">
        <div>🧠 Memory Used: {data.memory_used}</div>
        <div>💾 Token Rate: {data.token_throughput}</div>
        <div>⏱️ Latency: {data.latency}</div>
      </div>
    </div>
  );
}

/* pieces */
function Stat({ icon: Icon, label, v }: { icon: any; label: string; v: string }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <Icon size={14} className="opacity-60" />
      <span>{label}</span>
      <span className="ml-auto font-mono tabular-nums">{v}</span>
    </div>
  );
}

function Spark({ id, stroke }: { id: string; stroke: string }) {
  const buff: { ts: number; v: number }[] = (globalThis as any)[id] ?? [];

  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={[...buff]}>
        <Line type="monotone" dataKey="v" stroke={stroke} strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* util */
function pushToBuf(key: string, v?: number) {
  if (typeof v !== 'number') return;
  const buf: { ts: number; v: number }[] = (globalThis as any)[key] ??= [];
  buf.push({ ts: Date.now(), v });
  if (buf.length > 60) buf.shift();
}
