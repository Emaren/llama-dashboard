"use client";

import React, { useEffect, useState } from "react";

interface PersonaSettings {
  tone: string;
  formality: string;
  biasLevel: number;
}

interface Props {
  settings?: PersonaSettings; // Optional to avoid crashing if undefined
  onChange: (newSettings: PersonaSettings) => void;
}

const defaultSettings: PersonaSettings = {
  tone: "",
  formality: "",
  biasLevel: 5,
};

const PersonaTuner: React.FC<Props> = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState<PersonaSettings>(
    settings ?? defaultSettings
  );

  useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  const handleChange = (field: keyof PersonaSettings, value: any) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
    onChange(updated);
  };

  return (
    <div>
      <h3>Persona Tuner</h3>
      <label>
        Tone:
        <input
          type="text"
          value={localSettings.tone}
          onChange={(e) => handleChange("tone", e.target.value)}
        />
      </label>
      <label>
        Formality:
        <input
          type="text"
          value={localSettings.formality}
          onChange={(e) => handleChange("formality", e.target.value)}
        />
      </label>
      <label>
        Bias Level:
        <input
          type="number"
          value={localSettings.biasLevel}
          min={0}
          max={10}
          onChange={(e) => handleChange("biasLevel", Number(e.target.value))}
        />
      </label>
    </div>
  );
};

export default PersonaTuner;
