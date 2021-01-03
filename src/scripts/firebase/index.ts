import firebase from 'firebase/app';

// 必要な機能をimportする
import 'firebase/database';
import 'firebase/firestore';

import config from '../../../config/firebase';

firebase.initializeApp(config);

export const database = firebase.database();

export const db = firebase.firestore();

export default firebase;
