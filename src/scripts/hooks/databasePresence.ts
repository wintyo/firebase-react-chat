import { useEffect, useState, useRef } from 'react';

import * as firebase from 'firebase';
import { database } from '~/firebase';

interface Functions {
  update: (name: string) => void;
}

/**
 * 接続状態を管理する
 * @param roomId - ルームID
 */
export function useDatabasePresenceUsers(roomId: string): [any[], Functions] {
  const [users, setUsers] = useState<Array<string>>([]);

  const userRefByUseRef = useRef<firebase.default.database.Reference | null>(null);
  useEffect(() => {
    const presenceUsersRef = database.ref(`presence/${roomId}`);
    presenceUsersRef.on('value', (snapshot) => {
      const data: Array<string> = [];
      snapshot.forEach((doc) => {
        data.push(doc.val());
      });
      setUsers(data);
    });

    // ユーザの追加をする
    const userRef = presenceUsersRef.push('').ref;
    userRefByUseRef.current = userRef;
    const onDisconnectRef = userRef.onDisconnect();
    onDisconnectRef.remove();

    return () => {
      console.log('destroy');
      userRef.remove();
      onDisconnectRef.cancel();
      presenceUsersRef.off('value');
    };
  }, []);

  return [
    users,
    {
      update: (name) => {
        if (userRefByUseRef.current == null) {
          return;
        }
        userRefByUseRef.current.set(name);
      },
    },
  ];
}
