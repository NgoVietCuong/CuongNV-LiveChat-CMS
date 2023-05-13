import { Avatar, AvatarBadge, Box, Heading, Stack, Text, Badge } from "@chakra-ui/react";

export default function ChatUser({ name, message, bg, isSelected }) {
  return (
    <>
    {isSelected ? (
      <Box p={3} mb='8px' w='100%' bg='twitter.600' borderRadius='xl' cursor='pointer' boxShadow='0px 3px 7px rgba(0,0,0,.3)'>
        <Stack direction='row' alignItems='center' justifyContent='space-between' >
          <Stack direction='row' spacing={4}>
            <Avatar name={name} size='sm' bg='white' color={bg} boxSize='2.2rem'>
              <AvatarBadge boxSize='1em' bg='green.500' />
            </Avatar>

            <Stack spacing={1}>
              <Heading size='xs' color='white'>{name}</Heading>
              <Text fontSize='xs' color='white'>{message}</Text>
            </Stack>
          </Stack>

          <Stack spacing={1.}>
            <Text fontSize='xs' color='white'>11:20</Text>
            <Badge borderRadius='50%' bg='white' w='fit-content' color='twitter.600' fontSize='0.5em'></Badge>
          </Stack>
        </Stack>
      </Box>
    ) : (
      <Box p={3} mb='8px!important' w='100%' bg='white' borderRadius='xl' cursor='pointer' boxShadow='0px 2px 4px rgba(0,0,0,0.1)'>
        <Stack direction='row' alignItems='center' justifyContent='space-between' >
          <Stack direction='row' spacing={4}>
            <Avatar name={name} size='sm' bg={bg} color='white' boxSize='2.2rem'>
              <AvatarBadge boxSize='1em' bg='green.500' />
            </Avatar>

            <Stack spacing={1}>
              <Heading size='xs'>{name}</Heading>
              <Text fontSize='xs' color='gray.500'>{message}</Text>
            </Stack>
          </Stack>

          <Stack spacing={1.}>
            <Text fontSize='xs' color='gray.500'>9:35</Text>
            <Badge borderRadius='50%' bg='twitter.600' w='fit-content' color='white' fontSize='0.5em'></Badge>
          </Stack>
        </Stack>
      </Box>
    )}
    </>
  );
};