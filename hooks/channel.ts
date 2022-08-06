import { pusher } from '@clients/pusher';

const getOnlineCount = (channel: any) => {
  channel.bind('pusher:subscription_count', (data: { subscription_count: number }) => {
    document.getElementById('online')!.innerHTML = `${data.subscription_count} online!`;
  });
};

const joinRoom = (channelName: string, fn: (t: any) => void) => {
  const channel = pusher.subscribe(`cache-${channelName}`);
  getOnlineCount(channel);

  return channel.bind('new-message', (data: any) => {
    fn(data);
  });
};

const leaveRoom = (channelName: string) => {
  pusher.unsubscribe(`cache-${channelName}`);
};

export { joinRoom, leaveRoom };
