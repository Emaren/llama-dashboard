// src/components/TokenStatsTile.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

/* ──────────── types ──────────── */
interface GlobalTokenStats {
  tokens_used:   number;
  tokens_total:  number;
  percentage:    number;
}

interface ChatTokenStats {
  model:            string | null;
  prompt_tokens:    number;
  completion_tokens:number;
  total_tokens:     number;
  cost_usd:         number;
}

/* ──────────── helpers ──────────── */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

const fmtNum = (n: unknown) =>
  typeof n === 'number' && isFinite(n) ? n.toLocaleString() : '—';
const fmtUsd = (n: unknown) =>
  typeof n === 'number' && isFinite(n) ? `$${n.toFixed(4)}` : '—';

/* ──────────── component ──────────── */
export default function TokenStatsTile() {
  const {
    data: globalStats,
    isLoading: gLoading,
    error: gError,
  } = useQuery<GlobalTokenStats>({
    queryKey:        ['globalStats'],
    queryFn:         () => fetch(`${API_BASE}/api/chat/stats/tokens`).then(r => r.json()),
    refetchInterval: 10_000,  // poll every 10s
    refetchOnMount:  true,    // refetch on each mount
  });

  const {
    data: chatStats,
    isLoading: cLoading,
    error: cError,
  } = useQuery<ChatTokenStats>({
    queryKey:        ['chatStats'],
    queryFn:         () => fetch(`${API_BASE}/api/chat/stats/last`).then(r => r.json()),
    retry:           false,
    refetchInterval: 10_000,  // poll every 10s
    refetchOnMount:  true,    // refetch on each mount
  });

  if (gLoading || cLoading) {
    return (
      <div className="p-4 bg-zinc-800 rounded-xl text-gray-400">
        Loading Token Usage…
      </div>
    );
  }

  if (gError || cError) {
    return (
      <div className="p-4 bg-red-900/40 rounded-xl text-red-300">
        Failed to load token stats.
      </div>
    );
  }

  return (
    <div className="p-4 bg-zinc-900 rounded-xl shadow-lg text-white space-y-4">
      <h3 className="text-xl font-semibold">🎯 Token Usage</h3>

      {/* Overall quota */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Used / Limit:</span>
          <span>
            {fmtNum(globalStats!.tokens_used)} / {fmtNum(globalStats!.tokens_total)}
          </span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-yellow-400"
            style={{ width: `${globalStats!.percentage}%` }}
          />
        </div>
      </div>

      {/* Last message */}
      <div className="space-y-1 text-sm text-gray-300">
        <div className="font-semibold text-white">Last Message</div>
        <div>Model: {chatStats?.model ?? '—'}</div>
        <div>Prompt: {fmtNum(chatStats?.prompt_tokens)}</div>
        <div>Completion: {fmtNum(chatStats?.completion_tokens)}</div>
        <div>Total: {fmtNum(chatStats?.total_tokens)}</div>
        <div className="font-semibold text-green-400">
          Cost: {fmtUsd(chatStats?.cost_usd)}
        </div>
      </div>
    </div>
  );
}
