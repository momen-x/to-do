import "./App.css";

import ToDoCard from "./components/Card/ToDoCard";
// import context files
import { ListOfContext } from "./Context/ListIfTaskContext";
import { AlertShowHideProvider } from "./Context/AlertContext.jsx";

//external libarary
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//import react hooks
import { useEffect, useReducer} from "react";
import { ListOfReducer } from "./reducer/ListOfTask.js";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});

function App() {
 
 const getInitialTasks = () => {
  try {
    const storedTasks = localStorage.getItem("toDoList");
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error parsing stored tasks", error);
    return [];
  }
};

const [tasks, dispatch] = useReducer(ListOfReducer, getInitialTasks());

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "50px",
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "400px" },
            height: "300px",
            maxWidth: "400px",
          }}
        >
          <ListOfContext.Provider value={{ tasks, dispatch }}>
            <AlertShowHideProvider>
              <ToDoCard />
            </AlertShowHideProvider>
          </ListOfContext.Provider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
