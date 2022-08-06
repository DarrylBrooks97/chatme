import { pusher } from '@clients/pusher';
import { PresenceChannel } from 'pusher-js';

const joinRoom = (channelName: string, fn: (t: any) => void) => {
  const channel = pusher.subscribe(`presence-cache-${channelName}`);
  return channel.bind('new-message', (data: any) => {
    fn(data);
  }) as PresenceChannel;
};

const leaveRoom = (channelName: string) => {
  pusher.unsubscribe(`presence-cache-${channelName}`);
};

export { joinRoom, leaveRoom };
