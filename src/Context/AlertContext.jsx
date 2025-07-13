import { Alert, Snackbar } from "@mui/material";
import { createContext, useState, useContext, useRef } from "react";

const AlertShowHideContext = createContext({});

export const AlertShowHideProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  const timeoutRef = useRef(null);

  const showAlert = (message, severity = "success") => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setAlert({
      open: true,
      message,
      severity,
    });
    
    timeoutRef.current = setTimeout(() => {
      setAlert((prev) => ({ ...prev, open: false }));
    }, 2500);
  };

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <AlertShowHideContext.Provider value={{ alert, setAlert, showAlert }}>
        {children}
        <Snackbar
          open={alert.open}
          autoHideDuration={2500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          sx={{
            position: "fixed",
            left: "16px",
            bottom: "16px",
            zIndex: 1400, // Ensure it's above other elements
          }}
        >
          <Alert
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
      </AlertShowHideContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlertShowHide = () => {
  return useContext(AlertShowHideContext);
};
