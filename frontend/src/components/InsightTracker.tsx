import React, { useState } from "react";

const InsightTracker = () => {
  const [insights, setInsights] = useState<string[]>([
    "System initialized.",
    "User engagement rising.",
    "Memory pruning active.",
  ]);

  return (
    <div>
      <h3>Insight Tracker</h3>
      <ul>
        {insights.map((insight, idx) => (
          <li key={idx}>{insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsightTracker;
