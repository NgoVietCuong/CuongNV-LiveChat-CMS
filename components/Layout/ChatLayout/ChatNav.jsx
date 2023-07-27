import axios from "axios";
import { useCallback, useEffect } from "react";
import { Box, Heading, Icon, Input, InputGroup, InputLeftElement, Stack, Text} from "@chakra-ui/react";
import ChatUser from "../../ChatUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSocketContext } from '@/context/SocketContext';
import { useChatContext } from '@/context/ChatContext';

export default function ChatNav({ jwt }) {
  const socket = useSocketContext();
  const { chatList, setChatList } = useChatContext();

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

  const updateChatList = useCallback((data) => {
    // console.log(data)
    let newChatList = [...chatList];
    const chatId = data._id;
    const chat = newChatList.find(chat => chat._id === chatId);
    if (chat) {
      console.log('1')
      const chatIndex = newChatList.indexOf(chat);
      newChatList.splice(chatIndex, 1);
      console.log(newChatList)
      setChatList([data, ...newChatList]);
    } else {
      console.log('2')
      setChatList([data, ...newChatList]);
    }
  }, [chatList]);

  useEffect(() => {
    socket.on('updateChatList', updateChatList);

    return () => {
      socket.off('updateChatList', updateChatList)
    }
  }, [updateChatList]);

  return (
    <Box w='300px' h='100vh' bg='whiteAlpha.900' boxShadow='0 2px 6px rgba(61,65,67,.2)' zIndex='4'>
      <Stack w='100%' minW='300px' h='100%' maxH='100vh' spacing={0} justifyContent='flex-start'>
        <Stack px={5} pt={5} pb={2} spacing={6}>
          <Heading color='#283d52' fontSize='27px' fontWeight='500'>Chats</Heading>
          <InputGroup marginEnd={3}>
            <InputLeftElement children={<Icon as={FontAwesomeIcon} icon={faMagnifyingGlass} cursor='pointer' color='gray.400' />} />
            <Input placeholder='Search...' h='38px' border='none' borderRadius='8px' bg='gray.100' color='gray.600' fontSize='15px' focusBorderColor='transparent' sx={{'::placeholder': {fontSize: '15px', alignItems: 'center', color: 'gray.400'}}} />
          </InputGroup>    
          <Text mt={8} fontSize='sm' color='gray.500'>All chats</Text>  
        </Stack>

        <Stack p={3} flexGrow={1} spacing={2} overflowY='scroll'
          sx={{
            '&::-webkit-scrollbar': {
              width: '0',
              height: '0',
              background: 'transparent',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            MozAppearance: 'none', // For Firefox
            scrollbarWidth: 'none', // For Firefox
            scrollbarColor: 'transparent transparent', // For Firefox
            WebkitOverflowScrolling: 'touch',
          }}>
          {chatList.map(chat => (
            <>
              <ChatUser chat={chat} />
            </>
          ))}     
        </Stack>
      </Stack>
    </Box>
  )
}