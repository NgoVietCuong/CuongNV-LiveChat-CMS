import React from 'react';
import ChatLayout from '@/components/Layout/ChatLayout';
import { Box, Card, CardBody, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';

export default function ChatDashboard() {
  return (
    <Box w='auto' h='100vh' bg='gray.50' flexGrow={1}>
      <Stack h='100%' maxH='100vh' spacing={0} justifyContent='center' alignItems='center'>
        <Stack w='50%' pb='10px' alignItems='center'>
          <Stack w='100%' mb='-35px' alignItems='center'>
            <Card w='220px' bg='gray.200' borderRadius='xl' boxShadow=''>
              <CardBody py={10}>
                <Stack spacing={4}>
                  <Skeleton startColor='gray.400' endColor='gray.400' height={2} w='40%' />
                  <Skeleton startColor='gray.200' endColor='gray.200' height={2} w='50%' />
                </Stack>
              </CardBody>
            </Card>
            <Card w='220px' position='relative' top='-60px' left='-40px' borderRadius='xl' boxShadow='6px 15px 40px rgba(0,0,0,.1)'>
              <CardBody py={10}>
                <Stack spacing={4}>
                  <Skeleton startColor='gray.400' endColor='gray.400' height={2} w='40%' />
                  <Skeleton startColor='gray.200' endColor='gray.200' height={2} w='90%' />
                </Stack>
              </CardBody>
            </Card>
          </Stack>
          <Heading mb='5px!important' color='#283d52' fontSize='20px' fontWeight='600'>Hello there, Ngô</Heading>
          <Text w='260px' color='gray.500' fontWeight='400' textAlign='center'>Pick a customer from left menu and start your conversation</Text>
        </Stack>
      </Stack>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const jwt = req.cookies['nvcJWT'];
  const domain = req.cookies['shop'];

  return {
    props: {
      jwt,
      domain
    }
  };
}

ChatDashboard.getLayout = function(page) {
  return (
    <ChatLayout jwt={page.props.jwt} domain={page.props.domain}>
      {page}
    </ChatLayout>
  )
}