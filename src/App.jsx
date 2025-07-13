import "./App.css";

import ToDoCard from "./components/Card/ToDoCard";
// import context files
import { ListOfContext } from "./Context/ListIfTaskContext";
import { AlertShowHideContext } from "./Context/AlertContext";

//external libarary
import { Alert, Box, Snackbar } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//import react hooks
import { useEffect, useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});

function App() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
    const showAlert = (message, severity = "success") => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };
   const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

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
           <Snackbar
              open={alert.open}
              autoHideDuration={2500}
              onClose={handleCloseAlert}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              sx={{
                position: "fixed",
                left: "16px",
                bottom: "16px",
                zIndex: 1400, // Ensure it's above other elements
              }}
            >
              <Alert
                onClose={handleCloseAlert}
                severity={alert.severity}
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
                  alignItems: "center",
                }}
                variant="filled"
              >
                {alert.message}
              </Alert>
            </Snackbar>
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
            <AlertShowHideContext.Provider value={{showAlert}}>
              <ToDoCard />
            </AlertShowHideContext.Provider>
          </ListOfContext.Provider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
