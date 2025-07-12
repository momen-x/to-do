import "./App.css";
//project component
import ToDoCard from "./components/Card/ToDoCard";
// import context files
import { ListOfContext } from "./Context/ListIfTaskContext";


//external libarary
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { v4 as uuidv4 } from "uuid";
//import react hooks
import { useEffect, useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});

function App() {
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

  // Update localStorage whenever tasks change
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
            <ToDoCard />
          </ListOfContext.Provider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
