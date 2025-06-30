'use client';
import React from 'react';

/** Very-lightweight progress bar (0–100) */
export function Progress({ value = 0 }: { value?: number }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="h-2 w-full rounded bg-zinc-800 overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
