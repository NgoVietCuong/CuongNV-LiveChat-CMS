import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { Avatar, Badge, Box, Button, ButtonGroup, Heading, Text, Stack, Icon, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Card, CardBody } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faMessage, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import ContactListSkeleton from '@/components/Skeleton/ContactListSkeleton';
import EmptyContactList from '@/components/EmptyState/EmptyContactList';

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

export default function Contacts({jwt}) {
  const router = useRouter();
  const [visistors, setVisitors] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const getVisitors = useCallback(async () => {
    setIsFetching(true);
    const visitorRes = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/visitors`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const visitorData = visitorRes.data;
    if (visitorData && visitorData.statusCode === 200) {
      setVisitors(visitorData.payload);
    }
    setIsFetching(false);
  }, [jwt]);

  useEffect(() => {
    getVisitors();
  }, [getVisitors]);

  return (
    <Box w='auto' h='100%' bg='gray.50' flexGrow={1}>
      <Stack w='80%' margin='auto' py={12} spacing={10}>
        <Heading color='#283d52' fontSize='27px' fontWeight='500'>Contacts</Heading>
        <Card boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
          <CardBody>
            {isFetching && <ContactListSkeleton />}
            {(!isFetching && !visistors.length) && <EmptyContactList />}
            {(!isFetching && visistors.length > 0) && (
              <TableContainer w='100%'>
                <Table variant='simple' size='md'>
                  <Thead bg='gray.50'>
                    <Tr>
                      <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Name</Text></Th>
                      <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Email</Text></Th>
                      <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Status</Text></Th>
                      <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Location</Text></Th>
                      <Th display='flex' justifyContent='center'><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Actions</Text></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {visistors.map((visitor) =>(
                      <Tr cursor='pointer'>
                        <Td>
                          <Stack direction='row' alignItems='center'>
                            <Avatar size='sm' name='Ngo Cuong' bg='blue.300' color='white'/>
                            <Heading fontSize='14px' fontWeight='500' color='#283d52'>{visitor.name}</Heading>
                          </Stack>                    
                        </Td>
                        <Td><Text fontSize='14px'>{visitor.email}</Text></Td>
                        <Td><Badge bg='blue.300' variant='solid' colorScheme='teal' textTransform='none'>Online</Badge></Td>
                        <Td><Text fontSize='14px'>{`${visitor.location}, ${visitor.country}`}</Text></Td>
                        <Td display='flex' justifyContent='center'>
                          <ButtonGroup>
                            <Button sx={profileButtonStyle} size='sm' colorScheme='teal' variant='outline' leftIcon={<Icon as={FontAwesomeIcon} icon={faAddressCard} boxSize={5} />} onClick={() => {router.push(`/contacts/${visitor._id}`)}}>Profile</Button>
                            <Button sx={chatButtonStyle} size='sm' colorScheme='blue' variant='outline' leftIcon={<Icon as={FontAwesomeIcon} icon={faMessage} boxSize={4} />} onClick={() => {console.log(2)}}>Chat</Button>
                            <Button sx={deleteButtonStyle} size='sm' colorScheme='red' variant='outline' leftIcon={<Icon as={FontAwesomeIcon} icon={faTrashCan} boxSize={4} />} onClick={() => {console.log(3)}}>Delete</Button>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </CardBody>
        </Card>
      </Stack>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const jwt = req.cookies['nvcJWT'];

  return {
    props: {
      jwt
    }
  };
}