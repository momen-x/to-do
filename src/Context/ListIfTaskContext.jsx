import { createContext, useReducer, useContext, useEffect } from "react";
import { ListOfReducer } from "../reducer/ListOfTask.js";

const ListOfContext = createContext([]);



function ListOfTaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(ListOfReducer, []);

  // Sync state to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem("toDoList", JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to save tasks to localStorage", err);
    }
  }, [tasks]);

  return (
    <ListOfContext.Provider value={{ tasks, dispatch }}>
      {children}
    </ListOfContext.Provider>
  );
}

function useListOfTask() {
  const context = useContext(ListOfContext);
  if (!context) {
    throw new Error("useListOfTask must be used within a ListOfTaskProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ListOfContext, ListOfTaskProvider, useListOfTask };