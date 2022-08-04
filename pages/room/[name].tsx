import { useRouter } from "next/router";

const ChatRoom = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className="flex justify-center items-center h-screen min-w-7xl">
      <p className="text-white text-xl">You made it to: {name} chat room</p>
    </div>
  );
};

export default ChatRoom;
