import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/frontend`, { autoConnect: false });
const SocketContext = createContext(socket);

export function useSocketContext() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={useContext(SocketContext)}>
      {children}
    </SocketContext.Provider>
  )
}