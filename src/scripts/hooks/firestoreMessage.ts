import { useEffect, useState } from 'react';

import { db } from '~/firebase';

interface Functions {
  add: (name: string, text: string) => Promise<void>;
}

export function useFirestoreMessage(roomId: string): [any[], Functions] {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = db.collection(`rooms/${roomId}/messages`).onSnapshot((snapshot) => {
      const data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setMessages(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return [
    messages,
    {
      add: async (name: string, text: string) => {
        await db.collection(`rooms/${roomId}/messages`).add({
          name,
          text,
        });
      },
    },
  ];
}
