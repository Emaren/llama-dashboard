'use client';
import { useLiveStats } from '../hooks/useLiveStats';
import { SparkLine }   from './charts/SparkLine';
export default function TokenRateSpark() {
  const d = useLiveStats<{tok_s:number[]}>('/api/stats/llm');
  return (
    <div className="tile"><h2>🔁 Tokens / s</h2>
      {d ? <SparkLine data={d.tok_s} stroke="#3b82f6"/> : 'Loading…'}
    </div>);
}
