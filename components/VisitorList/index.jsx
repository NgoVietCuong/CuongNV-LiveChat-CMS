import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Avatar, AvatarBadge, Button, Heading, Stack, Icon, Table, Thead, Tbody, Tr, Th, Td, TableContainer,Text } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import { Chat } from "@mui/icons-material";
import { useAppContext } from '@/context/AppContext';
import CreateChatModal from '../Modal/CreateChat';

const chatButtonStyle = {
  h: '36px',
  '&:hover': {
    bg: 'blue.500',
    color: 'white',
    borderColor: 'blue.500',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
  '&:active': {
    transform: "scale(0.9)",
    transition: "transform 0.1s ease-in-out",
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
}

export default function VisitorList({ visitors, jwt }) {
  const router = useRouter();
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const { onlineVistors, setOnlineVisitors } = useAppContext();

  const handleCreateChat = useCallback(async () => {
    setIsCreating(true);
    const chatRes = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/chats`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      data: JSON.stringify({ visitor: selectedVisitor, status: 'Draft' })
    });

    const chatData = chatRes.data;

    if (chatData && chatData.statusCode === 201) {
      const newOnlineVisitors = [...onlineVistors];
      const newVisitor = {...selectedVisitor}
      const visitorIndex = newOnlineVisitors.indexOf(selectedVisitor);
      newVisitor.chat = { _id: chatData.payload._id};
      newOnlineVisitors[visitorIndex] = newVisitor;
      setOnlineVisitors(newOnlineVisitors);
      onClose();
      router.push(`/chats/${chatData.payload._id}`);
    }
    setIsCreating(false);
  }, [jwt, selectedVisitor, onlineVistors]);

  const handleChatWithVisitor = useCallback((visitor) => {
    if (visitor.chat) {
      router.push(`/chats/${visitor.chat._id}`);
    } else {
      onOpen();
      setSelectedVisitor(visitor);
    }
  }, []);

  return (
    <>
      <TableContainer w='100%'>
        <Table variant='simple' size='md'>
            <Thead bg='gray.50'>
              <Tr>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Name</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Type</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Location</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Device</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>OS</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Browser</Text></Th>
                <Th display='flex' justifyContent='center'><Text color='#8c9191' fontWeight='600' fontSize='sm' textTransform='none'>Actions</Text></Th>
              </Tr>
            </Thead>
            <Tbody>
              {visitors.map((visitor) => (
                <Tr cursor='pointer'>
                  <Td>
                    <Stack direction='row' alignItems='center'>
                      <Avatar size='sm' name={visitor.name ? visitor.name : visitor.key.split('-')[0]} bg={visitor.avatar} color='white'>
                        <AvatarBadge boxSize='11px' bg='green.500' />
                      </Avatar>
                      <Heading fontSize='14px' fontWeight='500' color='#283d52'>{visitor.name ? visitor.name : visitor.key.split('-')[0]}</Heading>
                    </Stack>                    
                  </Td>
                  <Td><Text fontSize='14px'>{`${visitor.type} visitor`}</Text></Td>
                  <Td><Text fontSize='14px'>{`${visitor.location}, ${visitor.country}`}</Text></Td>
                  <Td><Text fontSize='14px'>{visitor.device}</Text></Td>
                  <Td><Text fontSize='14px'>{visitor.os}</Text></Td>
                  <Td><Text fontSize='14px'>{visitor.browser}</Text></Td>
                  <Td display='flex' justifyContent='center'>
                      <Button sx={chatButtonStyle} size='sm' colorScheme='blue' variant='outline' leftIcon={<Icon as={Chat} boxSize='18px' />} onClick={() => handleChatWithVisitor(visitor)}>Chat</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
      </TableContainer>
      <CreateChatModal isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} createChat={handleCreateChat} isCreating={isCreating} />
    </>
  )
}