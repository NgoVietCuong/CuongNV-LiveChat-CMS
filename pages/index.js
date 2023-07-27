import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useChatContext } from '@/context/ChatContext';

export default function Home({ jwt }) {
  const { setChatList } = useChatContext();

  const fetchChatList = useCallback(async () => {
    const chatRes = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/chats`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const chatData = chatRes.data;
    if (chatData && (chatData.statusCode === 200 || chatData.statusCode === 404)) {
      setChatList(chatData.payload);
    }
  }, [jwt]);

  useEffect(() => {
    const storeChatList = JSON.parse(sessionStorage.getItem('chatList'));
    if (storeChatList) {
      setChatList(storeChatList);
    } else {
      fetchChatList();
    }
  }, [fetchChatList]);

  return (
    <Box w='auto' h='100%' bg='gray.50' flexGrow={1}>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const jwt = req.cookies.nvcJWT;
  const domain = req.cookies['shop'];

  return {
    props: {
      jwt,
      domain
    }
  }
}