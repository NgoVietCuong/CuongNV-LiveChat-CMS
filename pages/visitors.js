import { Box, Heading, Card, CardBody, Stack } from "@chakra-ui/react";
import { useAppContext } from "@/context/AppContext";
import VisitorList from "@/components/VisitorList";
import EmptyVisitorList from "@/components/EmptyState/EmptyVisitorList";

export default function Visitors({ jwt }) {
  const { onlineVistors } = useAppContext();

  return (
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
      <Stack w='80%' margin='auto' py={12} spacing={10}>
        <Heading color='#283d52' fontSize='27px' fontWeight='500'>Online Visitors</Heading>
        <Card boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
          <CardBody>
            {(onlineVistors.length > 0) && <VisitorList visitors={onlineVistors} jwt={jwt} />}
            {!onlineVistors.length && <EmptyVisitorList />}
          </CardBody>
        </Card>
      </Stack>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const jwt = req.cookies.nvcJWT;
  const domain = req.cookies['shop'];

  return {
    props: {
      domain,
      jwt
    }
  };
}