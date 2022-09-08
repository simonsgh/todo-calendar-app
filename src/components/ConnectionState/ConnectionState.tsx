import React from 'react';

import useSocket from '../../hooks/useSocket';
import useSocketState from '../../hooks/useSocketState';

import { ReactComponent as EventBusyIcon } from '../../assets/svg/EventBusy.svg';
import { ReactComponent as EventAvailableIcon } from '../../assets/svg/EventAvailable.svg';

function ConnectionState() {
  const socket = useSocket();
  const { isConnected } = useSocketState();
  if (isConnected) {
    const handleDisconnect = () => socket.disconnect();
    return (
      <EventAvailableIcon
        title="Socket connected"
        className="inline-block h-5 w-5 align-middle fill-green-500 cursor-pointer"
        onClick={handleDisconnect}
      />
    );
  }

  const handleConnect = () => socket.connect();
  return (
    <EventBusyIcon
      title="Socket disconnected"
      className="inline-block h-5 w-5 align-middle fill-red-500 cursor-pointer"
      onClick={handleConnect}
    />
  );
}

export default ConnectionState;
