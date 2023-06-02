import React from 'react';
import ChatNav from '@/components/Layout/ChatLayout/ChatNav';
import ChatArea from '@/components/ChatArea';
import { useEffect, useState } from 'react';
import socket from '@/ultils/socketIO';
import { Avatar, AvatarBadge, Box, Card, CardBody, Heading, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faLink } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";


export default function Chats() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data)
      setAllMessages((pre) => [...pre, data])
    })
  }, []);

  return (
    <>
      <ChatNav />
      <Stack w='auto' h='100%' maxH='100vh' flexGrow={1} boxShadow='0px 0px 2px rgba(0, 0, 0, 0.25)' spacing={0}>
        <Box p={4} w='100%' h='70px' bg='#F8FAFF' >
          <Stack w='100%' h='100%' direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' spacing={3}>
              <Avatar name='Nguyen Hoa' size='sm' bg='blue.500' color='white' boxSize='2.2rem'>
                <AvatarBadge boxSize='1em' bg='green.500' />
              </Avatar>

              <Stack spacing={0.2}>
                <Heading size='xs'>Nguyen Hoa</Heading>
                <Text fontSize='xs' color='gray.500'>Online</Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <Box p={3} w='100%' bg='#F0F4FA' flexGrow={1}>
          <Stack spacing={3}>
            {allMessages.map(({type, message}) => (
              <Stack direction='row' justifyContent={type=='income' ? 'flex-start': 'flex-end'}>
                <Box w='max-content' bg={type=='income' ? 'white': 'twitter.600'} color={type=='income' ? 'black': 'white'} px={4} py={2} borderRadius='xl' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
                  <Text fontSize='sm'>{message}</Text>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box p={4} w='100%' bg='#F8FAFF'>
          <Stack direction='row' alignItems='center' spacing={3} justifyContent='space-between'>
            <InputGroup>
              <InputLeftElement children={<Icon as={FontAwesomeIcon} icon={faLink} cursor='pointer' color='gray.600' />} />
              <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type a messsage ...'/>
              <InputRightElement children={<Icon as={FontAwesomeIcon} icon={faFaceSmile} cursor='pointer' color='gray.600' />} />
            </InputGroup>
            <IconButton size='md' bg='twitter.600' borderRadius='xl' icon={<Icon as={FontAwesomeIcon} icon={faPaperPlane} color='white'/>} onClick={() => {setAllMessages((pre) => [...pre, {type:'reply', message: message}]); socket.emit('message', message); setMessage('')}}/>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};