import Pusher from 'pusher-js';
import { createContext } from 'react';

// create a context for the pusher client
export const PusherContext = createContext({} as Pusher);

export const PusherProvider = ({ children }: { children: React.ReactNode }) => {
  const pusher = new Pusher((process.env.PUSHER_API_KEY as string) ?? '3ae509284984f174da5c', {
    cluster: (process.env.PUSHER_CLUSTER as string) ?? 'us2',
  });

  return <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>;
};
