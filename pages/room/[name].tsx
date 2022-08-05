import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { pusher } from "@clients/pusher";
import { Channel } from "pusher-js";

let roomClient: Channel | null = null;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { res, query } = ctx;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      roomName: query.name,
    },
  };
};

const ChatRoom = (props: { roomName: string }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleEnter = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      addMessage();
    }
  };
  const addMessage = async() => {
    const resp = await fetch('/api/chat/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomName: props.roomName,
        message: newMessage
      })
    })

    if(!resp.ok){
      alert('Error sending message');
      return;
    }

  };

  useEffect(() => {
    roomClient = pusher.subscribe(props.roomName);
    roomClient.bind("new-message", (data: any) => {
      setMessages(prev => [...prev, data.message]);
    });
    return () => {
      pusher.unsubscribe(props.roomName);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen min-w-7xl p-3">
      <div className="flex flex-col w-4/5">
        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 text-xl pb-5 text-center">
          {props.roomName} chat room
        </p>
        <div className="py-10 bg-white rounded-lg">
          {messages?.map((message) => (
            <div className="flex p-3 border-b-2 ">
              <div className="rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
                  alt={`avatar with ${message}`}
                  className="w-[50px] h-[50px] "
                />
              </div>
              <div className="w-full self-center">
                <p className="text-gray-800 text-sm  ml-3">{message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end p-3 mx-auto">
          <input
            type="text"
            className="p-2 mr-3 border-2 rounded-md"
            onKeyDown={handleEnter}
            onChange={(e) => setNewMessage(e.currentTarget.value)}
          />
          <button className="p-2 rounded-md bg-white" onClick={addMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
