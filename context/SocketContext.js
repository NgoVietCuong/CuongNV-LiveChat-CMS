import React, { createContext, useContext } from "react";
import socket from "@/utils/socketIO";

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