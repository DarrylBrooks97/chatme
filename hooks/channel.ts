import { sanitize } from '@utils/index';
import Pusher from 'pusher-js';

const getOnlineCount = (channel: any) => {
  channel.bind('pusher:subscription_count', (data: { subscription_count: number }) => {
    document.getElementById('online')!.innerHTML = `${data.subscription_count} online !`;
  });
};

const joinRoom = (
  { pusher, channelName }: { pusher: Pusher; channelName: string },
  fn: (t: any) => void,
) => {
  const channel = pusher.subscribe(`cache-${sanitize(channelName)}`);
  getOnlineCount(channel);

  return channel.bind('new-message', (data: any) => {
    fn(data);
  });
};

const leaveRoom = ({ pusher, channelName }: { pusher: Pusher; channelName: string }) => {
  pusher.unsubscribe(`cache-${sanitize(channelName)}`);
};

export { joinRoom, leaveRoom };
