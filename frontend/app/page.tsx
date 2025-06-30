'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AgentChatTile } from '@/components/AgentChatTile';

import LatencySpark   from '@/components/LatencySpark';
import TokenRateSpark from '@/components/TokenRateSpark';
import CPUMemTrend    from '@/components/CPUMemTrend';
import AgentHeartbeat from '@/components/AgentHeartbeat';
import ContextUsage from '@/components/ContextUsage';

// Fix: ContextScopeMeter comes from src/
const ContextScopeMeter = dynamic(() => import('@/components/ContextScopeMeter'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">🧠 Llama Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ✅ Agent chat tile */}
        <AgentChatTile />

        {/* 🔁 Manually ordered tiles */}
        <Dynamic name="AgentDashboard" />
        <Dynamic name="BiasVectorViewer" />
        <Dynamic name="CognitiveLoadMeter" />
        <ContextScopeMeter />
        <Dynamic name="DreamJournal" />
        <Dynamic name="EngagementPredictor" />
        <Dynamic name="GoalProgressGraph" />
        <Dynamic name="InsightTracker" />
        <Dynamic name="MemoryEditor" />
        <Dynamic name="MemoryTagEditor" />
        <Dynamic name="MessageRankerView" />
        <Dynamic name="PersonaTuner" />
        <Dynamic name="ProjectHealthBar" />
        <Dynamic name="PromptStyleTweaker" />
        <Dynamic name="QueryTypeLabel" />
        <Dynamic name="SelfReflectionViewer" />
        <Dynamic name="SessionHistory" />
        <Dynamic name="ToneBiasAdjuster" />
        <Dynamic name="SystemVitals" />

        {/* ── new live metrics tiles ─────────────────────── */}
        <LatencySpark />
        <TokenRateSpark />
        <CPUMemTrend />

        {/* 🫀 Agent Heartbeat (visual match) */}
        <div className="col-span-1">
          <AgentHeartbeat />
        </div>

        {/* 📊 Context Usage Bar (full-width) */}
        <div className="col-span-3">
          <ContextUsage usedTokens={8081} totalTokens={16000} />
        </div>
      </div>
    </main>
  );
}

// ⬇️ Dynamic helper to keep it clean
function Dynamic({ name }: { name: string }) {
  const Comp = dynamic(() => import(`@/components/${name}`), { ssr: false });
  return (
    <div className="p-4 bg-zinc-900 rounded-xl">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <Comp />
    </div>
  );
}
