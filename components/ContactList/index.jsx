import axios from 'axios';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react'
import React, { useState, useCallback, useEffect } from 'react';
import { Avatar, AvatarBadge, Button, ButtonGroup, Heading, Icon, Stack, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faMessage, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import fetchData from '@/ultils/swr';
import DeleteContactModal from '../Modal/DeleteContact';
import ContactListSkeleton from '../Skeleton/ContactListSkeleton';
import EmptyContactList from '../EmptyState/EmptyContactList';

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
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleteing] = useState(false);

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
    }
    setIsFetching(false);
  }, [jwt]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts])

  // const { data, isLoading } = useSWR(
  //   [`${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/contacts`, jwt],
  //   fetchData,
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //     shouldRetryOnError: false,
  //   }
  // );

  // useEffect(() => {
  //   if (data && (data.statusCode === 200 || data.statusCode === 404)) {
  //     setContacts(data.payload);
  //   }
  // }, [jwt, data]);

  const deleteContact = useCallback(async () => {
    setIsDeleteing(true);
    await axios({
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/${selectedContact}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    });
    onClose();
    setIsDeleteing(false);
    mutate([`${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/contacts`, jwt]);
  }, [jwt, selectedContact]);

  return(
    <>
      {isFetching && <ContactListSkeleton />}
      {(!isFetching && !contacts.length) && <EmptyContactList />}
      {(!isFetching && contacts.length > 0) && (
        <>
          <TableContainer w='100%'>
            <Table variant='simple' size='md'>
              <Thead bg='gray.50'>
                <Tr>
                  <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Name</Text></Th>
                  <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Email</Text></Th>
                  <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Location</Text></Th>
                  <Th display='flex' justifyContent='center'><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Actions</Text></Th>
                </Tr>
              </Thead>
              <Tbody>
                {contacts.map((contact) =>(
                  <Tr cursor='pointer'>
                    <Td>
                      <Stack direction='row' alignItems='center'>
                        <Avatar size='sm' name={contact.name} bg={contact.avatar} color='white' boxSize='33px'>
                          <AvatarBadge boxSize='12px' bg={contact.active ? 'green.500' : 'gray.300'} />
                        </Avatar>
                        <Heading fontSize='14px' fontWeight='500' color='#283d52'>{contact.name}</Heading>
                      </Stack>                    
                    </Td>
                    <Td><Text fontSize='14px'>{contact.email}</Text></Td>
                    <Td><Text fontSize='14px'>{`${contact.location}, ${contact.country}`}</Text></Td>
                    <Td display='flex' justifyContent='center'>
                      <ButtonGroup>
                        <Button sx={profileButtonStyle} size='sm' colorScheme='teal' variant='outline' leftIcon={<Icon as={FontAwesomeIcon} icon={faAddressCard} boxSize={5} />} onClick={() => {router.push(`/contacts/${contact._id}`)}}>Profile</Button>
                        <Button sx={chatButtonStyle} size='sm' colorScheme='blue' variant='outline' leftIcon={<Icon as={FontAwesomeIcon} icon={faMessage} boxSize={4} />} onClick={() => {console.log(2)}}>Chat</Button>
                        <Button sx={deleteButtonStyle} size='sm' colorScheme='red' variant='outline' leftIcon={<Icon as={FontAwesomeIcon} icon={faTrashCan} boxSize={4} />} onClick={() => {setSelectedContact(contact._id); onOpen()}}>Delete</Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <DeleteContactModal isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} deleteContact={deleteContact} isDeleting={isDeleting} />
        </>
      )}
    </>
  )
}