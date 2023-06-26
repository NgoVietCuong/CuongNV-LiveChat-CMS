import { Avatar, AvatarBadge, Box, Card, CardBody, Heading, Icon, IconButton, Image, Input, Stack, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ChatArea({ messages, onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }

  return (
    <Stack p={4} w='auto' h='100vh' maxH='100vh' bg='gray.50' flexGrow={1} spacing={0}>
      <Stack w='100%' h='100%' bg='white' borderRadius='md' spacing={0} boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
        <Box p={4} w='100%' h='70px' bg='whiteAlpha.900' borderRadius='xl'>
          <Stack w='100%' h='100%' direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' spacing={3}>
              <Avatar name='Nguyen Hoa' size='sm' bg='blue.300' color='white' boxSize='2.4rem'>
                <AvatarBadge boxSize='12px' bg='green.500' />
              </Avatar>

              <Stack spacing={1}>
                <Heading fontSize='15px' fontWeight='500' color='#353535'>Nguyen Hoa</Heading>
                <Text fontSize='12px' color='gray.500'>Online</Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <Box p={3} w='100%' bg='gray.50' flexGrow={1} overflowY='scroll' 
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
          <Stack spacing={0.5}>
            {messages.map(({type, message}) => (
              <Stack direction='row' justifyContent={type=='income' ? 'flex-start': 'flex-end'}>
                <Box w='max-content' bg={type=='income' ? 'blackAlpha.100': 'blue.100'} px={4} py={1.5} borderRadius='8px'>
                  <Text fontSize='sm'>{message}</Text>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box p={2.5} w='100%' bg='whiteAlpha.900' borderRadius='xl'>
          <Stack px={4} direction='row' alignItems='center' spacing={1.5} justifyContent='space-between'>
            <IconButton size='sm' bg='blue.300' borderRadius='md' icon={<Icon as={FontAwesomeIcon} icon={faPaperclip} color='white'/>} sx={{'&:hover': {bg: 'blue.300'}}} />
            <Input placeholder='Type a messsage ...' color='gray.600' fontSize='15px' focusBorderColor='transparent' border='none' borderRadius='lg' sx={{'::placeholder': {color: 'gray.400'}}} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
            <IconButton size='sm' bg='gray.200' borderRadius='md' icon={<Icon as={FontAwesomeIcon} icon={faPaperPlane} color='black'/>} onClick={handleSendMessage} />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}