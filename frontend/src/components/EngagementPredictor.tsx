import React, { useState, useEffect } from "react";

const EngagementPredictor = () => {
  const [engagement, setEngagement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate engagement score between 0 and 1
      setEngagement(Math.random());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>User Engagement Predictor</h3>
      <p>Predicted Engagement: {(engagement * 100).toFixed(1)}%</p>
    </div>
  );
};

export default EngagementPredictor;
