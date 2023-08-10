import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Avatar, AvatarBadge, Box, Heading, Menu, MenuButton, MenuList, MenuItem, Text, Icon, IconButton , Flex, Divider, Grid, GridItem, useToast  } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faDownload, faReply } from '@fortawesome/free-solid-svg-icons';
import { AccessAlarms, Delete, EventAvailable } from '@mui/icons-material';
import { useAppContext } from '@/context/AppContext';
import timeConverter from '@/utils/timeConveter';
import extractURLFromString from '@/utils/extractUrl';
import { useDisclosure } from '@chakra-ui/react';
import DeleteChatModal from '../Modal/DeleteChat';

const displayMenuButton = {
  '& button': { display: 'flex!important' },
  '& .time': { display: 'none!important' }
}

const selectedUser = {
  bg: 'blue.100',
  boxShadow: '0px 4px 8px rgba(61,65,67,.15)',
  '& button': { display: 'none' },
  '& hr': { borderColor: 'blue.100' },
  '&:hover': {
    '& button': { display: 'flex' },
    '& .time': { display: 'none' }
  }
}

const normalUser = {
  '& button': { display: 'none' },
  '&:hover': {
    bg: 'white',
    boxShadow: '0px 4px 8px rgba(61,65,67,.15)',
    '& hr': { borderColor: 'gray.100' },
    '& button': { display: 'flex' },
    '& .time': { display: 'none' }
  }
}

const menuButton = {
  '&:hover': {
    '& button': { bg: 'blue.50' },
    '& button svg': { color: 'blue.500' }
  }
}

export default function ChatUser({ chat, jwt }) {
  const toast = useToast();
  const router = useRouter();
  const cancelRef = React.useRef();
  const { _id: id, read, status, updated_at, visitor: { name, email, active, avatar }, lastMessage: { sender, text, type } } = chat;
  const { waitingChats, setWaitingChats, openChats, setOpenChats, closedChats, setClosedChats } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleteing] = useState(false);

  const combinedSelectedUserStyle = {
    ...selectedUser,
    ...(isMenuOpen ? displayMenuButton : {}),
  }

  const combinedNormalUserStyle = {
    ...normalUser,
    ...(isMenuOpen ? displayMenuButton : {}),
  }

  const isSelected = (id) => {
    if (router.query.id === id) {
      return true;
    } else {
      return false;
    }
  }

  const handleMenuButtonClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleWaitingChat = useCallback(async (e) => {
    e.preventDefault();
    const chatRes = await axios({
      method: 'put',
      url:  `${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      data: JSON.stringify({ status: 'Waiting', read: false })
    });
    
    const chatData = chatRes.data;
    if (chatData && chatData.statusCode === 200) {
      const newOpenChats = [...openChats];
      const newWaitingChats = [...waitingChats];
      const chatIndex = openChats.indexOf(chat);
      newOpenChats.splice(chatIndex, 1);
      chat.status = 'Waiting';
      chat.read = false;
      setOpenChats(newOpenChats);
      setWaitingChats([chat, ...newWaitingChats]);

      toast({
        title: 'Moved to Waiting',
        status: 'info',
        duration: 1500,
        isClosable: true,
        containerStyle: {
          height: '80px',
        },
      });

      if (isSelected(id)) {
        router.push('/chats');
      }
    }
  }, [openChats, waitingChats]);

  const handleOpenChat = useCallback(async (e) => {
    e.preventDefault();
    const chatRes = await axios({
      method: 'put',
      url:  `${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      data: JSON.stringify({ status: 'Open' })
    });

    const chatData = chatRes.data;
    if (chatData && chatData.statusCode === 200) {
      const newOpenChats = [...openChats];
      const newWaitingChats = [...waitingChats];
      const newClosedChats = [...closedChats];
      if (status === 'Waiting') {
        const chatIndex = newWaitingChats.indexOf(chat);
        newWaitingChats.splice(chatIndex, 1);
        setWaitingChats(newWaitingChats);
      } else if (status === 'Closed') {
        const chatIndex = newClosedChats.indexOf(chat);
        newClosedChats.splice(chatIndex, 1);
        setClosedChats(newClosedChats);
      }
      chat.status = 'Open';
      setOpenChats([chat, ...newOpenChats]);

      toast({
        title: 'Moved to Open',
        status: 'info',
        duration: 1500,
        isClosable: true,
        containerStyle: {
          height: '80px',
        },
      });

      if (isSelected(id)) {
        router.push('/chats');
      }
    }
  }, [waitingChats, openChats, closedChats]);

  const handleCloseChat = useCallback(async (e) => {
    e.preventDefault();
    const chatRes = await axios({
      method: 'put',
      url:  `${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      data: JSON.stringify({ status: 'Closed', read: true })
    });

    const chatData = chatRes.data;
    if (chatData && chatData.statusCode === 200) {
      const newOpenChats = [...openChats];
      const newWaitingChats = [...waitingChats];
      const newClosedChats = [...closedChats];
      if (status === 'Open') {
        const chatIndex = newOpenChats.indexOf(chat);
        newOpenChats.splice(chatIndex, 1);
        setOpenChats(newOpenChats);
      } else if (status === 'Waiting') {
        const chatIndex = newWaitingChats.indexOf(chat);
        newWaitingChats.splice(chatIndex, 1);
        setWaitingChats(newWaitingChats);
      }
      chat.status = 'Closed';
      chat.read = true;
      setClosedChats([chat, ...newClosedChats]);

      toast({
        title: 'Moved to Closed',
        status: 'info',
        duration: 1500,
        isClosable: true,
        containerStyle: {
          height: '80px',
        },
      });

      if (isSelected(id)) {
        router.push('/chats');
      }
    }
  }, [waitingChats, openChats, closedChats]);

  const handleDeleteChat = useCallback(async (e) => {
    e.preventDefault();
    setIsDeleteing(true);
    const chatRes = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    });

    const chatData = chatRes.data;
    if (chatData && chatData.statusCode === 200) {
      const newOpenChats = [...openChats];
      const newWaitingChats = [...waitingChats];
      const newClosedChats = [...closedChats];
      if (status === 'Open') {
        const chatIndex = newOpenChats.indexOf(chat);
        newOpenChats.splice(chatIndex, 1);
        setOpenChats(newOpenChats);
      } else if (status === 'Waiting') {
        const chatIndex = newWaitingChats.indexOf(chat);
        newWaitingChats.splice(chatIndex, 1);
        setWaitingChats(newWaitingChats);
      } else {
        const chatIndex = newClosedChats.indexOf(chat);
        newClosedChats.splice(chatIndex, 1);
        setClosedChats(newClosedChats);
      }

      toast({
        title: 'Deleted chat successfully',
        status: 'info',
        duration: 1500,
        isClosable: true,
        containerStyle: {
          height: '80px',
        },
      });

      if (isSelected(id)) {
        router.push('/chats');
      }
    }
    setIsDeleteing(false);
  }, [waitingChats, openChats, closedChats]);

  const handleOpenModal = useCallback((e) => {
    e.preventDefault();
    onOpen();
  }, []);

  return (
    <>
      <Link href='/chats/[id]' as={`/chats/${id}`} passHref>
        <Box w='100%' key={id} cursor='pointer' sx={isSelected(id) ? combinedSelectedUserStyle : combinedNormalUserStyle } borderRadius='md'>
          <Grid
            w='100%'
            px={3}
            py={2.5}
            templateAreas={`'avatar name time'
                            'avatar email time'
                            'message message message'`}
            gridTemplateColumns={'1.3fr 4.5fr 60px'}
            gap={0}
          >
            <GridItem area='avatar'>
              <Avatar name={name} bg={avatar} size='sm' color='white' boxSize='33px'>
                <AvatarBadge borderWidth='2px' boxSize='11px' bg={ active ? 'green.500': 'gray.300'} />
              </Avatar>
            </GridItem>
            <GridItem area='name' alignSelf="end">
              <Heading fontSize='14px' fontWeight='500' color='#283d52'>{(name.length > 18) ? name.substring(0, 16) + '...' : name}</Heading>
            </GridItem>
            <GridItem area='email' alignSelf='start'>
              <Text fontSize='12px' color='gray.500'>{(email.length > 18) ? email.substring(0, 17) + '...' : email}</Text>
            </GridItem>
            <GridItem area='time' justifySelf='end'>
              <Text className='time' fontSize='12px' color='gray.500'>{timeConverter(updated_at)}</Text>
              <Menu isOpen={isMenuOpen} onClose={handleMenuClose} >
                <MenuButton sx={menuButton} onClick={handleMenuButtonClick}>
                  <IconButton minW={0} bg='transparent' boxSize='21px' borderRadius={3} icon={<Icon boxSize='15px' color='gray.500' as={FontAwesomeIcon} icon={faEllipsisVertical} />} />
                </MenuButton>
                <MenuList w='100px'>
                  {(status === 'Open') && (<MenuItem fontSize='15px' borderRadius={3} onClick={handleWaitingChat}><Icon as={AccessAlarms} mr='10px' color='gray.400' boxSize='22px' />Mark as waiting</MenuItem>)}
                  {(status !== 'Open') && (<MenuItem fontSize='15px' borderRadius={3} onClick={handleOpenChat}><Icon as={AccessAlarms} mr='10px' color='gray.400' boxSize='22px' />Mark as open</MenuItem>)}
                  {(status !== 'Closed' ) && (<MenuItem fontSize='15px' borderRadius={3} onClick={handleCloseChat}><Icon as={EventAvailable} mr='10px' color='gray.400' boxSize='22px' />Mark as closed</MenuItem>)}
                  <MenuItem fontSize='15px' borderRadius={3} onClick={handleOpenModal}><Icon as={Delete} mr='10px' color='gray.400' boxSize='22px' />Delete</MenuItem>
                </MenuList>
              </Menu>
            </GridItem>
            <GridItem area='message' mt='8px' alignSelf='center'>
              <Flex justifyContent='space-between' alignItems='flex-end'>
                {(type === 'Text') && <Text fontSize='13px' color={(sender === 'Visitor' && !read) ? '#283d52' : 'gray.500'} fontWeight={(sender === 'Visitor' && !read) ? '500' : '400'}>{(text.length > 31) ? text.substring(0, 29) + '...' : text}</Text>}
                {(type === 'Media') && <Text fontSize='13px' color={(sender === 'Visitor' && !read) ? '#283d52' : 'gray.500'} fontWeight={(sender === 'Visitor' && !read) ? '500' : '400'}>Media</Text> }
                {(type === 'File') && <Text fontSize='13px' color={(sender === 'Visitor' && !read) ? '#283d52' : 'gray.500'} fontWeight={(sender === 'Visitor' && !read) ? '500' : '400'}>File</Text> }
                {(type === 'Link') && <Text fontSize='13px' color={(sender === 'Visitor' && !read) ? '#283d52' : 'gray.500'} fontWeight={(sender === 'Visitor' && !read) ? '500' : '400'}>{(extractURLFromString(text).length > 31) ? extractURLFromString(text).substring(0, 29) + '...' : extractURLFromString(text)}</Text> }
                {(sender === 'Visitor' && !read) && <Icon me='5px' boxSize='14px' color='blue.300' as={FontAwesomeIcon} icon={faDownload} alignSelf='center' />} 
                {(sender === 'Visitor' && read) && <Icon me='5px' boxSize='14px' color='gray.300' as={FontAwesomeIcon} icon={faDownload} alignSelf='center' />}
                {(sender === 'Operator') && <Icon me='5px' boxSize='14px' color='gray.300' as={FontAwesomeIcon} icon={faReply} alignSelf='center' />}
              </Flex>
            </GridItem>
          </Grid>
          <Divider borderColor='gray.200' w="94%" m='auto' />
        </Box>
      </Link>
      <DeleteChatModal isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} deleteChat={handleDeleteChat} isDeleting={isDeleting} />
    </>
  );
};