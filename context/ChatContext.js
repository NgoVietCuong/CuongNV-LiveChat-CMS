import React, { createContext, useState, useContext, useEffect } from 'react';

const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [chatList, setChatList] = useState([]);
  const [chatMessages, setChatMessages] = useState({});

  useEffect(() => {
    const storeChatList = JSON.parse(sessionStorage.getItem('chatList'));
    if (storeChatList) {
      setChatList(storeChatList);
    }

    const storeChatMessages = JSON.parse(sessionStorage.getItem('chatMessages'));
    if (storeChatMessages) {
      setChatMessages(storeChatMessages);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('chatList', JSON.stringify(chatList));
  }, [chatList]);

  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(chatMessages))
  }, [chatMessages]);

  return (
    <ChatContext.Provider value={{ chatList, setChatList, chatMessages, setChatMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  return useContext(ChatContext);
}