import io from 'socket.io-client';
import { socketURI } from '../utils/environment';

const socket = io(socketURI, { transports: ['websocket'] });

function useSocket() {
  return socket;
}

export default useSocket;
