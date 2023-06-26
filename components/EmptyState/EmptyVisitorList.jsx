import { Box, Heading, Flex, Image, Stack, Text } from "@chakra-ui/react";

export default function EmptyVisitorList() {
  return (
    <Box>
      <Flex>
        <Stack w='50%' ml='10' py='20' spacing='10'>
          <Heading fontSize='30px' color='#283d52' fontWeight='500' >There are no visitors on your website right now</Heading>
          <Text w='80%' fontSize='20px'>This list will be updated automatically when you get visitors on your website</Text>
        </Stack>
        <Box w='50%'>
          {/* <Image src='/customer_support.jpg' boxSize='100%'/> */}
        </Box> 
      </Flex>
    </Box>
  )
}