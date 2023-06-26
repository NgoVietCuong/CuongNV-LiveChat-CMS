import { Box, Heading, Text } from "@chakra-ui/react";

export default function EmptyContactList() {
  return (
    <Box w='100%' h='100%'>
      <Heading fontSize='20px' color='#283d52' fontWeight='500' textAlign='center'>Sorry, we couldn't find any contacts</Heading>
    </Box>
  )
}