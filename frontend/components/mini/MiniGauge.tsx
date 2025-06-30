'use client';
import React from 'react';
interface P { value: number; label: string; size?: number; color?: string; }
export const MiniGauge: React.FC<P> = ({ value, label, size = 60, color = '#22c55e' }) => {
  const r = size / 2 - 6, c = 2 * Math.PI * r, off = c * (1 - value / 100);
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="#333" strokeWidth="6" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="6"
                strokeDasharray={c} strokeDashoffset={off}
                strokeLinecap="round" fill="none" />
      </svg>
      <span className="text-xs text-gray-300">{label}</span>
    </div>
  );
};
