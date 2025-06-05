import { useState, createContext, useContext } from "react";

// Create the context
const Context = createContext();

// Create the provider
const Provider = ({ children }) => {
  const [user, setUser] = useState([]);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;

// Custom hook to access the context
export const useUser = () => useContext(Context);
