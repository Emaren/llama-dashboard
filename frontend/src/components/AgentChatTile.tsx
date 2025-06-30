// frontend/src/components/AgentChatTile.tsx
"use client";

import React, { useEffect, useState } from "react";

interface AgentMessage {
  agent: string;
  timestamp: string;
  message: string;
}

export const AgentChatTile: React.FC = () => {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [error, setError] = useState(false);

  const devMode = false;
  const wsURL = devMode
    ? "ws://localhost:8000/logs/agent-events"
    : "wss://llama.aoe2hdbets.com/logs/agent-events";

  useEffect(() => {
    const ws = new WebSocket(wsURL);
    console.log("🧪 WS opening...");

    ws.onopen = () => {
      console.log("✅ WS connected:", wsURL);
    };

    ws.onmessage = (event) => {
      console.log("💬 WS received:", event.data);
      try {
        const data = JSON.parse(event.data);
        const newMessage: AgentMessage = {
          agent: data.agent || "UnknownAgent",
          timestamp: new Date(data.timestamp || Date.now()).toLocaleTimeString(),
          message: data.message || "[No message]",
        };
        setMessages((prev) => [newMessage, ...prev].slice(0, 3));
      } catch (err) {
        console.error("❌ Failed to parse message:", err);
      }
    };

    ws.onclose = (event) => {
      console.warn("⚠️ WS closed", event);
      setError(true);
    };

    return () => {
      console.log("❌ WS cleanup (unmounting)");
      ws.close();
    };
  }, [wsURL]);

  return (
    <div className="p-4 bg-zinc-900 rounded-xl">
      <h2 className="text-xl font-semibold mb-2">🧠 Agent Chat</h2>
      <div className="space-y-2 text-sm min-h-[4rem]">
        {error && (
          <div className="text-red-500">⚠️ Failed to connect to live agent feed</div>
        )}
        {messages.length === 0 && !error && (
          <div className="text-gray-400">Waiting for agent activity...</div>
        )}
        {messages.map((m, idx) => (
          <div key={idx}>
            <strong>{m.agent}</strong> [{m.timestamp}]: {m.message}
          </div>
        ))}
      </div>
    </div>
  );
};
