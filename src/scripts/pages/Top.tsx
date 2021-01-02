import React from 'react';
import { useHistory } from 'react-router-dom';

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
    </div>
  );
};
