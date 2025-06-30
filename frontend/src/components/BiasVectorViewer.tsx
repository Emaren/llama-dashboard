'use client';

import React, { useEffect, useState } from "react";

interface BiasVector {
  id: string;
  name: string;
  magnitude: number;
}

const BiasVectorViewer: React.FC = () => {
  const [vectors, setVectors] = useState<BiasVector[] | null>(null);

  useEffect(() => {
    // Replace this with real logic later
    const dummyVectors: BiasVector[] = [
      { id: "1", name: "Recency Bias", magnitude: 0.75 },
      { id: "2", name: "Confirmation Bias", magnitude: 0.63 },
      { id: "3", name: "Anchoring Bias", magnitude: 0.52 },
    ];
    setVectors(dummyVectors);
  }, []);

  if (!vectors) {
    return <p>Loading bias vectors...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Bias Vector Viewer</h2>
      <ul className="list-disc pl-5 space-y-1">
        {vectors.map((vector) => (
          <li key={vector.id}>
            {vector.name}: {vector.magnitude.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BiasVectorViewer;
