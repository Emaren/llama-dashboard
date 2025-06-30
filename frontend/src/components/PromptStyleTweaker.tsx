"use client";

import React, { useEffect, useState } from "react";

interface StyleSettings {
  tone: string;
  formality: string;
  useEmojis: boolean;
}

interface Props {
  settings?: StyleSettings; // made optional to avoid crash
  onChange: (newSettings: StyleSettings) => void;
}

const defaultSettings: StyleSettings = {
  tone: "",
  formality: "",
  useEmojis: false,
};

const PromptStyleTweaker: React.FC<Props> = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState<StyleSettings>(
    settings ?? defaultSettings
  );

  useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  const handleChange = (field: keyof StyleSettings, value: any) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
    onChange(updated);
  };

  return (
    <div>
      <h3>Prompt Style Tweaker</h3>
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
        Use Emojis:
        <input
          type="checkbox"
          checked={localSettings.useEmojis}
          onChange={(e) => handleChange("useEmojis", e.target.checked)}
        />
      </label>
    </div>
  );
};

export default PromptStyleTweaker;
