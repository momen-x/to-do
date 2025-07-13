//import from external libarary
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
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
import { useContext, useEffect, useMemo, useState } from "react";
// import context files
import { ListOfContext } from "../../Context/ListIfTaskContext";
import { TaskInfContext } from "../../Context/TaskInformationContext";
import { useAlertShowHide } from "../../Context/AlertContext.jsx";

export default function ToDoCard() {
  const [inputAddTask, setInputAddTask] = useState("");
  const [typeOfTasks, setTypeOfTasks] = useState("all");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editTask, setEditTask] = useState("");

  const [idDialoug, setIdDialoug] = useState("");
  const [taskText, setTaskText] = useState("");

  const { tasks, setTasks } = useContext(ListOfContext);
  const { showAlert } = useAlertShowHide();
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(tasks));
  }, [tasks]);

  // Alert states

  const addTask = () => {
    try {
      // if (inputAddTask.trim() === "") {
      //   showAlert("يجب إدخال  مهمة", "warning");
      //   return;
      // }

      const taskExists = tasks.some(
        (task) =>
          task.task.toLowerCase().trim() === inputAddTask.toLowerCase().trim()
      );

      if (taskExists) {
        showAlert("المهمة موجودة بالفعل", "info");
        return;
      }

      let newTasks = [...tasks];
      let newTask = { task: inputAddTask.trim(), isDone: false, id: uuidv4() };
      newTasks.push(newTask);
      setTasks(newTasks);
      setInputAddTask("");
      showAlert("تم إضافة المهمة بنجاح", "success");
    } catch {
      showAlert("حدث خطأ أثناء إضافة المهمة", "error");
    }
  };

  // Handle Enter key to add task
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const tasksList = useMemo(() => {
    return tasks
      .filter((task) => {
        if (typeOfTasks === "done") return task.isDone;
        else if (typeOfTasks === "notDone") return !task.isDone;
        else return task;
      })
      .map((task) => {
        return (
          <TaskInfContext.Provider
            key={task.id}
            value={{
              taskInfoContext /**the correct practice send by props but i trainaing about some type of reaact hooks */:
                task,
              setOpenEditDialog,
              setTaskText,
              setEditTask,
              setOpenDeleteDialog,
              setIdDialoug,
            }}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setIdDialoug={setIdDialoug}
          >
            <Tasks />
          </TaskInfContext.Provider>
        );
      });
  }, [tasks, typeOfTasks]);

  // ===========handaler event===============

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleEditTask = () => {
    try {
      if (editTask.trim() === taskText.trim()) {
        showAlert("لم يتم تغيير المهمة", "info");
        return;
      }

      const taskExists = tasks.some(
        (task) =>
          task.id !== idDialoug && // Don't compare with itself
          task.task.toLowerCase().trim() === editTask.toLowerCase().trim()
      );

      if (taskExists) {
        showAlert("المهمة التي تحاول التعديل اليها موجودة بالفعل", "warning");
        return;
      }

      let newTasks = tasks.map((task) => {
        return task.id === idDialoug
          ? { ...task, task: editTask.trim() }
          : task;
      });

      setTasks(newTasks);
      setEditTask("");
      handleClickCloseEditDialog();
      showAlert("تم تعديل المهمة بنجاح", "success");
    } catch {
      showAlert("حدث خطأ أثناء تعديل المهمة", "error");
    }
  };

  const handleClickCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  // ===Handaler event========

  const deleteTask = () => {
    try {
      let newTasks = tasks.filter((taskItem) => taskItem.id !== idDialoug);
      setTasks(newTasks);

      handleCloseDeleteDialog();
      showAlert("تم حذف المهمة بنجاح", "success");
    } catch {
      showAlert("حدث خطأ أثناء حذف المهمة", "error");
    }
  };
  return (
    <Box sx={{ height: "100px", position: "relative" }}>
      <Card
        sx={{
          minWidth: 350,
          maxWidth: 500,
          maxHeight: "calc(100vh - 40px)",
          margin: "20px auto",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          overflowY: "auto",
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

          {/*  =======Toggle Button ================*/}
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
              value="notCompleted"
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
          {/*  ||=======Toggle Button ================||*/}

          {/* ======================Task Items============================= */}
          {tasksList}
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
              value={inputAddTask}
              onChange={(e) => {
                setInputAddTask(e.target.value);
              }}
              onKeyPress={handleKeyPress}
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
              disabled={inputAddTask.trim() === ""}
            >
              <AddIcon sx={{ ml: 1 }} />
              اضافة
            </Button>
          </Box>
          {/* ||============================Add Task Section=============================|| */}
        </CardContent>
      </Card>

      {/*================= Delete dialoug======================= */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"حذف مهمة ؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل انت متاكد انك تريد حذف المهمة , لن تستطيع ارجاعها بعد الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteTask();
              handleCloseDeleteDialog();
            }}
          >
            احذف
          </Button>
          <Button onClick={handleCloseDeleteDialog} autoFocus>
            اغلاق
          </Button>
        </DialogActions>
      </Dialog>
      {/*================= //Delete dialoug//======================= */}
      {/*================= Edit dialoug======================= */}
      <Dialog open={openEditDialog} onClose={handleClickCloseEditDialog}>
        <DialogTitle>تعديل مهمة : </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>عدل مهمتك</DialogContentText>
          <TextField
            autoFocus
            required
            value={editTask}
            onChange={(e) => {
              setEditTask(e.target.value);
            }}
            margin="dense"
            id="ta"
            name="ta"
            label="تعديل مهمة"
            type="text"
            fullWidth
            variant="standard"
            placeholder={taskText} // Add placeholder to show current text
          />
          <DialogActions>
            <Button
              onClick={() => {
                handleEditTask();
              }}
              disabled={editTask.trim() === ""}
            >
              تعديل
            </Button>
            <Button onClick={handleClickCloseEditDialog}>الغاء</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/*================= //Edit dialoug//======================= */}

      {/* Alert Snackbar */}
    </Box>
  );
}
