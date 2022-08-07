import Header from '@components/Header';
import Footer from '@components/Footer';
import { useUser } from '@supabase/auth-helpers-react';

const Layout = (props: { children: React.ReactNode }) => {
  const { user } = useUser();
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header user={user} />
      <main className="grow mx-auto flex justify-center items-center max-w-7xl w-full">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
