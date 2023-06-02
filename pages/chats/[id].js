import React, { useEffect, useState } from 'react';
import ChatLayout from '@/components/Layout/ChatLayout';
import ChatArea from '@/components/ChatArea';
import { useRouter } from 'next/router';
import socket from '@/ultils/socketIO';

export default function ChatConversation() {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState([]);

  const handleConnect = () => {
    console.log('connect');
    socket.emit('join', id);
  }

  const handleReceiveMessage = (data) => {
    console.log('data', data);
    setMessages((preMessages) => [...preMessages, data]);
  }

  const sendMessage = (message) => {
    setMessages((preMessages) => [...preMessages, {type: 'reply', message: message}]);
    socket.emit('message', message);
  }

  useEffect(() => {  
    if (id) {
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
      setMessages([]);
    };
  }, [id]);

  return (
    <>
      <ChatArea key={id} messages={messages} onSendMessage={sendMessage} />
    </>
  )
}

ChatConversation.getLayout = function(page) {
  return (
    <ChatLayout>
      {page}
    </ChatLayout>
  )
}