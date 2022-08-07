import { Channel } from 'pusher-js';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { joinRoom, leaveRoom } from 'hooks/channel';
import { formatDistanceToNow } from 'date-fns';
import { getUser, User } from '@supabase/auth-helpers-nextjs';
import { userActivityDetected } from '@clients/pusher';

let roomClient: Channel | null = null;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res, query } = ctx;
  const { user } = await getUser(ctx);

  if (!user) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return { props: { roomName: null } };
  }

  return {
    props: {
      user,
      roomName: query.name,
    },
  };
};
export interface RoomMessage {
  userName: string;
  avatar: string;
  message: string;
  time: string;
}

const ChatRoom = (props: { user: User; roomName: string }) => {
  const { user, roomName } = props;
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<RoomMessage[]>([]);

  const handleEnter = (e: any) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      addMessage();
    }
  };
  const addMessage = async () => {
    const resp = await fetch('/api/chat/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName: props.roomName,
        message: newMessage,
        userName: user.user_metadata['preferred_username'],
        avatar: user.user_metadata['avatar_url'].replace('_normal', ''),
      }),
    });

    if (!resp.ok) {
      alert('Error sending message');
      return;
    }
    userActivityDetected();
  };

  useEffect(() => {
    roomClient = joinRoom(roomName, data => {
      setMessages(prevMessages => [...prevMessages, data]);
      setNewMessage('');
    });

    return () => {
      leaveRoom(roomName);
    };
  }, []);

  return (
    <div className="flex flex-col p-3 w-full md:w-[50vw]">
      <p className="break-words font-semibold text-3xl text-transparent bg-clip-text animate-lightSpeed bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 bg-[length:650%_100%] pb-5 text-center">
        Welcome to {roomName} room !
      </p>
      <div className="flex">
        <div className="h-[10px] w-[10px] bg-green-300 rounded-full animate-ping self-center" />
        <p className="text-white ml-3" id="online"></p>
      </div>
      <div className="bg-white md:w-full w-full rounded-lg overflow-y-scroll overflow-x-hidden h-96">
        {messages?.map(message => (
          <div className="flex p-3 border-b-2 md:grow w-full" key={message.time}>
            <div className="h-[50px] rounded-full w-[50px] overflow-hidden">
              <img
                src={message.avatar}
                alt={`avatar @ ${message.time}`}
                className="w-full h-full"
                onClick={() => window.open(`https://twitter.com/${message.userName}`, '_blank')}
              />
            </div>
            <div className="md:w-full w-[300px] grow md:grow-0 break-words self-center">
              <p className="text-sm text-purple-500 ml-3">@{message.userName}</p>
              <p className="text-gray-800 text-sm ml-3">{message.message}</p>
              <time className="text-xs text-gray-500 float-right">
                {formatDistanceToNow(new Date(message.time))} ago
              </time>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end p-3 mx-auto">
        <input
          type="text"
          className="p-2 mr-3 border-2 w-full mx-auto rounded-md bg-white text-black"
          onKeyDown={handleEnter}
          value={newMessage}
          onChange={e => setNewMessage(e.currentTarget.value)}
        />
        <button className="p-2 rounded-md bg-green-700 text-white" onClick={addMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
