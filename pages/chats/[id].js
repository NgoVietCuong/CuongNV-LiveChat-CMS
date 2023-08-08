import useSWR from 'swr';
import React, { useEffect, useState  } from 'react';
import socket from '@/utils/socketIO';
import fetchData from '@/utils/swr';
import ChatLayout from '@/components/Layout/ChatLayout';
import ChatArea from '@/components/ChatArea';
import ChatAreaSkeleton from '@/components/Skeleton/ChatAreaSkeleton';

export default function ChatConversation({ jwt, domain, id }) {
  const [shop, setShop] = useState(null);
  const [visitor, setVisitor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const { data } = useSWR(
    [`${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${id}`, jwt],
    fetchData,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  );

  useEffect(() => {
    setIsFetching(true);
    if (data && (data.statusCode === 200 || data.statusCode === 404)) {
      setShop(data.payload.shop);
      setVisitor(data.payload.visitor);
      setMessages(data.payload.messages);
      setIsFetching(false);
    }
  }, [id, jwt, data]);

  const handleConnect = () => {
    socket.emit('join', { visitorId: visitor._id, domain: domain });
  }

  const handleReceiveMessage = (data) => {
    setMessages((preMessages) => [...preMessages, data]);
    const messagesContainer = document.querySelector('#nvc_messages_container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    const textarea = document.querySelector('#nvc_messaage_textarea');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const sendMessage = (data) => {
    setMessages([...messages, ...data]);
    socket.emit('message', data);
    const messagesContainer = document.querySelector('#nvc_messages_container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  useEffect(() => {  
    if (id && visitor) {
      socket.connect();
      socket.on('connect', handleConnect);
      socket.on('message', handleReceiveMessage);
    }
  
    // Cleanup function
    return () => {
      socket.off('connect', handleConnect);
      socket.off('message', handleReceiveMessage);
      socket.off('join');
      socket.disconnect();
    };
  }, [id, visitor]);

  return (
    <>
      {isFetching && <ChatAreaSkeleton />}
      {!isFetching && <ChatArea key={id} id={id} domain={domain} messages={messages} onSendMessage={sendMessage} visitor={visitor} shop={shop} />}
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const jwt = req.cookies['nvcJWT'];
  const domain = req.cookies['shop'];
  const id = query.id;
  
  return {
    props: {
      jwt,
      domain,
      id
    }
  }
}

ChatConversation.getLayout = function(page) {
  return (
    <ChatLayout jwt={page.props.jwt}>
      {page}
    </ChatLayout>
  )
}