import type { NextPage } from "next";
import { FormEvent } from "react";

const Index: NextPage = () => {
  const submitRoom = (e: any) => {
    //get form data
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("roomName");
    window.location.href = `/room/${name}`;
  };

  return (
    <div className="flex justify-center items-center h-screen min-w-7xl">
      <div className="flex flex-col">
        <h1 className="text-6xl p-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
          Chat me
        </h1>
        <div className="flex flex-col text-center">
          <p className="text-white text-xl p-3">Pick a room to chat !</p>
          <form action="POST" onSubmit={submitRoom}>
            <input name="roomName" className="rounded-md p-3 mr-3" />
            <button
              className="rounded-md bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-md"
              type="submit"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
