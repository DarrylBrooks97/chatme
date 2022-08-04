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
      <div className="flex flex-col h-36 bg-red-500">
        <p className="text-white text-xl">
          You made it to: {props.roomName} chat room
        </p>
        {/* <div className=" bg-white rounded-lg"> */}
        <div className="flex items-end p-3">
          <input type="text" className="w-full border-2 rounded-md" />
          <button className="p-3 rounded-md bg-white">Send</button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
