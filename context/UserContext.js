import React, { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <UserContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };