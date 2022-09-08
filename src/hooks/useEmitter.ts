import { useCallback, useState } from 'react';
import useSocket from './useSocket';

interface EmitterState {
  isLoading: boolean;
}

declare type Emit<T> = (data: T) => Promise<any>;

function useEmitter<T>({ event }: { event: string }): [Emit<T>, EmitterState] {
  const socket = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const emit = useCallback<Emit<T>>(
    (data) => {
      setIsLoading(true);
      return new Promise((resolve) => {
        socket.emit(event, data, (res: any) => {
          setIsLoading(false);
          resolve(res);
        });
      });
    },
    [event],
  );

  return [emit, { isLoading }];
}

export default useEmitter;
