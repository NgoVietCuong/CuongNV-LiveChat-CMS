import { Avatar, AvatarBadge, Box, Card, CardBody, Heading, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faLink } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";


export default function ChatArea() {
  return (
    <>
      <Stack w='auto' h='100%' maxH='100vh' flexGrow={1} boxShadow='0px 0px 2px rgba(0, 0, 0, 0.25)' spacing={0}>
        <Box p={4} w='100%' h='70px' bg='#F8FAFF' >
          <Stack w='100%' h='100%' direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' spacing={3}>
              <Avatar name='Nguyen Hoa' size='sm' bg='blue.500' color='white' boxSize='2.2rem'>
                <AvatarBadge boxSize='1em' bg='green.500' />
              </Avatar>

              <Stack spacing={0.2}>
                <Heading size='xs'>Nguyen Hoa</Heading>
                <Text fontSize='xs' color='gray.500'>Online</Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <Box p={3} w='100%' bg='#F0F4FA' flexGrow={1}>
          <Stack spacing={3}>
            {/*Income text message */}
            <Stack direction='row' justifyContent='flex-start'>
              <Box w='max-content' bg='white' px={4} py={2} borderRadius='xl' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
                <Text fontSize='sm'>Hi, how are you ?</Text>
              </Box>
            </Stack>

            {/*Reply text message */}
            <Stack direction='row' justifyContent='flex-end'>
              <Box w='max-content' bg='twitter.600' color='white' px={4} py={2} borderRadius='xl' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
                <Text fontSize='sm'>I'm fine, thank you</Text>
              </Box>
            </Stack>

            {/*Income text message */}
            <Stack direction='row' justifyContent='flex-start'>
              <Box w='max-content' bg='white' px={4} py={2} borderRadius='xl' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
                <Text fontSize='sm'>This is the most beautiful flower, isn't it?</Text>
              </Box>
            </Stack>

            {/*Icome media message */}
            <Stack direction='row' justifyContent='flex-start'>
              <Box w='max-content'>
                <Image maxH='200px' borderRadius='xl' boxShadow='0px 2px 5px rgba(0,0,0,0.1)' src='/flower.jpg' />
              </Box>
            </Stack>

            {/*Reply text message */}
            <Stack direction='row' justifyContent='flex-end'>
              <Box w='max-content' bg='twitter.600' color='white' px={4} py={2} borderRadius='xl' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
                <Text fontSize='sm'>I don't think so</Text>
              </Box>
            </Stack>

            {/*Reply link message */}
            <Stack direction='row' justifyContent='flex-end'>
              <Card w='max-content' borderRadius='xl' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
                <CardBody>
                  <Image maxH='200px' borderRadius='xl' src='/crush.jpg'/>

                  <Stack mt={2}>
                    <Heading size='md'>Rewolf28</Heading>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>

            {/*Reply text message */}
            <Stack direction='row' justifyContent='flex-end'>
              <Box w='max-content' bg='twitter.600' color='white' px={4} py={2} borderRadius='xl' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
                <Text fontSize='sm'>This is the most beautiful flower, and it's you :3</Text>
              </Box>
            </Stack>

            {/*Income text message */}
            <Stack direction='row' justifyContent='flex-start'>
              <Box w='max-content' bg='white' px={4} py={2} borderRadius='xl' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
                <Text fontSize='sm'>I'm so cute :3</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Box p={4} w='100%' bg='#F8FAFF'>
          <Stack direction='row' alignItems='center' spacing={3} justifyContent='space-between'>
            <InputGroup>
              <InputLeftElement children={<Icon as={FontAwesomeIcon} icon={faLink} cursor='pointer' color='gray.600' />} />
              <Input placeholder='Type a messsage ...'/>
              <InputRightElement children={<Icon as={FontAwesomeIcon} icon={faFaceSmile} cursor='pointer' color='gray.600' />} />
            </InputGroup>
            <IconButton size='md' bg='twitter.600' borderRadius='xl' icon={<Icon as={FontAwesomeIcon} icon={faPaperPlane} color='white'/>}/>
          </Stack>
        </Box>
      </Stack>
    </>
  )
}