import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { Avatar, AvatarBadge, Box, Icon, Link, List, ListItem, Stack, Tooltip, Text } from '@chakra-ui/react';
import { MoveToInbox, PermContactCalendar, People, Analytics } from '@mui/icons-material';
import { useAppContext } from '@/context/AppContext';
import { useSocketContext } from '@/context/SocketContext';

const navigationStyle = {
  color: 'gray.600',
  '&:hover': {
    bg: 'gray.100',
  }
}

const notification = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minW: '13px',
  h: '13px',
  color: 'white',
  borderRadius: '5px',
  p: '0px 4px',
  fontSize: '9px',
  lineHeight: '12px',
  letterSpacing: '0em',
  position: 'absolute',
  right: '6px',
  bottom: '9px'
}

export default function SideNav() {
  const router = useRouter();
  const { shopName, waitingChats, setWaitingChats, openChats, setOpenChats, closedChats, setClosedChats, onlineVistors, setOnlineVisitors } = useAppContext();
  const socket = useSocketContext();

  const handleOnlineVisistor = useCallback((data) => {
    setOnlineVisitors([...onlineVistors, data]);
    if (data.chat) {
      const newOpenChats = [...openChats];
      const newWaitingChats = [...waitingChats];
      const newClosedChats = [...closedChats];

      const openChat = newOpenChats.find(chat => chat._id === data.chat._id);
      const waitingChat = newWaitingChats.find(chat => chat._id === data.chat._id);
      const closedChat = newClosedChats.find(chat => chat._id === data.chat._id);

      if (openChat) {
        const chatIndex = newOpenChats.indexOf(openChat);
        newOpenChats[chatIndex].visitor.active = true;
        setOpenChats(newOpenChats);
      }

      if (waitingChat) {
        const chatIndex = newWaitingChats.indexOf(waitingChat);
        newWaitingChats[chatIndex].visitor.active = true;
        setWaitingChats(newWaitingChats);
      }

      if (closedChat) {
        const chatIndex = newClosedChats.indexOf(closedChat);
        newClosedChats[chatIndex].visitor.active = true;
        setClosedChats(newClosedChats);
      }
    }
  }, [onlineVistors, waitingChats, openChats, closedChats]);

  const handleOfflineVisitor = useCallback((data) => {
    const newOnlineVisitors = [...onlineVistors];
    const newOpenChats = [...openChats];
    const newWaitingChats = [...waitingChats];
    const newClosedChats = [...closedChats];

    const visitor = newOnlineVisitors.find(visitor => visitor._id === data);
    if (visitor) {
      const index = newOnlineVisitors.indexOf(visitor);
      newOnlineVisitors.splice(index, 1);
      setOnlineVisitors(newOnlineVisitors);
    }

    const openChat = newOpenChats.find(chat => chat.visitor._id === data);
    const waitingChat = newWaitingChats.find(chat => chat.visitor._id === data);
    const closedChat = newClosedChats.find(chat => chat.visitor._id === data);
    if (openChat) {
      const chatIndex = newOpenChats.indexOf(openChat);
      newOpenChats[chatIndex].visitor.active = false;
      setOpenChats(newOpenChats);
    }

    if (waitingChat) {
      const chatIndex = newWaitingChats.indexOf(waitingChat);
      newWaitingChats[chatIndex].visitor.active = false;
      setWaitingChats(newWaitingChats);
    }

    if (closedChat) {
      const chatIndex = newClosedChats.indexOf(closedChat);
      newClosedChats[chatIndex].visitor.active = false;
      setClosedChats(newClosedChats);
    }
  }, [onlineVistors, waitingChats, openChats, closedChats]);

  const handleUpdateVisitor = useCallback((data) => {
    const newOnlineVisitors = [...onlineVistors];
    const visitor = newOnlineVisitors.find(visitor => visitor._id === data._id);
    const index = newOnlineVisitors.indexOf(visitor);
    newOnlineVisitors[index] = data;
    setOnlineVisitors(newOnlineVisitors);
  }, [onlineVistors]);

  const handleUpdateChatList = useCallback((data) => {
    if (data.status === 'Waiting') {
      const newWaitingChats = [...waitingChats];
      const chatId = data._id;
      const waitingChat = newWaitingChats.find(chat => chat._id === chatId);
      if (waitingChat) {
        const chatIndex = newWaitingChats.indexOf(waitingChat);
        newWaitingChats.splice(chatIndex, 1);
        setWaitingChats([data, ...newWaitingChats]);
      } else {
        setWaitingChats([data, ...newWaitingChats]);
      }

      const newClosedChats = [...closedChats];
      const closedChat = newClosedChats.find(chat => chat._id === chatId);
      if (closedChat) {
        const chatIndex = newClosedChats.indexOf(closedChat);
        newClosedChats.splice(chatIndex, 1);
        setClosedChats(newClosedChats);
      }
    } else if (data.status === 'Open') {
      const newOpenChats = [...openChats];
      const chatId = data._id;
      const openChat = newOpenChats.find(chat => chat._id === chatId);
      if (openChat) {
        const chatIndex = newOpenChats.indexOf(openChat);
        newOpenChats.splice(chatIndex, 1);
        setOpenChats([data, ...newOpenChats]);
      } else {
        setOpenChats([data, ...newOpenChats]);
      }

      const newWaitingChats = [...waitingChats];
      const waitingChat = newWaitingChats.find(chat => chat._id === chatId);
      if (waitingChat) {
        const chatIndex = newWaitingChats.indexOf(waitingChat);
        newWaitingChats.splice(chatIndex, 1);
        setWaitingChats(newWaitingChats); 
      }
    }
  }, [waitingChats, openChats, closedChats]);

  useEffect(() => {
    socket.on('updateChatList', handleUpdateChatList);
    socket.on('onlineVisitor', handleOnlineVisistor);
    socket.on('offlineVisitor', handleOfflineVisitor);
    socket.on('updateVisitor', handleUpdateVisitor);

    return () => {
      socket.off('updateChatList', handleUpdateChatList);
      socket.off('onlineVisitor', handleOnlineVisistor);
      socket.off('offlineVisitor', handleOfflineVisitor);
      socket.off('updateVisitor', handleUpdateVisitor);
    }
  }, [handleUpdateChatList, handleOnlineVisistor, handleOfflineVisitor, handleUpdateVisitor]);

  const isSelected = (path) => {
    const isRoot = path === '/';
    if (isRoot) {
      return router.pathname === path;
    } else {
      return router.pathname.includes(path);
    } 
  }

  const hasSubNav = () => {
    if (router.pathname.includes('/chats') || router.pathname.includes('/settings')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Box w='60px' h='100vh' bg='whiteAlpha.900' boxShadow={hasSubNav() ? '0px 0px 2px rgba(0, 0, 0, 0.25)': '0 2px 6px rgba(61,65,67,.2)'} zIndex='5'>
      <Stack w='100%' minWidth='60px' h='100%' direction='column' alignItems='center' justifyContent='space-between'>
        <Stack w='100%' spacing={5} direction='column' alignItems='center'>
          <List w='100%' m={0} p={0} display='flex' flexDirection='column' zIndex={10}>
            <ListItem>
              <Tooltip ml='-5px' py='5px' label='Inbox' placement='right' bg='white' color='blue.500' fontSize='14px'>
                <Link w='60px' h='60px' display='block' textAlign='center' href='/chats' as={NextLink} sx={navigationStyle}>
                  <Stack w='60px' h='60px' position='relative' alignItems='center' justifyContent='center'>
                    <Icon boxSize='26px' as={MoveToInbox} color={isSelected('/chats') ? 'blue.500' : 'gray.500'} />
                    {(openChats.filter(chat => chat.read === false).length + waitingChats.length) > 0 && <Text bg='red.500' sx={notification}>{openChats.filter(chat => chat.read === false).length + waitingChats.length}</Text>}
                  </Stack>
                </Link>
              </Tooltip>
            </ListItem>

            <ListItem>
              <Tooltip ml='-5px' py='5px' label='Contacts' placement='right' bg='white' color='blue.500' fontSize='14px'>
                <Link w='60px' h='60px' display='block' textAlign='center' href='/contacts' as={NextLink} sx={navigationStyle}>
                  <Stack w='60px' h='60px' position='relative' alignItems='center' justifyContent='center'>
                    <Icon boxSize='26px' as={PermContactCalendar} color={isSelected('/contacts') ? 'blue.500' : 'gray.500'} />
                  </Stack>
                </Link>
              </Tooltip>
            </ListItem>

            <ListItem>
              <Tooltip ml='-5px' py='5px' label='Online Visitors' placement='right' bg='white' color='blue.500' fontSize='14px'>
                <Link w='60px' h='60px' display='block' textAlign='center' href='/visitors' as={NextLink} sx={navigationStyle}>
                  <Stack w='60px' h='60px' position='relative' alignItems='center' justifyContent='center'>  
                    <Icon boxSize='26px' as={People} color={isSelected('/visitors') ? 'blue.500' : 'gray.500'} />
                    {onlineVistors.length > 0 && <Text bg='gray.400' sx={notification}>{onlineVistors.length}</Text>}
                  </Stack>
                </Link>
              </Tooltip>
            </ListItem>

            <ListItem>
              <Tooltip ml='-5px' py='5px' label='Analytics' placement='right' bg='white' color='blue.500' fontSize='14px'>
                <Link w='60px' h='60px' display='block' textAlign='center' href='/analytics' as={NextLink} sx={navigationStyle}>
                  <Stack w='60px' h='60px' position='relative' alignItems='center' justifyContent='center'> 
                    <Icon boxSize='26px' as={Analytics} color={isSelected('/analytics') ? 'blue.500' : 'gray.500'} />
                  </Stack>
                </Link>
              </Tooltip>
            </ListItem>
          </List>
        </Stack>

        <Stack py={10} spacing={8} direction='column' alignItems='center'>
          <Avatar name={shopName} bg='blue.400' color='white' size='sm' boxSize='2.1rem'>
            <AvatarBadge boxSize='12px' bg='green.500' />
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  )
}