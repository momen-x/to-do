import { createContext,useReducer,useContext } from "react";
import { ListOfReducer } from "./reducer/ListOfTask.js";

 const ListOfContext=createContext([]);

 export function ListOfTaskProvider({ children }) {
    const [tasks, dispatch] = useReducer(ListOfReducer, JSON.parse(localStorage.getItem("toDoList")) || []);

    return (
    <ListOfContext.Provider value={{tasks, dispatch}}>
      {children}
    </ListOfContext.Provider>
  );

}