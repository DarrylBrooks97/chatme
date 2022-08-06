import { pusher } from '@clients/pusher';

const joinRoom = (channelName: string, fn: (t: any) => void) => {
  const channel = pusher.subscribe(`cache-${channelName}`);
  return channel.bind('new-message', (data: any) => {
    fn(data);
  });
};

const leaveRoom = (channelName: string) => {
  pusher.unsubscribe(`cache-${channelName}`);
};

export { joinRoom, leaveRoom };
