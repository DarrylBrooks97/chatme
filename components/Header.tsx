import { login, signOut } from 'hooks/supbase';
import { User } from '@supabase/supabase-js';

const Header = (props: { user: User | null }) => {
  const fn = props.user ? signOut : login;
  return (
    <div className="sticky top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between p-3 text-white  backdrop-blur-lg md:p-8">
      <h1 className="text-2xl p-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
        Chat me
      </h1>
      <div className="flex justify-evenly">
        <button className="py-2 px-3 bg-green-600 text-white rounded-md" onClick={fn}>
          {props.user ? 'Sign out' : 'Sign in'}
        </button>
        {props.user && (
          <div className="flex items-center rounded-full overflow-hidden ml-2">
            <img className="w-full h-full" src={props.user.user_metadata['avatar_url']} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
