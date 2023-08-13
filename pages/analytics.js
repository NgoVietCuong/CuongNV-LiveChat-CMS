import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, CardHeader, CardBody, Flex, Heading, Stack } from "@chakra-ui/react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer  } from 'recharts';
import generatePreviousDays from '@/utils/generateDates';
import OverViewItem from '@/components/Analytics/OverviewItem';
import AnalyticsSkeleton from '@/components/Skeleton/AnalyticsSkeleton';

export default function Analytics({ jwt }) {
  const [analytics, setAnalytics] = useState({});
  const [maxValue, setMaxValue] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setIsFetching(true);
    const analyticsRes = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/analytics`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });
    
    const analyticsData = analyticsRes.data;
    if (analyticsData && analyticsData.statusCode === 200) {
      const listDays = generatePreviousDays();
      const chatActivities = analyticsData.payload.chatActivities;
      const newChatActivites = [];

      listDays.forEach((day) => {
        const chatActivity = chatActivities.find(activity => activity.date === day);
        if (!chatActivity) {
          const newActivity = { date: day, Visitor: 0, Operator: 0}
          newChatActivites.unshift(newActivity);
        } else {
          const { Operator, Visitor } = chatActivity;
          const higherValue = Operator > Visitor ? Operator : Visitor;
          if (maxValue < higherValue) {
            setMaxValue(higherValue);
          }
          newChatActivites.unshift(chatActivity);
        }
      });

      analyticsData.payload.chatActivities = newChatActivites;
      setAnalytics(analyticsData.payload)
    }
    setIsFetching(false);
  }, [jwt]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);


  return (
    <Box w='auto' h='100vh' bg='gray.50' flexGrow={1} overflowY='scroll' sx={{
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
      <Stack w='80%' h='100%' margin='auto' py={12} spacing={10}>
        <Heading color='#283d52' fontSize='27px' fontWeight='500'>Analytics</Heading>
        {/* <AnalyticsSkeleton /> */}
        {isFetching && <AnalyticsSkeleton />}
        {!isFetching && (
          <Stack h='100%'>
            <Flex justifyContent='space-between' marginBottom='20px!important'>
              <OverViewItem header={'Opened Chat'} number={analytics.openedChat} />
              <OverViewItem header={'Waiting Chat'} number={analytics.waitingChat} />
              <OverViewItem header={'Closed Chat'} number={analytics.closedChat} />
              <OverViewItem header={'Contacts'} number={analytics.numberOfContacts} />
              <OverViewItem header={'Visitors'} number={analytics.numberOfVisitors} />
            </Flex>
            <Card flexGrow={1} boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
              <CardHeader>
                <Heading size='sm' color='#283d52'>Chat activities</Heading>
              </CardHeader>
              <CardBody h='100%'>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart width={500} height={300} data={analytics.chatActivities}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickCount={maxValue} domain={[0, maxValue]} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={50} />
                    <Bar dataKey="Visitor" fill="#4299E1" />
                    <Bar dataKey="Operator" fill="#4FD1C5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </Stack>
        )} 
      </Stack>
    </Box>
  )
}


export async function getServerSideProps(context) {
  const { req } = context;
  const jwt = req.cookies.nvcJWT;
  const domain = req.cookies['shop'];
  const shopId = req.cookies['shopId'];

  return {
    props: {
      jwt,
      domain,
      shopId
    }
  }
}