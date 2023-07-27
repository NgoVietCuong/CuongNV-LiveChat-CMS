import { Avatar, AvatarBadge, Box, Flex, Stack, Skeleton, SkeletonText } from "@chakra-ui/react"

export default function ChatAreaSkeleton() {
  return (
    <Stack p={4} w='auto' h='100vh' maxH='100vh' bg='gray.50' flexGrow={1} spacing={0}>
      <Stack w='100%' h='100%' bg='white' borderRadius='md' spacing={0} boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
        <Box p={4} w='100%' h='70px' bg='whiteAlpha.900' borderRadius='xl'>
          <Flex w='100%' h='100%' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' spacing={3}>
              <Avatar size='sm' color='white' boxSize='38px'>
                <AvatarBadge boxSize='12px' bg='gray.300' />
              </Avatar>

              <Stack>
                <Skeleton h='12px' w='80px' mb={1} startColor='gray.200' endColor='gray.300' />
                <Skeleton h='10px' w='160px' startColor='gray.200' endColor='gray.300' />
              </Stack>
            </Stack>
          </Flex>
        </Box>

        <Box id='nvc_messages_container' p={3} w='100%' bg='gray.50' flexGrow={1}>
          <Stack w='100%' mb='25px'>
            <Skeleton w='15%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='30%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='30%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='25%' h='17px' startColor='gray.200' endColor='gray.300' />
          </Stack>

          <Stack mb='25px'>
            <Skeleton w='15%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='30%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='30%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='25%' h='17px' startColor='gray.200' endColor='gray.300' />
          </Stack>

          <Stack>
            <Skeleton w='15%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='30%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='30%' h='17px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='25%' h='17px' startColor='gray.200' endColor='gray.300' />
          </Stack>
        </Box> 

        <Box p={2.5} h='118.63px' minH='118.63px' w='100%' bg='whiteAlpha.900' borderRadius='xl'>
          <Stack px={4} py={1} spacing={3}>
            <Skeleton w='100%' h='30px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='45%' h='18px' startColor='gray.200' endColor='gray.300' />
            <Skeleton w='45%' h='18px' startColor='gray.200' endColor='gray.300' />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}