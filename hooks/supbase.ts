import { supabaseClient } from '@supabase/auth-helpers-nextjs';

const login = async () => {
  return await supabaseClient.auth.signIn({
    provider: 'twitter',
  });
};

const signOut = async () => {
  window.location.href = '/';
  await supabaseClient.auth.signOut();
  return;
};

export { supabaseClient, login, signOut };
