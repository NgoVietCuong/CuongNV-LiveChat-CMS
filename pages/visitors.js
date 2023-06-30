import useSWR from 'swr';
import { useCallback, useEffect, useState } from "react";
import { Box, Heading, Card, CardBody, Stack } from "@chakra-ui/react";
import VisitorList from "@/components/VisitorList";
import EmptyVisitorList from "@/components/EmptyState/EmptyVisitorList";
import fetchData from '@/ultils/swr';

export default function Visitors({ jwt }) {
  const [visitors, setVisitors] = useState([]);

  const { data, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_SERVER_URL}/visitors/online`, jwt],
    fetchData,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      refreshInterval: 1000
    }
  );

  useEffect(() => {
    if (data && (data.statusCode === 200 || data.statusCode === 404)) {
      setVisitors(data.payload);
    }
  }, [jwt, data]);

  return (
    <Box w='auto' h='100%' bg='gray.50' flexGrow={1}>
      <Stack w='80%' margin='auto' py={12} spacing={10}>
        <Heading color='#283d52' fontSize='27px' fontWeight='500'>Online Visitors</Heading>
        <Card boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
          <CardBody>
            {(visitors.length > 0) && <VisitorList visitors={visitors} />}
            {!visitors.length && <EmptyVisitorList />}
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