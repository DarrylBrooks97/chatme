import type { NextPage } from 'next';
import { useUser } from '@supabase/auth-helpers-react';
import { login } from 'hooks/supbase';
import { useEffect } from 'react';

interface Room {
  name: string;
  memberCount: number;
}
const openRooms: Room[] = [
  // {
  //   name: 'general',
  //   memberCount: 2,
  // },
  // {
  //   name: 'Darryl',
  //   memberCount: 200,
  // },
  // {
  //   name: 'chas',
  //   memberCount: 320,
  // },
  // {
  //   name: 'the last slimetto',
  //   memberCount: 2,
  // },
];

const Index: NextPage = () => {
  const { user } = useUser();

  const submitRoom = (e: any) => {
    e.preventDefault();
    if (!user) {
      const doc = document.getElementById('hidden-signin');
      doc!.style.display = 'block';
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get('roomName');

    if (name === '') {
      return;
    }

    window.location.href = `/room/${name?.toString().toLowerCase().trim()}`;
  };

  useEffect(() => {
    const doc = document.getElementById('hidden-signin');
    doc!.style.display = 'hidden';
  }, []);

  return (
    <div className="flex flex-col text-center">
      <h1 className="text-6xl p-1 font-bold text-transparent bg-clip-text animate-lightSpeed bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 bg-[length:300%_100%]">
        Chat me
      </h1>
      <h2 className="text-xl p-3 font-medium text-slate-400">
        A quick chat app to talk to friends, family, and randoms in real time.
      </h2>
      <div className="flex flex-col text-center p-3">
        <p className="text-white text-xl p-3">Enter a room name !</p>
        <form action="POST" onSubmit={submitRoom}>
          <input name="roomName" className="rounded-md p-3 mr-3 bg-white text-black" />
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-md"
            type="submit"
          >
            Go
          </button>
        </form>
      </div>
      <div className="p-3 hidden" id="hidden-signin">
        <p className="text-sm text-red-600 animate-bounce">Please sign in first</p>
        <button className="py-3 px-4 bg-green-600 text-white rounded-md" onClick={login}>
          Signin
        </button>
      </div>
      <div className="flex justify-around items-center p-3">
        <div className="bg-white w-full h-0.5"></div>
        <p className="text-white text-2xl px-4">Or</p>
        <div className="bg-white w-full h-0.5"></div>
      </div>
      <p className="text-slate-300 text-2xl pt-4">Join a room</p>
      {openRooms.length < 1 && (
        <p className="text-white text-lg md:text-2xl p-3">No available rooms 🙁. Go start one!</p>
      )}
      {/* <div className="grid grid-cols-2 gap-4 p-3 grow">
        {openRooms?.map((room: Room) => (
          <NextLink href={`http://localhost:3000/room/${room.name}`}>
            <div className="rounded-md border-2 border-slate-400 py-16 relative" key={room.name}>
              <div className="flex-1">
                <p className="text-xl text-white">{room.name}</p>
              </div>
              <div className="flex justify-around items-center absolute bottom-3 right-3">
                <div className="rounded-full mr-3 w-3 h-3  animate-ping bg-green-500"></div>
                <p className="text-white">Online: {room.memberCount}</p>
              </div>
            </div>
          </NextLink>
        ))}
      </div> */}
    </div>
  );
};

export default Index;
