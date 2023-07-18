import { Avatar, AvatarBadge, Box, Heading, Stack, Text, Icon, Flex, Divider, Grid, GridItem  } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faCheck, faReply } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import timeConverter from '@/ultils/timeConveter';

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

export default function ChatUser({ chat }) {
  const { read, updated_at } = chat;
  const { name, email, active, avatar } = chat.visitor;
  const { sender, text } = chat.lastMessage;

  const router = useRouter();

  const isSelected = (id) => {
    if (router.query.id === id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Link href='/chats/[id]' as={`/chats/${chat._id}`}>
      <Box key={chat._id} cursor='pointer' sx={isSelected(chat._id) ? selectedUser : normalUser } borderRadius='md'>
        <Grid
          px={3}
          py={2.5}
          templateAreas={`'avatar name time'
                          'avatar email time'
                          'message message message'`}
          gridTemplateColumns={'1.3fr 4.5fr 1.7fr'}
          gap={0}
        >
          <GridItem area='avatar'>
            <Avatar name={name} bg={avatar} size='sm' color='white' boxSize='35px'>
              <AvatarBadge boxSize='12px' bg={ active ? 'green.500': 'gray.300'} />
            </Avatar>
          </GridItem>
          <GridItem area='name' alignSelf="end">
            <Heading fontSize='14px' fontWeight='500' color='#283d52'>{(name.length > 18) ? name.substring(0, 16) + '...' : name}</Heading>
          </GridItem>
          <GridItem area='email' alignSelf='start'>
            <Text fontSize='12px' color='gray.500'>{(email.length > 18) ? email.substring(0, 17) + '...' : email}</Text>
          </GridItem>
          <GridItem area='time' justifySelf='center'>
            <Text fontSize='12px' color='gray.500'>{timeConverter(updated_at)}</Text>
          </GridItem>
          <GridItem area='message' mt='8px' alignSelf='center'>
            <Flex justifyContent='space-between' alignItems='flex-end'>
              {/* <Text fontSize='12px' color={(sender === 'Visitor' && !read) ? 'gray.700' : 'gray.500'} fontWeight={read ? '400' : '500'}>{(text.length > 31) ? text.substring(0, 29) + '...' : text}</Text> */}
              {(sender === 'Visitor' && !read) && <Icon me='5px' boxSize='14px' color='blue.300' as={FontAwesomeIcon} icon={faInbox} alignSelf='center' />} 
              {(sender === 'Visitor' && read) && <Icon me='5px' boxSize='14px' color='gray.300' as={FontAwesomeIcon} icon={faInbox} alignSelf='center' />}
              {(sender === 'Operator') && <Icon me='5px' boxSize='14px' color='gray.300' as={FontAwesomeIcon} icon={faReply} alignSelf='center' />}
            </Flex>
          </GridItem>
        </Grid>
        <Divider borderColor='gray.200' w="94%" m='auto' />
      </Box>
    </Link>
  );
};