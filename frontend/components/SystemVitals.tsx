// frontend/components/SystemVitals.tsx
'use client';
import React, { useEffect, useState } from "react";

interface Vitals {
  memory_used: string;
  cpu_load: string;
  token_throughput: string;
  latency: string;
}

const SystemVitals: React.FC = () => {
  const [vitals, setVitals] = useState<Vitals | null>(null);

  useEffect(() => {
    fetch("http://157.180.114.124:8005/api/system-vitals")
      .then(res => res.json())
      .then(data => setVitals(data))
      .catch(err => console.error("Failed to fetch vitals", err));
  }, []);

  if (!vitals) {
    return <div className="tile">Loading system vitals...</div>;
  }

  return (
    <div className="tile">
      <h2>🧭 System Vitals</h2>
      <ul>
        <li>🧠 Memory Used: {vitals.memory_used}</li>
        <li>💻 CPU Load: {vitals.cpu_load}</li>
        <li>🔁 Token Rate: {vitals.token_throughput}</li>
        <li>⏱️ Latency: {vitals.latency}</li>
      </ul>
    </div>
  );
};

export default SystemVitals;
