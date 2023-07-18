import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ChatLayout from '@/components/Layout/ChatLayout';
import ChatArea from '@/components/ChatArea';
import socket from '@/ultils/socketIO';

export default function ChatConversation({ jwt, domain, id }) {
  const [messages, setMessages] = useState([]);
  const [shop, setShop] = useState(null);
  const [visitor, setVisitor] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  console.log(messages)

  const fetchConversation = useCallback(async () => {
    setIsFetching(true);
    const convsersationRes = await axios({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });

    const conversationData = convsersationRes.data;
    if (conversationData && conversationData.statusCode === 200) {
      console.log(conversationData)
      setShop(conversationData.payload.shop);
      setVisitor(conversationData.payload.visitor);
      setMessages(conversationData.payload.messages);
    }
    setIsFetching(false);
  }, [jwt]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  const handleConnect = () => {
    socket.emit('join', visitor._id);
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
      {isFetching && <></>}
      {!isFetching && <ChatArea key={id} id={id} domain={domain} messages={messages} onSendMessage={sendMessage} visitor={visitor} shop={shop} />}
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const jwt = req.cookies['nvcJWT'];
  const domain = req.cookies['shop'];
  const id = query.id
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