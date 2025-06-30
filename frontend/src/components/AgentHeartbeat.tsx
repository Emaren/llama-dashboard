'use client';

import React, { useEffect, useState } from 'react';

const gaugeNames = ['GoalOptimizer', 'MemoryManager', 'SessionMonitor'];

const Gauge = ({ label, percent }: { label: string; percent: number }) => {
  return (
    <div className="flex flex-col items-center mx-4">
      <svg width="50" height="50" viewBox="0 0 36 36" className="mb-1 animate-pulse">
        <path
          className="text-gray-700"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-green-500"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`${percent}, 100`}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="text-sm text-white">{label}</div>
    </div>
  );
};

export default function AgentHeartbeat() {
  const [values, setValues] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const fetchHeartbeat = () => {
      fetch('/api/agents/health')
        .then((res) => res.json())
        .then((data) => {
          const now = Date.now() / 1000;
          const beatMap: Record<string, number> = {};

          (data || []).forEach((agent: any) => {
            const diff = now - agent.ts;
            beatMap[agent.id] = Math.max(0, 100 - diff * 20);
          });

          const percents = gaugeNames.map((name) => beatMap[name] || 0);
          setValues(percents);
        })
        .catch(() => setValues([0, 0, 0]));
    };

    fetchHeartbeat();
    const interval = setInterval(fetchHeartbeat, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-black rounded-lg shadow-lg text-white">
      <h2 className="text-md font-semibold mb-2">🫀 Agent Heartbeat</h2>
      <div className="flex justify-center space-x-4">
        {gaugeNames.map((name, idx) => (
          <Gauge key={name} label={name} percent={values[idx]} />
        ))}
      </div>
    </div>
  );
}
