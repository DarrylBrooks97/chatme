import { supabaseClient } from '@supabase/auth-helpers-nextjs';

const login = async () => {
  return await supabaseClient.auth.signIn({
    provider: 'twitter',
  });
};

const signOut = async () => {
  return await supabaseClient.auth.signOut();
};

export { supabaseClient, login, signOut };
