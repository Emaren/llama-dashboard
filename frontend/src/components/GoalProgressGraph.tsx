'use client';

import React, { useEffect, useState } from 'react';

interface Goal {
  id: string;
  name: string;
  completed: number;
  total: number;
}

const GoalProgressGraph: React.FC = () => {
  const [goals, setGoals] = useState<Goal[] | null>(null);

  useEffect(() => {
    // Replace this with real data fetching logic
    const dummyGoals: Goal[] = [
      { id: '1', name: 'Learn React', completed: 4, total: 10 },
      { id: '2', name: 'Build LLM Dashboard', completed: 7, total: 10 },
    ];
    setGoals(dummyGoals);
  }, []);

  if (!goals) {
    return <p>Loading goals...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Goal Progress</h2>
      {goals.map((goal) => {
        const progressPercent =
          goal.total > 0 ? (goal.completed / goal.total) * 100 : 0;

        return (
          <div key={goal.id} className="mb-4">
            <p className="font-semibold">{goal.name}</p>
            <div className="h-4 bg-gray-300 rounded">
              <div
                className="h-4 bg-green-500 rounded"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p>{progressPercent.toFixed(1)}% complete</p>
          </div>
        );
      })}
    </div>
  );
};

export default GoalProgressGraph;
