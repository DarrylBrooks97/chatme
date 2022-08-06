import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-website-id="aaf9d810-79a4-410d-870a-d8cb447c9fd7"
            src="https://metabird-umami.vercel.app/umami.js"
          ></script>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
