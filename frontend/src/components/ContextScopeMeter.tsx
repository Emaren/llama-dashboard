// src/components/ContextScopeMeter.tsx

'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  maxTokens: number;
  currentTokens: number;
}

interface ApiResponse {
  tokensUsed: number;
  tokensLimit: number;
  percent: number;
}

const ContextScopeMeter: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/context')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <div className="text-red-500">⚠️ Failed to load context usage</div>;
  }

  if (!data) {
    return <div>Loading context usage…</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">Context Scope Meter</h3>
      <progress value={data.tokensUsed} max={data.tokensLimit} className="w-full" />
      <p>
        {data.tokensUsed} / {data.tokensLimit} tokens used ({data.percent}%)
      </p>
    </div>
  );
};

export default ContextScopeMeter;
