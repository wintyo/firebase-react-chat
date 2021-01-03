import React from 'react';
import { useHistory } from 'react-router-dom';

import { db } from '~/firebase';

export default () => {
  const history = useHistory();

  return (
    <div>
      <div>top</div>
      <button
        onClick={() => {
          history.push('/page1');
        }}
      >
        page1
      </button>
      <button
        onClick={() => {
          db.collection('test')
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                console.log(doc);
                console.log(doc.id, '=>', doc.data());
              });
            });
        }}
      >
        fetch
      </button>
      <button
        onClick={() => {
          db.collection('test').add({
            value: 'fuga',
          });
        }}
      >
        add
      </button>
    </div>
  );
};
