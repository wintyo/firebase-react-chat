import firebase from 'firebase/app';

// 必要な機能をimportする
import 'firebase/firestore';

import config from '../../../config/firebase';

firebase.initializeApp(config);

export const firestore = firebase.firestore;

export const db = firestore();

export default firebase;
