'use client';

import React from 'react';

type Props = {
  usedTokens: number;
  totalTokens: number;
};

export default function ContextUsage({ usedTokens, totalTokens }: Props) {
  const percent = ((usedTokens / totalTokens) * 100).toFixed(1);

  return (
    <div className="p-4 bg-black rounded-lg shadow-lg text-white w-full">
      <h2 className="text-md font-semibold mb-2">📊 Context Usage</h2>
      <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
        <div
          className="bg-cyan-500 h-4"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-300 mt-1">
        {usedTokens} / {totalTokens} tokens ({percent}%)
      </div>
    </div>
  );
}
