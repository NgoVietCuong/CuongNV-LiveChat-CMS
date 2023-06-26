import { Box, Divider, Flex, Stack, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

export default function ChatBots() {
  return (
    <Box w='auto' h='100%' bg='gray.50' flexGrow={1}>
      <Flex w='85%' h='100%' m='auto' pt={20} justifyContent='space-between'>
        <Box w='280px' h='580px' mr='5' bg='whiteAlpha.900' borderRadius='md' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
          <Stack w='100%'>
            <Box pt={8} pb={6}>
              <Stack px={5} spacing={4}>
                <SkeletonCircle m='auto' size='14' startColor='gray.100' endColor='gray.300' />
                <SkeletonText mt='4' noOfLines={4} spacing='5' startColor='gray.200' endColor='gray.300' skeletonHeight='2' />
              </Stack>
            </Box>

            <Box>
              <Divider w='86%' m='auto' borderColor='gray.300' />
              <Stack px={5} spacing={4} py={5}>
                <SkeletonText mt='3' noOfLines={4} spacing='5' startColor='gray.200' endColor='gray.300' skeletonHeight='2' />
              </Stack>
            </Box>
            
            <Box>
              <Divider w='86%' m='auto' borderColor='gray.300' />
              <Stack px={5} spacing={4} py={4}>
                <SkeletonText mt='4' noOfLines={5} spacing='5' startColor='gray.200' endColor='gray.300' skeletonHeight='2' />
              </Stack>
              <Divider w='86%' m='auto' borderColor='gray.300' />
            </Box>
          </Stack>
        </Box>
        <Stack flexGrow={1} h='100%' spacing={5}>
          <Box p={5} h='50px' bg='whiteAlpha.900' borderRadius='md' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
            <Skeleton px={5} height='15px' w='20%' />
          </Box>
          <Box bg='whiteAlpha.900' p={5}>
            <Skeleton mt='3' height='20px' w='25%' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
          </Box>
          <Box bg='whiteAlpha.900' p={5}>
            <Skeleton mt='3' height='20px' w='25%' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
          </Box>
          <Box bg='whiteAlpha.900' p={5}>
            <Skeleton mt='3' height='20px' w='25%' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
            <Skeleton mt='3' height='11px' startColor='gray.200' endColor='gray.300' />
          </Box>
        </Stack>
      </Flex>
    </Box>
  )
}