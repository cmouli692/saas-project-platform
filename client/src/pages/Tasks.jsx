import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { fetchTasks } from "../features/tasks/tasksSlice";

export default function Tasks() {
  useEffect(() => {
    if (selectedProjectId) {
      dispatchEvent(fetchTasks(selectedProjectId));
    }
  }, [selectedProjectId]);
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <input
        value={tasksTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task title"
      />
      <button onClick={handleAddTask}>Add Task</button>
      {tasks.map((t) => (
        <div>
          {t.title}
          <button
            onClick={() => dispatch(removeTask({ projectId, taksId: t.id }))}
          >
            X
          </button>
        </div>
      ))}
    </MainLayout>
  );
}
