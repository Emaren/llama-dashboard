'use client';

import React from 'react';

interface Message {
  id: string;
  content: string;
  score: number;
}

interface Props {
  messages?: Message[]; // Optional in case it's not passed yet
}

const MessageRankerView: React.FC<Props> = ({ messages = [] }) => {
  const sortedMessages = [...messages].sort((a, b) => b.score - a.score);

  return (
    <div>
      <h3>Message Ranker</h3>
      <ul>
        {sortedMessages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.score}:</strong> {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageRankerView;
