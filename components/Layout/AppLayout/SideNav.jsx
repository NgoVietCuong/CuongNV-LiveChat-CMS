import { Box, Stack, Image, IconButton, Divider, Icon, Switch, Avatar, AvatarBadge, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faUser, faHome, faGear, faChartArea } from '@fortawesome/free-solid-svg-icons';
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
    boxShadow: '0px 4px 8px rgba(61,65,67,.2)'
  },
  '&:active': {
    transform: "scale(0.9)",
    transition: "transform 0.1s ease-in-out",
    boxShadow: '0px 4px 8px rgba(61,65,67,.2)'
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

  return (
    <Box w='90px' h='100vh' bg='whiteAlpha.900' boxShadow='0px 0px 4px rgba(0, 0, 0, 0.25)'>
      <Stack py={3} h='100%' direction='column' alignItems='center' justifyContent='space-between'>
        <Stack spacing={5} direction='column' alignItems='center'>
          <Box p={1} w='56px' h='56px' bg='blue.300' borderRadius='xl' boxShadow='0px 4px 8px rgba(61,65,67,.2)'>
            <Image src={'/logo.ico'} borderRadius='xl' />
          </Box>

          <Stack w='max-content' spacing={5} direction='column' alignItems='center'>
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
            
            <Tooltip label='Visitors' placement='right'>
              <Box>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faUser} />} bg='whiteAlpha.900' onClick={() => handleNavigation('/visitors')} sx={isSelected('/visitors') ? selectedNavigation: normalNavigation} />
              </Box>
            </Tooltip>
            
            <Tooltip label='Analytics' placement='right'>
              <Box>
                <IconButton icon={<Icon as={FontAwesomeIcon} icon={faChartArea} />} bg='whiteAlpha.900' onClick={() => handleNavigation('/analytics')} sx={isSelected('/analytics') ? selectedNavigation: normalNavigation} />
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