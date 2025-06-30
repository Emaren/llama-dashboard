import React, { useState } from "react";

interface Props {
  initialTone: string;
  initialBias: number;
  onToneChange: (tone: string) => void;
  onBiasChange: (bias: number) => void;
}

const ToneBiasAdjuster: React.FC<Props> = ({
  initialTone,
  initialBias,
  onToneChange,
  onBiasChange,
}) => {
  const [tone, setTone] = useState(initialTone);
  const [bias, setBias] = useState(initialBias);

  const handleToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTone(e.target.value);
    onToneChange(e.target.value);
  };

  const handleBiasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBias(val);
    onBiasChange(val);
  };

  return (
    <div>
      <h3>Tone & Bias Adjuster</h3>
      <label>
        Tone:
        <input type="text" value={tone} onChange={handleToneChange} />
      </label>
      <label>
        Bias Level:
        <input
          type="range"
          min={0}
          max={10}
          value={bias}
          onChange={handleBiasChange}
        />
      </label>
      <p>Current Bias: {bias}</p>
    </div>
  );
};

export default ToneBiasAdjuster;
