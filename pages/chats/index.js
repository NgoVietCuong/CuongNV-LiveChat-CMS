import React from 'react';
import ChatLayout from '@/components/Layout/ChatLayout';
import { Box, Card, CardBody, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';

export default function ChatDashboard() {
  return (
    <Box w='auto' h='100vh' bg='gray.100' flexGrow={1} boxShadow='0px 0px 2px rgba(0, 0, 0, 0.25)'>
      <Stack h='100%' maxH='100vh' spacing={0} justifyContent='center' alignItems='center' >
        <Stack w='50%' alignItems='center'>
          <Stack w='100%' mb='-40px' alignItems='center'>
            <Card w='220px' bg='gray.200' borderRadius='xl' boxShadow=''>
              <CardBody py={10}>
                <Stack spacing={4}>
                  <Skeleton startColor='gray.400' endColor='gray.400' height={2} w='40%' />
                  <Skeleton startColor='gray.200' endColor='gray.200' height={2} w='50%'/>
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
          <Heading size='md' color='gray.700' fontWeight='600'>Hello there, Ngô</Heading>
          <Text color='gray.500' fontWeight='400'>Pick a customer from the left menu and start your conversation</Text>
        </Stack>
      </Stack>
    </Box>
  )
}

ChatDashboard.getLayout = function(page) {
  return (
    <ChatLayout>
      {page}
    </ChatLayout>
  )
}