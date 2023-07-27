import axios from 'axios';
import { useChatContext } from '@/context/ChatContext';
import React, { useCallback, useEffect, useState  } from 'react';
import socket from '@/utils/socketIO';
import ChatLayout from '@/components/Layout/ChatLayout';
import ChatArea from '@/components/ChatArea';
import ChatAreaSkeleton from '@/components/Skeleton/ChatAreaSkeleton';

export default function ChatConversation({ jwt, domain, id }) {
  const { chatMessages, setChatMessages } = useChatContext();
  const [shop, setShop] = useState(null);
  const [visitor, setVisitor] = useState(null);
  const [messages, setMessages] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const fetchConversation = useCallback(async () => {
    setIsFetching(true);
    const conversationRes = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const conversationData = conversationRes.data;
    if (conversationData && conversationData.statusCode === 200) {
      setShop(conversationData.payload.shop);
      setVisitor(conversationData.payload.visitor);
      setMessages(conversationData.payload.messages);
    }
    setIsFetching(false);
  }, [id, jwt]);

  useEffect(() => {
    const storeChatList = JSON.parse(sessionStorage.getItem('chatList'));
    const storeChatMessages = JSON.parse(sessionStorage.getItem('chatMessages'));
    if (storeChatList && storeChatMessages && (id in storeChatMessages)) {
      const chatResult = storeChatList.find(chat => chat._id === id);
      setMessages(storeChatMessages[`${id}`]);
      setVisitor(chatResult.visitor);
      setShop(chatResult.shop);
      setIsFetching(false);
    } else {
      fetchConversation();
    }
  }, [fetchConversation]);

  useEffect(() => {
    const newChatMessages = {...chatMessages};
    newChatMessages[`${id}`] = messages;
    setChatMessages(newChatMessages);
  }, [messages]);

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
    <ChatLayout jwt={page.props.jwt} domain={page.props.domain}>
      {page}
    </ChatLayout>
  )
}