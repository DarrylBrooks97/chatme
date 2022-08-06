import { supabaseClient } from '@supabase/auth-helpers-nextjs';

const login = async () => {
  return await supabaseClient.auth.signIn({
    provider: 'twitter',
  });
};

const signOut = async () => {
  await supabaseClient.auth.signOut();
  window.location.href = '/';
  return;
};

export { supabaseClient, login, signOut };
