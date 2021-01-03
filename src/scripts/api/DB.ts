import { db } from '~/firebase';

class DB {
  /**
   * 部屋の作成
   * @param roomName - 部屋名
   */
  async createRoom(roomName: string) {
    await db.collection('rooms').add({
      roomName,
    });
  }

  /**
   * 部屋一覧の取得
   */
  async fetchRooms() {
    const snapshot = await db.collection('rooms').get();
    const data: any[] = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  /**
   * メッセージの送信
   * @param roomId - ルームID
   * @param name - 名前
   * @param message - メッセージ
   */
  async sendMessage(roomId: string, name: string, message: string) {
    await db.collection(`rooms/${roomId}/messages`).add({
      name,
      message,
    });
  }

  /**
   * メッセージ一覧の取得
   * @param roomId - ルームID
   */
  async fetchMessages(roomId: string) {
    const snapshot = await db.collection(`rooms/${roomId}/messages`).get();
    const data: any[] = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }
}

export default new DB();
