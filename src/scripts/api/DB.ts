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
}

export default new DB();
