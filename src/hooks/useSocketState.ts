import { useEffect, useState } from 'react';
import useSocket from './useSocket';

function useSocketState() {
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return { isConnected };
}

export default useSocketState;
