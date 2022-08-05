import Header from '@components/Header';
import { useUser } from '@supabase/auth-helpers-react';

const Layout = (props: { children: React.ReactNode }) => {
  const { user } = useUser();
  return (
    <div className="flex h-full min-h-screen w-screen flex-col">
      <Header user={user} />
      <main>{props.children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
