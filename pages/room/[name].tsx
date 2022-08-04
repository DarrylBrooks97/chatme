import { GetServerSidePropsContext } from "next";

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
  return (
    <div className="flex justify-center items-center h-screen min-w-7xl p-3">
      <div className="flex flex-col p-20">
        <p className="text-white text-xl pb-5">
          You made it to: {props.roomName} chat room
        </p>
        <div className="py-10 bg-white rounded-lg">
          <p>Messages</p>
        </div>
        <div className="flex items-end p-3 mx-auto">
          <input type="text" className="p-2 mr-3 border-2 rounded-md" />
          <button className="p-2 rounded-md bg-white">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
