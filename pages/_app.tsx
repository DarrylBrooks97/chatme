import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Layout from '@components/Layout';
import { DefaultSeo } from 'next-seo';
import { PusherProvider } from '@contexts/pusher';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <DefaultSeo
        title="Chatme 👋🏾"
        openGraph={{
          type: 'website',
          url: 'https://chatme-xi.vercel.app/',
          site_name: 'Chatme 👋🏾',
          description: 'A quick chat app to talk to friends, family, and randoms in real time.',
          images: [
            {
              url: 'https://chatme-xi.vercel.app/SEO.png',
              width: 800,
              height: 450,
              alt: 'Chatme',
            },
          ],
        }}
        twitter={{
          handle: '@apxflex',
          cardType: 'summary_large_image',
        }}
      />
      <PusherProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PusherProvider>
    </UserProvider>
  );
}

export default MyApp;
