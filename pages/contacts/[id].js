import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Avatar, Box, Button, Divider, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import ContactDetailSkeleton from '@/components/Skeleton/ContactDetailSkeleton';


const chatButtonStyle = {
  h: '36px',
  '&:hover': {
    bg: 'blue.400',
    color: 'white',
    borderColor: 'blue.400',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
  '&:active': {
    transform: 'scale(0.9)',
    transition: 'transform 0.1s ease-in-out',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
}

export default function ContactDetail({ jwt, id }) {
  const [visitor, setVisitor] = useState(null);
  const [isFetching, setIsFetching] = useState(true);


  const fetchVisitor = useCallback(async () => {
    setIsFetching(true);
    const visitorRes = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const visitorData = visitorRes.data;
    // if (visitorData && visitorData.statusCode === 200) {
    //   setVisitor(visitorData.payload);
    // }
    setIsFetching(false);
  }, [jwt, id]);

  useEffect(() => {
    fetchVisitor();
  }, [fetchVisitor]);

  return (
    <>
      {isFetching ? (
        <ContactDetailSkeleton />
      ) : (
        <Box w='auto' h='100%' bg='gray.50' flexGrow={1}>
          <Flex w='85%' h='100%' m='auto' py={20} justifyContent='space-between'>
            <Box w='280px' h='580px' mr='5' bg='whiteAlpha.900' borderRadius='md' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
              <Stack w='100%'>
                <Box pt={8} pb={6}>
                  <Stack alignItems='center' spacing={5}>
                    <Avatar bg='blue.300' name='Cuong' w='55px' h='55px' />
                    <Heading color='#283d52' fontSize='24px' fontWeight='500' marginBottom='1!important'>Ngo Cuong</Heading>
                    <Button sx={chatButtonStyle} size='sm' color='#283d52' variant='solid' leftIcon={<Icon as={FontAwesomeIcon} icon={faMessage} boxSize={4} />}>Chat</Button>
                  </Stack>
                </Box>

                <Box>
                  <Divider w='86%' m='auto' borderColor='gray.300' />
                  <Stack px={5} spacing={4} py={6}>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>Email</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>cuongcuu59@gmail.com</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>City/State</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>Hanoi</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>Country</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>VN</Text>
                    </Flex>
                  </Stack>
                </Box>
                
                <Box>
                  <Divider w='86%' m='auto' borderColor='gray.300' />
                  <Stack px={5} spacing={4} py={6}>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>Device</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>Desktop</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>OS</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>Windows</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>Browser</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>Chrome</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>IP Address</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>172.104.43.20</Text>
                    </Flex>
                  </Stack>
                  <Divider w='86%' m='auto' borderColor='gray.300' />
                </Box>
              </Stack>
            </Box>
            <Stack flexGrow={1} h='100%'>
              <Flex h='50px' bg='whiteAlpha.900' alignItems='center' borderRadius='md' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
                <Text px={5} color='#283d52' fontSize='14px' fontWeight='500'>Timeline</Text>
              </Flex>
            </Stack>
          </Flex>
        </Box>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, params } = context;
  const jwt = req.cookies.nvcJWT;
  const id = params.id;
  return {
    props: {
      jwt,
      id
    }
  }
}