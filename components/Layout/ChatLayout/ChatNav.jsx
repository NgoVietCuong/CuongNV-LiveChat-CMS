import { Box, Heading, Icon, Input, InputGroup, InputLeftElement, Stack, Text} from "@chakra-ui/react";
import ChatUser from "../../ChatUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function ChatNav({ users }) {
  return (
    <Box w='300px' h='100vh' bg='whiteAlpha.900' boxShadow='0px 0px 2px rgba(0, 0, 0, 0.25)'>
      <Stack spacing={0} h='100%' maxH='100vh' justifyContent='flex-start'>
        <Stack px={5} pt={5} pb={2} spacing={6}>
          <Heading color='blackAlpha.800' fontSize='27px' fontWeight='500'>Chats</Heading>
          <InputGroup marginEnd={3}>
            <InputLeftElement children={<Icon as={FontAwesomeIcon} icon={faMagnifyingGlass} cursor='pointer' color='gray.400' />} />
            <Input placeholder='Search...' h='38px' border='none' borderRadius='8px' bg='gray.100' color='gray.600' fontSize='15px' focusBorderColor='transparent' sx={{'::placeholder': {fontSize: '15px', alignItems: 'center', color: 'gray.400'}}} />
          </InputGroup>    
          <Text mt={8} fontSize='16px' color='gray.500'>All chats</Text>  
        </Stack>

        <Stack p={3} flexGrow={1} spacing={2} overflowY='scroll'
          sx={{
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
          {users.map(user => (
            <>
              <ChatUser user={user} />
            </>
          ))}     
        </Stack>
      </Stack>
    </Box>
  )
}