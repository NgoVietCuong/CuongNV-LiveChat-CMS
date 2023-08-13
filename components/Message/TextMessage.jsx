import { Box, Flex, Stack, Text } from "@chakra-ui/react"

export default function TextMessage({ message }) {
  return (
    <Flex w='100%' marginBottom='2px!important' justifyContent={message.sender !== 'Operator' ? 'flex-start': 'flex-end'}>
      <Box w='fit-content' maxW='60%' display='inline-block' overflowWrap='break-word' bg={message.sender !== 'Operator' ? 'blackAlpha.100': 'blue.100'} px={3} py={1.5} borderRadius='8px'>
        <Text fontSize='sm' whiteSpace="pre-line">{message.text}</Text>
      </Box>
    </Flex>
  )
}