import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { Avatar, Box, Button, Divider, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer  } from 'recharts';
import { Chat } from '@mui/icons-material';
import ContactDetailSkeleton from '@/components/Skeleton/ContactDetailSkeleton';
import generatePreviousDays from '@/utils/generateDates';

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

export default function ContactDetail({ jwt, id }) {
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [summary, setSummary] = useState(null);
  const [maxValue, setMaxValue] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    const fetchContactData = axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const fetchSummaryData = axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/analytics/visitor/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });
    
    const [contactRes, summaryRes] = await Promise.all([fetchContactData, fetchSummaryData]);

    const contactData = contactRes.data;
    const summaryData = summaryRes.data;

    if (contactData && contactData.statusCode === 200) {
      setContact(contactData.payload);
    }

    if (summaryData && summaryData.statusCode === 200) {
      const listDays = generatePreviousDays();
      const chatActivities = summaryData.payload.chatActivities;
      const newChatActivites = [];

      listDays.forEach((day) => {
        const chatActivity = chatActivities.find(activity => activity.date === day);
        if (!chatActivity) {
          const newActivity = { date: day, messages: 0}
          newChatActivites.unshift(newActivity);
        } else {
          if (maxValue < chatActivity.messages) {
            setMaxValue(chatActivity.messages)
          }
          newChatActivites.unshift(chatActivity);
        }
      });
      summaryData.payload.chatActivities = newChatActivites;
      setSummary(summaryData.payload);
    }
    setIsFetching(false);
  }, [jwt, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isFetching ? (
        <ContactDetailSkeleton />
      ) : (
        <Box w='auto' h='100%' bg='gray.50' flexGrow={1} overflowY='scroll' sx={{
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
          <Flex w='85%' h='100%' m='auto' py={20} justifyContent='space-between'>
            <Box w='280px' h='580px' mr='5' bg='whiteAlpha.900' borderRadius='md' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
              <Stack w='100%'>
                <Box pt={8} pb={6}>
                  <Stack alignItems='center' spacing={5}>
                    <Avatar bg={contact.avatar} name={contact.name} w='55px' h='55px' color='white' />
                    <Heading color='#283d52' fontSize='24px' fontWeight='500' marginBottom='1!important'>{contact.name}</Heading>
                    <Button sx={chatButtonStyle} size='sm' colorScheme='blue' variant='outline' leftIcon={<Icon as={Chat} boxSize='18px' />} onClick={() => {router.push(`/chats/${contact.chat._id}`)}}>Chat</Button>
                  </Stack>
                </Box>

                <Box>
                  <Divider w='86%' m='auto' borderColor='gray.300' />
                  <Stack px={5} spacing={4} py={6}>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>Email</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>{contact.email}</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>City/State</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>{contact.location}</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>Country</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>{contact.country}</Text>
                    </Flex>
                  </Stack>
                </Box>
                
                <Box>
                  <Divider w='86%' m='auto' borderColor='gray.300' />
                  <Stack px={5} spacing={4} py={6}>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>Device</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>{contact.device}</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>OS</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>{contact.os}</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>Browser</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>{contact.browser}</Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <Text fontSize='13px' color='rgb(140, 145, 145)' fontWeight='400'>IP Address</Text>
                      <Text fontSize='13px' color='#283d52' fontWeight='500'>{contact.ips}</Text>
                    </Flex>
                  </Stack>
                  <Divider w='86%' m='auto' borderColor='gray.300' />
                </Box>
              </Stack>
            </Box>
            <Stack flexGrow={1} h='100%'>
              <Flex h='50px' bg='whiteAlpha.900' alignItems='center' borderRadius='md' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
                <Text px={5} color='#283d52' fontSize='14px' fontWeight='500'>Summary</Text>
              </Flex>

              <Stack p={5} bg='whiteAlpha.900' flexGrow={1} borderRadius='md' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
              <Text color='gray.500' fontSize='13px'>Last chat time:</Text>
                <Text color='#283d52' fontSize='13px' fontWeight='500'>{summary.lastChatTime}</Text>
                <Text color='gray.500' fontSize='13px'>Chat status:</Text>
                <Text color='#283d52' fontSize='13px' fontWeight='500'>{summary.chatStatus}</Text>
                <Text color='gray.500' fontSize='13px'>Total messages:</Text>
                <Text color='#283d52' fontSize='13px' fontWeight='500'>{summary.totalMessages}</Text>
                <Text color='gray.500' fontSize='13px'>Activities:</Text>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart width={500} height={300} data={summary.chatActivities}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 14 }} />
                    <YAxis tickCount={maxValue} domain={[0, maxValue]} tick={{ fontSize: 14 }}/>
                    <Tooltip />
                    <Legend verticalAlign="top" height={50} />
                    <Bar dataKey="messages" fill="#4299E1" />
                  </BarChart>
                </ResponsiveContainer>
              </Stack>
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
  const domain = req.cookies['shop'];
  const shopId = req.cookies['shopId'];
  const id = params.id;

  return {
    props: {
      jwt,
      domain,
      shopId,
      id
    }
  }
}