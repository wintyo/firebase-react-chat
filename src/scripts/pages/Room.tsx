import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { roomId } = useParams<any>();

  return <div>Room {roomId}</div>;
};
