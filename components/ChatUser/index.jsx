import { Avatar, AvatarBadge, Box, Heading, Stack, Text, Icon, Flex, Divider, Grid, GridItem  } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";

const avatarColorList = [
  'red.300',
  'orange.300',
  'green.300',
  'teal.300',
  'blue.300',
  'purple.300',
  'pink.300'
];

const selectedUser = {
  bg: 'blue.100',
  boxShadow: '0px 4px 8px rgba(61,65,67,.15)',
  '& hr': {
    borderColor: 'blue.100'
  }
}

const normalUser = {
  '&:hover': {
    bg: 'white',
    boxShadow: '0px 4px 8px rgba(61,65,67,.15)',
    '& hr': {
      borderColor: 'gray.100'
    }
  }
}

export default function ChatUser({ user }) {
  const { id, name, email, message, time } = user;
  const router = useRouter();

  const isSelected = (id) => {
    if (router.query.id === id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Link href='/chats/[id]' as={`/chats/${id}`}>
      <Box key={id} cursor='pointer' sx={isSelected(id) ? selectedUser : normalUser } borderRadius='md'>
        <Grid
          px={3}
          py={2.5}
          templateAreas={`"avatar name time"
                          "avatar email time"
                          "message message message"`}
          gridTemplateColumns={'1.3fr 4.5fr 1.6fr'}
          gap={0}
        >
          <GridItem area={'avatar'}>
            <Avatar name={name} bg={avatarColorList[Math.floor(Math.random() * 7)]} size='sm' color='white' boxSize='2.2rem'>
              <AvatarBadge boxSize='12px' bg='green.500' />
            </Avatar>
          </GridItem>
          <GridItem area={'name'} alignSelf="end">
            <Heading fontSize='14px' fontWeight='500' color='#283d52'>{name}</Heading>
          </GridItem>
          <GridItem area={'email'} alignSelf="start">
            <Text fontSize='12px' color='gray.500'>{email}</Text>
          </GridItem>
          <GridItem area={'time'} justifySelf="center">
            <Text fontSize='12px' color='gray.500'>{time}</Text>
          </GridItem>
          <GridItem area={'message'} mt='8px' alignSelf='center'>
            <Flex justifyContent='space-between' alignItems='flex-end'>
              <Text fontSize='xs' color='gray.500'>{message}</Text>
              {/* <Icon me='5px' boxSize='8px' color='blue.300' as={FontAwesomeIcon} icon={faCircle} alignSelf='center' />  */}
            </Flex>
          </GridItem>
        </Grid>
        <Divider borderColor='gray.200' w="94%" m='auto' />
      </Box>
    </Link>
  );
};