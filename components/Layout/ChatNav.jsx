import { Box, Heading, Input, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Divider, Badge } from "@chakra-ui/react";
import ChatUser from "../ChatUser";
import { useState } from "react";

export default function ChatNav() {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Box
      w='300px'
      h='100vh'
      bg='#F8FAFF'
      boxShadow='0px 0px 2px rgba(0, 0, 0, 0.25)'
    >
      <Stack p={5} spacing={6} h='100%' maxH='100vh'>
        <Stack spacing={6}>
          <Heading fontSize='2xl'>Chats</Heading>      
          <Input placeholder='Search' size='sm' borderRadius='full' bg='white'/>
        </Stack>
          
        <Divider borderColor="blackAlpha.300" />

        <Stack flexGrow={1}>
          <Tabs variant='solid-rounded' size='sm' colorScheme='twitter' isLazy index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>Unassigned</Tab>
              <Tab>Open</Tab>
              <Tab>Solved</Tab>
            </TabList>

            <TabPanels flexGrow={1}>
              <TabPanel p={0} my={5}>
                <ChatUser name={'Kim Anh'} message={'Damn you'} bg={'pink.400'} isSelected={false} />
              </TabPanel>
              <TabPanel p={0} my={5}>
                <Stack>
                  <ChatUser name={'Nguyen Hoa'} message={"I'm so cute :3"} bg={'blue.400'} isSelected={true} />
                  <ChatUser name={'Ngo Cuong'} message={'Wild flower'} bg={'teal.400'} isSelected={false} />
                  <ChatUser name={'Duc Dat'} message={'I miss Duong so much'} bg={'purple.400'} isSelected={false} />
                </Stack>
              </TabPanel>
              <TabPanel p={0} my={5}>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  );
};