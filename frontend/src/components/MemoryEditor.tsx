'use client';

import React, { useEffect, useState } from "react";

interface Memory {
  id: string;
  content: string;
}

const MemoryEditor: React.FC = () => {
  const [memories, setMemories] = useState<Memory[] | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    // Replace with real API logic later
    const dummyMemories: Memory[] = [
      { id: "1", content: "Attended strategy meeting" },
      { id: "2", content: "Updated dashboard UI" },
      { id: "3", content: "Refactored data pipeline" },
    ];
    setMemories(dummyMemories);
  }, []);

  if (!memories) {
    return <p>Loading memories...</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Memory Editor</h3>
      <ul className="list-disc pl-5 space-y-1">
        {memories.map((memory) => (
          <li key={memory.id}>
            {editId === memory.id ? (
              <input
                className="border px-2 py-1"
                defaultValue={memory.content}
              />
            ) : (
              memory.content
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoryEditor;
