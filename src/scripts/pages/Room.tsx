import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFirestoreMessage } from '~/hooks/firestoreMessage';
import { useDatabasePresenceUsers } from '~/hooks/databasePresence';

export default () => {
  const { roomId } = useParams<any>();
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const [messages, updateMessages] = useFirestoreMessage(roomId);
  const [users, updateUser] = useDatabasePresenceUsers(roomId);

  return (
    <div>
      Room {roomId}
      <div>接続中ユーザー: {JSON.stringify(users)}</div>
      <div>
        <input
          type="text"
          value={name}
          placeholder="名前"
          onChange={(event) => {
            setName(event.currentTarget.value);
            updateUser.update(event.currentTarget.value);
          }}
        />
        <br />
        <input
          type="text"
          value={text}
          placeholder="メッセージ"
          onChange={(event) => {
            setText(event.currentTarget.value);
          }}
        />
        <br />
        <button
          onClick={async () => {
            await updateMessages.add(name, text);
            setText('');
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
            text: {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
