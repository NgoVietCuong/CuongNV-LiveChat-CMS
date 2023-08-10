import axios from 'axios';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react'
import React, { useState, useCallback, useEffect } from 'react';
import { Avatar, AvatarBadge, Button, ButtonGroup, Heading, Icon, Input, InputGroup, InputLeftElement, Stack, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Chat, Delete, AccountBox } from '@mui/icons-material';
import { useAppContext } from '@/context/AppContext';
import { useSocketContext } from '@/context/SocketContext';
import DeleteContactModal from '../Modal/DeleteContact';
import ContactListSkeleton from '../Skeleton/ContactListSkeleton';
import EmptyContactList from '../EmptyState/EmptyContactList';
import timeConverter from '@/utils/timeConveter';

const profileButtonStyle = {
  h: '36px',
  '&:hover': {
    bg: 'teal.500',
    color: 'white',
    borderColor: 'teal.500',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
  '&:active': {
    transform: 'scale(0.9)',
    transition: 'transform 0.1s ease-in-out',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
}

const chatButtonStyle = {
  h: '36px',
  '&:hover': {
    bg: 'blue.500',
    color: 'white',
    borderColor: 'blue.500',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
  '&:active': {
    transform: 'scale(0.9)',
    transition: 'transform 0.1s ease-in-out',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
}

const deleteButtonStyle = {
  h: '36px',
  '&:hover': {
    bg: 'red.500',
    color: 'white',
    borderColor: 'red.500',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
  '&:active': {
    transform: 'scale(0.9)',
    transition: 'transform 0.1s ease-in-out',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
}

export default function ContactList({ jwt }) {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [displayContacts, setDisplayContacts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleteing] = useState(false);
  const [queryValue, setQueryValue] = useState('');
  const socket = useSocketContext();
  const { waitingChats, setWaitingChats, openChats, setOpenChats, closedChats, setClosedChats, onlineVistors, setOnlineVisitors } = useAppContext();

  const fetchContacts = useCallback(async () => {
    setIsFetching(true);
    const contactListRes = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/contacts`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const contactListData = contactListRes.data;
    if (contactListData && (contactListData.statusCode === 200 || contactListData.statusCode === 404)) {
      setContacts(contactListData.payload);
      setDisplayContacts(contactListData.payload);
    }
    setIsFetching(false);
  }, [jwt]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleSearchContact = useCallback((e) => {
    const value = e.target.value;
    setQueryValue(value);

    if (value.length === 0 || value.trim() === '') {
      setDisplayContacts(contacts);
    } else {
      const newDisplayContacts = contacts.filter(contact => contact.name.toLowerCase().includes(value.trim().toLowerCase()));
      setDisplayContacts(newDisplayContacts);
    }
  }, [displayContacts]);

  const handleDeleteContact = useCallback(async () => {
    setIsDeleteing(true);
    const contactRes = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/${selectedContact}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    });

    const contactData = contactRes.data;
    
    if (contactData && contactData.statusCode === 200) {
      const newOpenChats = [...openChats];
      const newWaitingChats = [...waitingChats];
      const newClosedChats = [...closedChats];
      const newOnlineVisitors = [...onlineVistors];

      const openChat = newOpenChats.find(chat => chat.visitor._id === selectedContact);
      const waitingChat = newWaitingChats.find(chat => chat.visitor._id === selectedContact);
      const closedChat = newClosedChats.find(chat => chat.visitor._id === selectedContact);
      const onlineVisitor = newOnlineVisitors.find(visitor => visitor._id === selectedContact);

      if (openChat) {
        const chatIndex = newOpenChats.indexOf(openChat);
        newOpenChats.splice(chatIndex, 1);
        setOpenChats(newOpenChats);
      }

      if (waitingChat) {
        const chatIndex = newWaitingChats.indexOf(waitingChat);
        newWaitingChats.splice(chatIndex, 1);
        setWaitingChats(newWaitingChats);
      }

      if (closedChat) {
        const chatIndex = newClosedChats.indexOf(closedChat);
        newClosedChats.splice(chatIndex, 1);
        setClosedChats(newClosedChats);
      }

      if (onlineVisitor) {
        const visitorIndex = newOnlineVisitors.indexOf(onlineVisitor);
        newOnlineVisitors.splice(visitorIndex, 1);
        setOnlineVisitors(newOnlineVisitors);
      }

      toast({
        title: 'Deleted contact successfully',
        status: 'info',
        duration: 1500,
        isClosable: true,
        containerStyle: {
          height: '80px',
        },
      });

      socket.emit('preventVisitor', { visitorId: selectedContact})
      onClose();
    }

    setIsDeleteing(false);
    fetchContacts();
  }, [jwt, selectedContact]);

  return(
    <>
      {isFetching && <ContactListSkeleton />}
      {!isFetching && (
        <Stack spacing={3}>
          <InputGroup w='27%'>
            <InputLeftElement children={<Icon as={FontAwesomeIcon} icon={faMagnifyingGlass} cursor='pointer' color='gray.400' />} />
            <Input placeholder='Search...' h='38px' border='none' borderRadius='4px' bg='gray.100' color='gray.600' fontSize='15px' focusBorderColor='transparent' sx={{'::placeholder': {fontSize: '15px', alignItems: 'center', color: 'gray.400'}}} value={queryValue} onChange={handleSearchContact} />
          </InputGroup>  
          {!displayContacts.length && <EmptyContactList />}
          {(displayContacts.length > 0) && (
            <TableContainer w='100%'>
              <Table variant='simple' size='md'>
                <Thead bg='gray.50'>
                  <Tr>
                    <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Name</Text></Th>
                    <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Email</Text></Th>
                    <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Last Active</Text></Th>
                    <Th display='flex' justifyContent='center'><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Actions</Text></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {displayContacts.map((contact) =>(
                    <Tr cursor='pointer'>
                      <Td>
                        <Stack direction='row' alignItems='center'>
                          <Avatar size='sm' name={contact.name} bg={contact.avatar} color='white' boxSize='33px'>
                            <AvatarBadge borderWidth='2px' boxSize='11px' bg={contact.active ? 'green.500' : 'gray.300'} />
                          </Avatar>
                          <Heading fontSize='14px' fontWeight='500' color='#283d52'>{contact.name}</Heading>
                        </Stack>                    
                      </Td>
                      <Td><Text fontSize='14px'>{contact.email}</Text></Td>
                      {contact.active && <Td><Text fontSize='14px'>Active now</Text></Td>}
                      {!contact.active && <Td><Text fontSize='14px'>{timeConverter(contact.updated_at)}</Text></Td>}
                      <Td display='flex' justifyContent='center'>
                        <ButtonGroup>
                          <Button sx={profileButtonStyle} size='sm' colorScheme='teal' variant='outline' leftIcon={<Icon as={AccountBox} boxSize={5} />} onClick={() => {router.push(`/contacts/${contact._id}`)}}>Profile</Button>
                          <Button sx={chatButtonStyle} size='sm' colorScheme='blue' variant='outline' leftIcon={<Icon as={Chat} boxSize='18px' />} onClick={() => {router.push(`/chats/${contact.chat._id}`)}}>Chat</Button>
                          <Button sx={deleteButtonStyle} size='sm' colorScheme='red' variant='outline' leftIcon={<Icon as={Delete} boxSize='20px' />} onClick={() => {setSelectedContact(contact._id); onOpen()}}>Delete</Button>
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          <DeleteContactModal isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} deleteContact={handleDeleteContact} isDeleting={isDeleting} />
        </Stack>
      )}
    </>
  )
}