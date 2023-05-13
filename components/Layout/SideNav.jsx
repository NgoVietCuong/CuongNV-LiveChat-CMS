import { Box, Stack, Image, IconButton, Divider, Icon, Switch, Avatar, AvatarBadge, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faUser, faHome, faGear, faChartArea } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function SideNav() {
  const router = useRouter();

  return (
    <Box 
      w='90px'
      h='100vh'
      bg='#F0F4FA'
      boxShadow='0px 0px 2px rgba(0, 0, 0, 0.25)' 
    >
      <Stack
        py={3}
        h='100%'
        direction='column'
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack
          spacing={4}
          direction='column'
          alignItems='center'
        >
          <Box 
            p={1}
            w='56px'
            h='56px'
            bg='twitter.600'
            borderRadius='xl'
            boxShadow='0px 3px 5px rgba(0,0,0,.3)'
          >
            <Image src={'/logo.ico'} borderRadius='xl' />
          </Box>

          <Stack
            w='max-content'
            spacing={3}
            direction='column'
            alignItems='center'
          >
            <Tooltip label='Dashboard'>
              <Box p={1}>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faHome} onClick={() => router.push('/')} />} color='gray.600' />
              </Box>
            </Tooltip>
            
            <Tooltip label='Chat'>
              <Box p={1}>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faMessage} onClick={() => router.push('/chats')} />} bg='twitter.600' borderRadius='xl' color='white' boxShadow='0px 3px 5px rgba(0,0,0,.3)'/>
              </Box>
            </Tooltip>
            
            <Tooltip label='Visitors'>
              <Box p={1}>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faUser} onClick={() => router.push('/visitors')} />} color='gray.600' />
              </Box>
            </Tooltip>
            
            <Tooltip label='Analytics'>
              <Box p={1}>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faChartArea} onClick={() => router.push('/analytics')} />} color='gray.600' />
              </Box>
            </Tooltip>
            
            <Divider w='64px' borderColor='blackAlpha.300'/>

            <Tooltip label='Settings'>
              <Box p={1}>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faGear} onClick={() => router.push('/settings')} />} color='gray.600'/>
              </Box>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack py={10} spacing={8} direction='column' alignItems='center'>
          <Switch />
          <Avatar name='Ngo Cuong' bg='blue.500' color='white' size='sm' src='/crush.jpg' boxSize='2.2rem'>
            <AvatarBadge boxSize='1em' bg='green.500' />
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  );
};