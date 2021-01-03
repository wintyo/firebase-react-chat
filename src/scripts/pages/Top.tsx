import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DB from '~/api/DB';

export default () => {
  const history = useHistory();
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await DB.fetchRooms();
      setRooms(data);
    })();
  }, []);

  return (
    <div>
      <h1>チャットアプリトップ</h1>
      <div>
        <input
          type="text"
          placeholder="ルーム名"
          value={roomName}
          onChange={(event) => {
            setRoomName(event.currentTarget.value);
          }}
        />
        <button
          onClick={async () => {
            await DB.createRoom(roomName);
          }}
        >
          作成
        </button>
      </div>
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => {
              history.push(`/room/${room.id}`);
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            <div>
              ID: {room.id}
              <br />
              Name: {room.roomName}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
