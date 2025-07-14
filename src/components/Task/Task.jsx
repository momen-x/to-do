import { Box, IconButton, Paper, Typography } from "@mui/material";

import {
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

import { useContext, useEffect } from "react";

import { ListOfContext } from "../../Context/ListIfTaskContext";
import { TaskInfContext } from "../../Context/TaskInformationContext";
import { useAlertShowHide } from "../../Context/AlertContext";

export default function Tasks() {
  const { showAlert } = useAlertShowHide();

  const { tasks, dispatch } = useContext(ListOfContext);
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(tasks));
  }, [tasks]);

  const {
    taskInfoContext,
    setOpenDeleteDialog,
    setOpenEditDialog,
    setTaskText,
    setIdDialoug,
    setEditTask,
  } = useContext(TaskInfContext);

  const doneTask = () => {
    const id = taskInfoContext.id;
    dispatch({
      type: "TOGGLE_TASK",
      payload: { id },
    });
    let doneOrNot = taskInfoContext.isDone ? "غير مكتملة" : "مكتملة";
    showAlert(`تم تحديث هذه المهمة الى ${doneOrNot}`, "success");
  };
  return (
    <Box sx={{ mb: 3, boxShadow: "inset red 2cap" }}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: "12px",
          backgroundColor: "white",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Typography
              variant="body1"
              sx={{
                color: "#374151",
                fontWeight: 500,
                flex: 1,
                textDecoration: taskInfoContext.isDone
                  ? "line-through"
                  : "none",
                opacity: taskInfoContext.isDone ? 0.6 : 1,
              }}
            >
              {taskInfoContext.task}
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={doneTask}>
              <CheckCircleIcon
                sx={{
                  color: taskInfoContext.isDone ? "#10b981" : "gray",
                  mr: 2,
                  fontSize: "24px",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpenEditDialog(true);
                setIdDialoug(taskInfoContext.id);
                setTaskText(taskInfoContext.task);
                setEditTask(taskInfoContext.task);
              }}
              size="small"
              sx={{
                color: "#6b7280",
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                  color: "#6366f1",
                },
              }}
            >
              <EditIcon sx={{ color: "skyblue" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteDialog(true);
                setIdDialoug(taskInfoContext.id);
              }}
              sx={{
                color: "#6b7280",
                "&:hover": {
                  backgroundColor: "#fee2e2",
                  color: "#ef4444",
                },
              }}
            >
              <DeleteOutlineIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
