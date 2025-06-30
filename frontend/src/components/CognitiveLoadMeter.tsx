import React, { useState, useEffect } from "react";

const CognitiveLoadMeter = () => {
  const [load, setLoad] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate cognitive load update
      setLoad(Math.min(100, Math.random() * 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Cognitive Load Meter</h2>
      <progress value={load} max={100} />
      <p>{load.toFixed(1)}%</p>
    </div>
  );
};

export default CognitiveLoadMeter;
