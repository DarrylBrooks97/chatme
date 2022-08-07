export const sanitize = (channelName: string) => {
  return channelName.replace(/[^a-zA-Z0-9-_=@,.;]/g, '-');
};
