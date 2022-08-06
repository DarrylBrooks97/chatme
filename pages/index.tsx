import type { NextPage } from 'next';
import { useUser } from '@supabase/auth-helpers-react';
import { login } from 'hooks/supbase';
import { useEffect } from 'react';

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
    window.location.href = `/room/${name?.toString().toLowerCase().trim()}`;
  };

  useEffect(() => {
    const doc = document.getElementById('hidden-signin');
    doc!.style.display = 'hidden';
  }, []);

  return (
    <div className="flex justify-center items-center h-screen min-w-7xl">
      <div className="flex flex-col text-center">
        <h1 className="text-6xl p-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
          Chat me
        </h1>
        <h2 className="text-xl p-3 font-medium text-slate-400">
          A quick chat app to talk to friends, family, and randoms in real time.
        </h2>
        <div className="flex flex-col text-center p-3">
          <p className="text-white text-xl p-3">Pick a room to chat !</p>
          <form action="POST" onSubmit={submitRoom}>
            <input name="roomName" className="rounded-md p-3 mr-3" />
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
      </div>
    </div>
  );
};

export default Index;
