import "./App.css";

import ToDoCard from "./components/Card/ToDoCard";
// import context files
import { ListOfContext } from "./Context/ListIfTaskContext";
import { AlertShowHideProvider } from "./Context/AlertContext.jsx";

//external libarary
import {  Box, } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//import react hooks
import { useEffect, useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});

function App() {
  // const [alert, setAlert] = useState({
  //   open: false,
  //   message: "",
  //   severity: "success",
  // });
 

  const [tasks, setTasks] = useState(() => {
    // Initialize state with localStorage data if it exists
    try {
      const savedTasks = localStorage.getItem("toDoList");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Failed to parse saved tasks", error);
      return [];
    }
  });

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
          <ListOfContext.Provider value={{ tasks, setTasks }}>
            <AlertShowHideProvider >
              <ToDoCard />
            </AlertShowHideProvider>
          </ListOfContext.Provider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
