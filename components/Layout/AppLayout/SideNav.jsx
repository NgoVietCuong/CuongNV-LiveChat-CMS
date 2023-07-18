import { Box, Stack, Image, IconButton, Divider, Icon, Switch, Avatar, AvatarBadge, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faUser, faHome, faGear, faChartArea, faAddressBook, faRobot } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from "@/context/UserContext";

const selectedNavigation = {
  bg: 'blue.300',
  borderRadius: 'xl',
  color: 'white',
  boxShadow: '0px 4px 8px rgba(61,65,67,.2)',
  '&:hover': {
    bg: 'blue.300'
  },
  '&:active': {
    transform: "scale(0.9)",
    transition: "transform 0.1s ease-in-out",
    boxShadow: '0px 4px 8px rgba(61,65,67,.2)'
  },
}

const normalNavigation = {
  color: 'gray.600',
  borderRadius: 'xl',
  '&:hover': {
    bg: 'gray.300',
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
  '&:active': {
    transform: "scale(0.9)",
    transition: "transform 0.1s ease-in-out",
    boxShadow: '0 4px 8px rgba(61,65,67,.2)'
  },
}

export default function SideNav() {
  const router = useRouter();
  const { isDarkMode, setIsDarkMode } = useContext(UserContext);

  const handleNavigation = (path) => {
    router.push(path);
  }

  const isSelected = (path) => {
    const isRoot = path === '/';
    if (isRoot) {
      return router.pathname === path;
    } else {
      return router.pathname.includes(path);
    } 
  }

  const hasSubNav = () => {
    if (router.pathname.includes('/chats') || router.pathname.includes('/settings')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Box w='90px' h='100vh' bg='whiteAlpha.900' boxShadow={hasSubNav() ? '0px 0px 2px rgba(0, 0, 0, 0.25)': '0 2px 6px rgba(61,65,67,.2)'} zIndex='5'>
      <Stack w='100%' minWidth='90px' h='100%' py={3} direction='column' alignItems='center' justifyContent='space-between'>
        <Stack w='100%' spacing={5} direction='column' alignItems='center'>
          <Box p={1} w='56px' h='56px' bg='blue.300' borderRadius='xl' boxShadow='0px 4px 8px rgba(61,65,67,.2)'>
            <Image src={'/logo.ico'} borderRadius='xl' />
          </Box>

          <Stack w='fit-content' spacing={5} direction='column' alignItems='center'>
            <Tooltip label='Dashboard' placement='right'>
              <Box>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faHome} />} bg='whiteAlpha.900' onClick={() => handleNavigation('/')} sx={isSelected('/') ? selectedNavigation: normalNavigation} />
              </Box>
            </Tooltip>
            
            <Tooltip label='Chat' placement='right'>
              <Box>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faMessage} />} bg='whiteAlpha.900' onClick={() => handleNavigation('/chats')} sx={isSelected('/chats') ? selectedNavigation: normalNavigation} />
              </Box>
            </Tooltip>
            
            <Tooltip label='Contacts' placement='right'>
              <Box>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faAddressBook} boxSize='19px' />} bg='whiteAlpha.900' onClick={() => handleNavigation('/contacts')} sx={isSelected('/contacts') ? selectedNavigation: normalNavigation} />
              </Box>
            </Tooltip>

            <Tooltip label='Online Visitors' placement='right'>
              <Box>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faUser} />} bg='whiteAlpha.900' onClick={() => handleNavigation('/visitors')} sx={isSelected('/visitors') ? selectedNavigation: normalNavigation} />
              </Box>
            </Tooltip>
            
            <Tooltip label='ChatBots' placement='right'>
              <Box>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faRobot} boxSize='20px' />} bg='whiteAlpha.900' onClick={() => handleNavigation('/chatbots')} sx={isSelected('/chatbots') ? selectedNavigation: normalNavigation} />
              </Box>
            </Tooltip>
            
            <Divider w='64px' borderColor='blackAlpha.300'/>

            <Tooltip label='Settings' placement='right'>
              <Box>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faGear} />} bg='whiteAlpha.900' onClick={() => handleNavigation('/settings')} sx={isSelected('/settings') ? selectedNavigation: normalNavigation} />
              </Box>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack py={10} spacing={8} direction='column' alignItems='center'>
          <Switch sx={{
              "& .chakra-switch__track": {
                bg: isDarkMode ? "blue.300" : "gray.300",
              },
            }} onChange={() => {setIsDarkMode(!isDarkMode)}}/>
          <Avatar name='Ngo Cuong' bg='blue.300' color='white' size='sm' boxSize='2.2rem'>
            <AvatarBadge boxSize='12px' bg='green.500' />
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  )
}