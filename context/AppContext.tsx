import { createContext, ReactNode, useContext, useReducer } from "react";
import { API_URL } from "../config/constants";
import { DataService } from "../services/data/DataTypes";
import RestDataService from "../services/data/RestDataService";
import Reducer, { initialState } from "../stores/reducer";
import { ActionValues, State } from "../stores/types";

interface AppContextProps {
  state: State;
  dispatch: React.Dispatch<ActionValues>;
  dataService: DataService;
}
const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const dataService = RestDataService(API_URL);

  return (
    <AppContext.Provider value={{ state, dispatch, dataService }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
