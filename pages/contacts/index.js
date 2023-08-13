
import { Box, Heading, Card, CardBody, Stack } from '@chakra-ui/react';
import ContactList from '@/components/ContactList';

export default function Contacts({jwt}) {
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
        <Heading color='#283d52' fontSize='27px' fontWeight='500'>Contacts</Heading>
        <Card boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
          <CardBody>
            <ContactList jwt={jwt} />
          </CardBody>
        </Card>
      </Stack>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const jwt = req.cookies['nvcJWT'];
  const domain = req.cookies['shop'];
  const shopId = req.cookies['shopId'];

  return {
    props: {
      jwt,
      domain,
      shopId
    }
  };
}