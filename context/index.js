import { createContext } from 'react';


const GlobalContext = createContext( undefined);
GlobalContext.displayName = "Global Context"

export default GlobalContext;
