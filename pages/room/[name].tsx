import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { joinRoom, leaveRoom } from 'hooks/channel';
import { formatDistanceToNow } from 'date-fns';
import { Channel } from 'pusher-js';

let roomClient: Channel | null = null;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { res, query } = ctx;

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return {
    props: {
      roomName: query.name,
    },
  };
};
export interface RoomMessage {
  userName: string;
  avatar?: string;
  message: string;
  time: string;
}

const ChatRoom = (props: { roomName: string }) => {
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
        userName: 'apxflex',
      }),
    });

    if (!resp.ok) {
      alert('Error sending message');
      return;
    }
  };

  useEffect(() => {
    roomClient = joinRoom(props.roomName, data => {
      setMessages(prevMessages => [...prevMessages, data]);
      setNewMessage('');
    });

    return () => {
      leaveRoom(props.roomName);
    };
  }, []);

  console.log({ count: roomClient?.subscriptionCount });

  return (
    <div className="flex justify-center items-center h-screen min-w-7xl p-3">
      <div className="flex flex-col w-full md:w-4/5 max-w-xl">
        <button
          className="absolute top-2 left-2 rounded-md bg-white px-3 py-2"
          tabIndex={1}
          onClick={() => (window.location.href = '/')}
        >
          Back
        </button>
        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 text-xl pb-5 text-center">
          {props.roomName} chat room
        </p>
        <p className="text-white">{roomClient?.subscriptionCount} online</p>
        <div className="py-10 bg-white rounded-lg">
          {messages?.map(message => (
            <div className="flex p-3 border-b-2" key={message.time}>
              <div className="rounded-full h-[50px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
                  alt={`avatar @ ${message.time}`}
                  className="w-[50px] h-[50px] "
                />
              </div>
              <div className="w-full self-center">
                <p className="text-sm text-purple-500 ml-3">@{message.userName}</p>
                <p className="text-gray-800 text-sm  ml-3">{message.message}</p>
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
            className="p-2 mr-3 border-2 rounded-md"
            onKeyDown={handleEnter}
            value={newMessage}
            onChange={e => setNewMessage(e.currentTarget.value)}
          />
          <button className="p-2 rounded-md bg-green-700" onClick={addMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
