import { useState } from "react";

import { createContext, useContext } from "react";

export const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [test, setTest] = useState("tescik-start");
  const [user, setUser] = useState({});
  let sharedState = {
    test,
    setTest,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
