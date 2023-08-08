import { Box, Heading } from "@chakra-ui/react";

export default function EmptyContactList() {
  return (
    <Box h='200px' w='100%' display='flex' alignItems='center' justifyContent='center'>
      <Heading fontSize='20px' color='#283d52' fontWeight='500' textAlign='center'>Sorry, we couldn't find any contacts</Heading>
    </Box>
  )
}