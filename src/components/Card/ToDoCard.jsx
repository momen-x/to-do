//import from external libarary
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import Tasks from "../Task/Task";
import { v4 as uuidv4 } from "uuid";

//import react hooks
import { useContext, useState } from "react";

import { ListOfContext } from "../../Context/ListIfTaskContext";
import { TaskInfContext } from "../../Context/TaskInformationContext";

import "./TODoCard.css";
// import { useNavigate } from "react-router-dom";

export default function ToDoCard() {
  // let navigate=useNavigate();
  const [inputAddTassk, setInputAddTask] = useState("");
  const [typeOfTasks, setTypeOfTasks] = useState("all");



  const { tasks, setTasks } = useContext(ListOfContext);
  const addTask = () => {
    let newTasks = [...tasks];
    if (inputAddTassk.trim() !== "") {
      let newTask = { task: inputAddTassk, isDone: false, id: uuidv4() };
      newTasks.push(newTask);
      setTasks(newTasks);
      setInputAddTask("");
      localStorage.setItem("toDoList", JSON.stringify(tasks));
   
    } else {
      alert("must enter task");
    }
  };
  const tasksList = tasks
    .filter((task) => {
      if (typeOfTasks === "done") return task.isDone;
      else if (typeOfTasks === "notDone") return !task.isDone;
      else return task;
    })
    .map((task) => {
      return (
    <TaskInfContext.Provider key={task.id} value={{taskInfoContext: task}}>
  <Tasks />
</TaskInfContext.Provider>
      );
    });

  return (
    <Card
      sx={{
        minWidth: 350,
        maxWidth: 500,
        margin: "20px auto",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        height: "fit-content",
      }}
    >
      <CardContent sx={{ p: 3 }} className="cardcontent">
        {/*============== Header ==============================*/}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AssignmentIcon sx={{ color: "#6366f1", mr: 1 }} />
          <Typography
            variant="h3"
            sx={{
              color: "#1f2937",
              fontWeight: "800",
              fontFamily: "A",
            }}
          >
            مهامي
          </Typography>
        </Box>
        {/*||============== Header ===========================||*/}

        <Divider sx={{ mb: 3 }} />

        {/*  =======Toogele Button ================*/}
        <ToggleButtonGroup
          color="primary"
          exclusive
          aria-label="Platform"
          sx={{
            width: "100%",
            mb: 3,
            "& .MuiToggleButtonGroup-grouped": {
              border: "none",
              borderRadius: "25px !important",
              margin: "0 4px",
              px: 3,
              py: 1,
              fontWeight: "bold",
              transition: "all 0.3s ease",
            },
          }}
        >
          <ToggleButton
            value="all"
            sx={{
              backgroundColor: typeOfTasks === "all" ? "gray" : "#e0e7ff",
              color: typeOfTasks ? "black" : "#6366f1",
              "&.Mui-selected": {
                backgroundColor: "#6366f1",
                color: "white",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
              },
              "&:hover": {
                backgroundColor: "#c7d2fe",
              },
            }}
            onClick={() => {
              setTypeOfTasks("all");
            }}
          >
            الكل
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setTypeOfTasks("done");
            }}
            value="completed"
            sx={{
              backgroundColor: typeOfTasks === "done" ? "gray" : "#d1fae5",
              color: typeOfTasks === "done" ? "black" : "#10b981",
              "&.Mui-selected": {
                backgroundColor: "#10b981",
                color: "white",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
              },
              "&:hover": {
                backgroundColor: "#a7f3d0",
              },
            }}
          >
            المنجز
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setTypeOfTasks("notDone");
            }}
            value="pending"
            sx={{
              backgroundColor: typeOfTasks === "notDone" ? "gray" : "#fed7d7",
              color: typeOfTasks === "notDone" ? "black" : "#f56565",
              "&.Mui-selected": {
                backgroundColor: "#f56565",
                color: "white",
                boxShadow: "0 4px 12px rgba(245, 101, 101, 0.4)",
              },
              "&:hover": {
                backgroundColor: "#feb2b2",
              },
            }}
          >
            غير المنجز
          </ToggleButton>
        </ToggleButtonGroup>
        {/*  ||=======Toogele Button ================||*/}

        {/* ======================Task Items============================= */}
        {tasksList}
        {/* <Tasks /> */}
        {/* ||===========================Task Items===========================|| */}
        {/* ============================Add Task Section============================= */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            p: 2,
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
          }}
        >
          <TextField
            label="اضف مهمتك"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: "#e5e7eb",
                },
                "&:hover fieldset": {
                  borderColor: "#6366f1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1",
                },
              },
            }}
            value={inputAddTassk}
            onChange={(e) => {
              setInputAddTask(e.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6366f1",
              color: "white",
              borderRadius: "25px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
              "&:hover": {
                backgroundColor: "#4f46e5",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(99, 102, 241, 0.6)",
              },
            }}
            onClick={addTask}
          >
            <AddIcon sx={{ ml: 1 }} />
            اضافة
          </Button>
        </Box>
        {/* ||============================Add Task Section=============================|| */}
      </CardContent>
    </Card>
  );
}
