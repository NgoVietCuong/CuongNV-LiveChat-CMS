import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";
import { Box, Heading, Icon, Input, InputGroup, InputLeftElement, Stack, Text, Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react";
import ChatUser from "../../ChatUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from '@/context/AppContext';

const notification = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minW: '12px',
  h: '12px',
  color: 'white',
  borderRadius: '5px',
  p: '0px 4px',
  fontSize: '8px',
  lineHeight: '12px',
  letterSpacing: '0em',
  position: 'absolute',
  right: '8px',
  bottom: '12px'
}

export default function ChatNav({ jwt }) {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const { waitingChats, openChats, closedChats } = useAppContext();
  const [displayWaitingChats, setDisplayWaitingChats] = useState(waitingChats)
  const [displayOpenChats, setDisplayOpenChats] = useState(openChats);
  const [displayClosedChats, setDisplayClosedChats] = useState(closedChats);

  const handleSearchChat = useCallback((e) => {
    const value = e.target.value;
    setQueryValue(value);

    if (value.length === 0 || value.trim() === '') {
      setDisplayWaitingChats(waitingChats);
      setDisplayOpenChats(openChats);
      setDisplayClosedChats(closedChats);
    } else {
      const newWaitingChats = waitingChats.filter(chat => chat.visitor.name.toLowerCase().includes(value.trim().toLowerCase()));
      const newOpenChats = openChats.filter(chat => chat.visitor.name.toLowerCase().includes(value.trim().toLowerCase()));
      const newClosedChats = closedChats.filter(chat => chat.visitor.name.toLowerCase().includes(value.trim().toLowerCase()));
      setDisplayWaitingChats(newWaitingChats);
      setDisplayOpenChats(newOpenChats);
      setDisplayClosedChats(newClosedChats);
    }
  }, [displayWaitingChats, displayOpenChats, displayClosedChats]);

  useEffect(() => {
    setDisplayWaitingChats(waitingChats);
    setDisplayOpenChats(openChats);
    setDisplayClosedChats(closedChats);
  }, [waitingChats, openChats, closedChats]);

  useEffect(() => {
    if (router.pathname === '/chats/[id]') {
      const id = router.query.id;
      const openChat = openChats.find(chat => chat._id === id);
      const waitingChat = waitingChats.find(chat => chat._id === id);
      const closedChat = closedChats.find(chat => chat._id === id);

      if (openChat) {
        setTabIndex(0);
      } else if (waitingChat) {
        setTabIndex(1);
      } else if (closedChat) {
        setTabIndex(2);
      } 
    }
  }, []);

  return (
    <Box w='300px' h='100vh' bg='whiteAlpha.900' boxShadow='0 2px 6px rgba(61,65,67,.2)' zIndex='4'>
      <Stack w='100%' maxW='300px' h='100%' maxH='100vh' spacing={2} justifyContent='flex-start'>
        <Stack px={4} pt={5} pb={2} spacing={6}>
          <Heading color='#283d52' fontSize='27px' fontWeight='500'>Inbox</Heading>
          <InputGroup marginEnd={3}>
            <InputLeftElement children={<Icon as={FontAwesomeIcon} icon={faMagnifyingGlass} cursor='pointer' color='gray.400' />} />
            <Input placeholder='Search...' h='38px' border='none' borderRadius='4px' bg='gray.100' color='gray.600' fontSize='15px' focusBorderColor='transparent' sx={{'::placeholder': {fontSize: '15px', alignItems: 'center', color: 'gray.400'}}} value={queryValue} onChange={handleSearchChat} />
          </InputGroup>    
          <Text mt={2} fontSize='sm' color='gray.500'>Live chats</Text>  
        </Stack>

        <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} px={3} variant='enclosed'>
          <TabList  justifyContent='space-between'>
            <Tab fontSize='15px' w='38%' position='relative'>Open{openChats.filter(chat => chat.read === false).length > 0 && <Text bg='red.500' sx={notification}>{openChats.filter(chat => chat.read === false).length}</Text>}</Tab>
            <Tab fontSize='15px' w='48%' position='relative'>Waiting{waitingChats.length > 0 && <Text bg='red.500' sx={notification}>{waitingChats.length}</Text>}</Tab>
            <Tab fontSize='15px' w='43%' position='relative'>Closed</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <Stack px={1} py={5} flexGrow={1} spacing={2} overflowY='scroll'
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
                {displayOpenChats.length && displayOpenChats.map(chat => (
                  <>
                    <ChatUser chat={chat} jwt={jwt} />
                  </>
                ))}
                {!displayOpenChats.length && <Text py={20} px={3} fontSize='14px' fontWeight='400' color='gray.600'>You have no open conversations at the moment</Text>}     
              </Stack>
            </TabPanel>

            <TabPanel p={0}>
              <Stack px={1} py={5} flexGrow={1} spacing={2} overflowY='scroll'
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
                {displayWaitingChats.length && displayWaitingChats.map(chat => (
                  <>
                    <ChatUser chat={chat} jwt={jwt} />
                  </>
                ))}
                {!displayWaitingChats.length && <Text py={20} px={3} fontSize='14px' fontWeight='400' color='gray.600'>You have no waiting conversations at the moment</Text>}
              </Stack>
            </TabPanel>

            <TabPanel p={0}>
              <Stack px={1} py={5} flexGrow={1} spacing={2} overflowY='scroll'
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
                {displayClosedChats.length && displayClosedChats.map(chat => (
                  <>
                    <ChatUser chat={chat} jwt={jwt} />
                  </>
                ))}
                {!displayClosedChats.length && <Text py={20} px={3} fontSize='14px' fontWeight='400' color='gray.600'>You have no closed conversations at the moment</Text>}  
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  )
}