import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DB from '~/api/DB';

export default () => {
  const { roomId } = useParams<any>();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await DB.fetchMessages(roomId);
      console.log(data);
      setMessages(data);
    })();
  }, []);

  return (
    <div>
      Room {roomId}
      <div>
        <input
          type="text"
          value={name}
          placeholder="名前"
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        />
        <br />
        <input
          type="text"
          value={message}
          placeholder="メッセージ"
          onChange={(event) => {
            setMessage(event.currentTarget.value);
          }}
        />
        <br />
        <button
          onClick={async () => {
            await DB.sendMessage(roomId, name, message);
            setMessage('');
          }}
        >
          送信
        </button>
      </div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            name: {message.name}
            <br />
            message: {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
};
