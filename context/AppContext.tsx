import axios from "axios";
import { createContext, ReactNode, useContext, useReducer } from "react";
import Reducer, { initialState } from "../stores/reducer";
import { ActionValues, State } from "../stores/types";

interface AppContextProps {
  state: State;
  dispatch: React.Dispatch<ActionValues>;
}
const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
