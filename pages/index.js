import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Stack, Progress, Text } from '@chakra-ui/react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';

export default function Home({ jwt }) {
  const router = useRouter();
  const [progressValue, setProgressValue] = useState(0);
  const { setShopName, setWaitingChats, setOpenChats, setClosedChats, setOnlineVisitors } = useAppContext();

  const fetchInitialData = useCallback(async () => {
    const fetchShop = axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/shops`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const fetchChatList = axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/chats`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const fetchOnlineVisitors = axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/online`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const [shopRes, chatListRes, onlineVisitorRes] = await Promise.all([fetchShop, fetchChatList, fetchOnlineVisitors]);

    const shopData = shopRes.data;
    const chatListData = chatListRes.data;
    const onlineVisitorData = onlineVisitorRes.data;

    if (shopData && shopData.statusCode === 200) {
      setShopName(shopData.payload.name);
    }

    if (chatListData && (chatListData.statusCode === 200 || chatListData.statusCode === 404)) {
      const test1 = chatListData.payload.filter(chat => chat.status === 'Waiting');
      const test2 = chatListData.payload.filter(chat => chat.status === 'Open');
      const test3 = chatListData.payload.filter(chat => chat.status === 'Closed');
      setWaitingChats(test1);
      setOpenChats(test2);
      setClosedChats(test3);
    }

    if (onlineVisitorData && (onlineVisitorData.statusCode === 200 || onlineVisitorData.statusCode === 404)) {
      setOnlineVisitors(onlineVisitorData.payload);
    }

    router.push('/chats');
    setProgressValue(100);
  }, [jwt]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <Stack w='100%' h='100vh' bg='white.500' justifyContent='center' alignItems='center'>
       <Image w='200px' mb='10px' src='/nvc_logo.svg' alt='Dan Abramov' />
       <Progress w='200px' value={progressValue} borderRadius={5} />
       <Text>Connecting...</Text>
    </Stack>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const jwt = req.cookies.nvcJWT;
  const domain = req.cookies['shop'];
  const shopId = req.cookies['shopId'];

  return {
    props: {
      jwt,
      domain,
      shopId
    }
  }
}