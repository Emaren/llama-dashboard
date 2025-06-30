import React, { useState } from "react";

const DreamJournal = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addEntry = () => {
    if (input.trim()) {
      setEntries([...entries, input.trim()]);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Dream Journal</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write your introspective thoughts here..."
      />
      <button onClick={addEntry}>Add Entry</button>
      <ul>
        {entries.map((entry, idx) => (
          <li key={idx}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default DreamJournal;
