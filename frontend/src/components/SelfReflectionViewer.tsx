'use client';

import React from "react";

interface Reflection {
  timestamp: string;
  content: string;
}

interface Props {
  reflections?: Reflection[]; // Optional to prevent crash
}

const SelfReflectionViewer: React.FC<Props> = ({ reflections = [] }) => {
  return (
    <div>
      <h3>Self Reflection Log</h3>
      <ul>
        {reflections.map((r, idx) => (
          <li key={idx}>
            <em>{new Date(r.timestamp).toLocaleString()}</em>: {r.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelfReflectionViewer;
