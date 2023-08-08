import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '@/components/Layout/AppLayout';
import { ChakraProvider } from '@chakra-ui/react';
import SocketProvider, { useSocketContext } from '@/context/SocketContext';
import AppProvider from '@/context/AppContext';
import theme from '@/theme';
import { useRouter } from 'next/router';
import '@fontsource/inter/latin-300.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';

export default function App({ Component, pageProps }) {
  const renderWithLayout = Component.getLayout || ((page) => (page));
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const domain = pageProps.domain;
  const socket = useSocketContext();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.on('connect', () => {
        socket.emit('join', { domain: domain });
      });
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <React.Fragment>
      <Head>
        <title>CuongNV Live Chat</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/chat_icon.png' />
      </Head>
      <ChakraProvider theme={theme}>
        <SocketProvider>
          <AppProvider>
            {isIndexPage ? (
              <Component {...pageProps} />
            ) : (
              <AppLayout>
                {renderWithLayout(<Component {...pageProps} />)}
              </AppLayout>
            )}
          </AppProvider>
        </SocketProvider>
      </ChakraProvider>
    </React.Fragment>
  )
}
