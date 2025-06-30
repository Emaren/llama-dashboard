'use client';

import React, { useEffect, useState } from 'react';

interface Tag {
  id: string;
  name: string;
}

const MemoryTagEditor: React.FC = () => {
  const [tags, setTags] = useState<Tag[] | null>(null);

  useEffect(() => {
    // Replace with real data fetching
    const dummyTags: Tag[] = [
      { id: '1', name: 'AI' },
      { id: '2', name: 'LLM' },
      { id: '3', name: 'Frontend' },
    ];
    setTags(dummyTags);
  }, []);

  const addTag = () => {
    if (!tags) return;
    const newTag: Tag = {
      id: (tags.length + 1).toString(),
      name: `Tag ${tags.length + 1}`,
    };
    setTags([...tags, newTag]);
  };

  const onRemoveTag = (id: string) => {
    if (!tags) return;
    setTags(tags.filter(tag => tag.id !== id));
  };

  if (!tags) {
    return <p>Loading tags...</p>;
  }

  return (
    <div>
      <button onClick={addTag}>Add Tag</button>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>
            {tag.name}{' '}
            <button onClick={() => onRemoveTag(tag.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoryTagEditor;
