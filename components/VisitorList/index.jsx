import { Avatar, AvatarBadge, Button, Heading, Stack, Icon, Table, Thead, Tbody, Tr, Th, Td, TableContainer,Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

const chatButtonStyle = {
  h: '36px',
  '&:hover': {
    bg: 'blue.500',
    color: 'white',
    borderColor: 'blue.500',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
  '&:active': {
    transform: "scale(0.9)",
    transition: "transform 0.1s ease-in-out",
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
}

export default function VisitorList({ visitors }) {
  return (
    <>
      <TableContainer w='100%'>
        <Table variant='simple' size='md'>
            <Thead bg='gray.50'>
              <Tr>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Name</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Type</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Location</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Device</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>OS</Text></Th>
                <Th><Text color='#8c9191' fontWeight='500' fontSize='sm' textTransform='none'>Browser</Text></Th>
                <Th display='flex' justifyContent='center'><Text color='#8c9191' fontWeight='600' fontSize='sm' textTransform='none'>Actions</Text></Th>
              </Tr>
            </Thead>
            <Tbody>
              {visitors.map((visitor) => (
                <Tr cursor='pointer'>
                  <Td>
                    <Stack direction='row' alignItems='center'>
                      <Avatar size='sm' name={visitor.name ? visitor.name : visitor.key.split('-')[0]} bg={visitor.avatar} color='white'>
                        <AvatarBadge boxSize='11px' bg='green.500' />
                      </Avatar>
                      <Heading fontSize='14px' fontWeight='500' color='#283d52'>{visitor.name ? visitor.name : visitor.key.split('-')[0]}</Heading>
                    </Stack>                    
                  </Td>
                  <Td><Text fontSize='14px'>{`${visitor.type} visitor`}</Text></Td>
                  <Td><Text fontSize='14px'>{`${visitor.location}, ${visitor.country}`}</Text></Td>
                  <Td><Text fontSize='14px'>{visitor.device}</Text></Td>
                  <Td><Text fontSize='14px'>{visitor.os}</Text></Td>
                  <Td><Text fontSize='14px'>{visitor.browser}</Text></Td>
                  <Td display='flex' justifyContent='center'>
                      <Button sx={chatButtonStyle} size='sm' colorScheme='blue' variant='outline' leftIcon={<Icon as={FontAwesomeIcon} icon={faMessage} boxSize={4} />}>Chat</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
      </TableContainer>
    </>
  )
}