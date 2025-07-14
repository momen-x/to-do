import "./App.css";
import ToDoCard from "./components/Card/ToDoCard";
// import context files
import { useListOfTask } from "./Context/ListIfTaskContext.jsx";
import { AlertShowHideProvider } from "./Context/AlertContext.jsx";

//external libarary
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//import react hooks
import { useEffect } from "react";
import { ListOfTaskProvider } from "./Context/ListIfTaskContext.jsx";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});

function AppContent() {
  const {tasks, dispatch} = useListOfTask();

  useEffect(() => {
    dispatch({
      type: "GET_TASKS",
      payload: {},
    });
  }, [dispatch]); // Removed 'tasks' from dependencies to avoid infinite loop

  return (
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
        <AlertShowHideProvider>
          <ToDoCard />
        </AlertShowHideProvider>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ListOfTaskProvider>
        <AppContent />
      </ListOfTaskProvider>
    </ThemeProvider>
  );
}

export default App;