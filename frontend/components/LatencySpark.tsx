'use client';
import { useLiveStats } from '../hooks/useLiveStats';
import { SparkLine }   from './charts/SparkLine';
export default function LatencySpark() {
  const d = useLiveStats<{lat_ms:number[]}>('/api/stats/llm');
  if(!d) return <div className="tile">Loading…</div>;
  const p90 = [...d.lat_ms].sort((a,b)=>a-b)[~~(d.lat_ms.length*0.9)];
  return (
    <div className="tile"><h2>⚡ LLM Latency</h2>
      <SparkLine data={d.lat_ms}/>
      <p className="text-xs text-gray-400">p90&nbsp;{p90.toFixed(2)} ms</p>
    </div>);
}
