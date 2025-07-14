// import { useAlertShowHide } from "../Context/AlertContext";
import { v4 as uuidv4 } from "uuid";

export function ListOfReducer(tasks, action) {
  // const { showAlert } = useAlertShowHide();
  switch (action.type) {
    case "ADD_TASK":
      try {
        const { inputAddTask } = action.payload;

        const newTask = {
          task: inputAddTask,
          isDone: false,
          id: uuidv4(),
        };

        const newTasks = [...tasks, newTask];

        return newTasks;
      } catch {
        return tasks;
      }
    case "DELETE_TASK": {
      let newTasks = tasks.filter((task) => task.id !== action.payload.id);
      return newTasks;
    }

    case "EDIT_TASK": {
      const { editTask, idDialoug } = action.payload;

      let newTasks = tasks.map((task) => {
        return task.id === idDialoug
          ? { ...task, task: editTask.trim() }
          : task;
      });
      return newTasks;
    }

    case "TOGGLE_TASK":
      try {
        const { id } = action.payload;

        const newTasks = tasks.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task
        );

        return newTasks;
      } catch {
        // showAlert("حدث خطأ أثناء تحديث حالة المهمة", "error");
        return tasks;
      }
  }
}
