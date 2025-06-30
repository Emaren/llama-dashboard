'use client';
import { useLiveStats } from '../hooks/useLiveStats';
import { SparkLine }   from './charts/SparkLine';
export default function CPUMemTrend() {
  const d = useLiveStats<{cpu:number[];mem:number[]}>('/api/stats/system');
  return (
    <div className="tile"><h2>🖥️ CPU / Mem (%)</h2>
     {d ? <>
       <SparkLine data={d.cpu} stroke="#facc15"/>
       <SparkLine data={d.mem} stroke="#ef4444"/>
     </> : 'Loading…'}
    </div>);
}
