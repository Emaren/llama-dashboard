'use client';

import React from "react";

interface Props {
  healthPercent?: number; // optional to prevent runtime crash
}

const ProjectHealthBar: React.FC<Props> = ({ healthPercent = 0 }) => {
  const clampedPercent = Math.min(Math.max(healthPercent, 0), 100); // Clamp between 0 and 100

  return (
    <div>
      <h3>Project Health</h3>
      <div style={{ backgroundColor: "#0000FF", width: "100%", height: "25px" }}>
        <div
          style={{
            width: `${clampedPercent}%`,
            height: "100%",
            backgroundColor: clampedPercent > 70 ? "#4caf50" : "#f44336",
            transition: "width 0.5s ease-in-out"
          }}
        />
      </div>
      <p>{clampedPercent.toFixed(1)}% Healthy</p>
    </div>
  );
};

export default ProjectHealthBar;
