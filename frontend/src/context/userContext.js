import React, { createContext } from "react";

export const dataContext = createContext();

function UserContext({ children }) {
  const [user, setUser] = React.useState(null);
  const serverUrl = "http://localhost:9000";

  const value = {
    serverUrl,
    user,
    setUser,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;