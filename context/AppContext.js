import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [shopName, setShopName] = useState(null);
  const [waitingChats, setWaitingChats] = useState([]);
  const [openChats, setOpenChats] = useState([]);
  const [closedChats, setClosedChats] = useState([]);
  const [onlineVistors, setOnlineVisitors] = useState([]);

  useEffect(() => {
    const storeShopName = JSON.parse(sessionStorage.getItem('shopName'));
    if (storeShopName) {
      setShopName(storeShopName)
    }

    const storeWaitingChats = JSON.parse(sessionStorage.getItem('waitingChats'));
    if (storeWaitingChats) {
      setWaitingChats(storeWaitingChats);
    }

    const storeOpenChats = JSON.parse(sessionStorage.getItem('openChats'));
    if (storeOpenChats) {
      setOpenChats(storeOpenChats);
    }

    const storeClosedChats = JSON.parse(sessionStorage.getItem('closedChats'));
    if (storeClosedChats) {
      setClosedChats(storeClosedChats);
    }

    const storeOnlineVisitors = JSON.parse(sessionStorage.getItem('onlineVistors'));
    if (storeOnlineVisitors) {
      setOnlineVisitors(storeOnlineVisitors);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('shopName', JSON.stringify(shopName));
  }, [shopName]);

  useEffect(() => {
    sessionStorage.setItem('waitingChats', JSON.stringify(waitingChats));
  }, [waitingChats]);
  
  useEffect(() => {
    sessionStorage.setItem('openChats', JSON.stringify(openChats));
  }, [openChats]);

  useEffect(() => {
    sessionStorage.setItem('closedChats', JSON.stringify(closedChats));
  }, [closedChats]);

  useEffect(() => {
    sessionStorage.setItem('onlineVistors', JSON.stringify(onlineVistors));
  }, [onlineVistors]);

  return (
    <AppContext.Provider value={{ shopName, setShopName, waitingChats, setWaitingChats, openChats, setOpenChats, closedChats, setClosedChats, onlineVistors, setOnlineVisitors }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}