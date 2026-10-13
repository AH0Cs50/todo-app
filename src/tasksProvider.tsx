import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { TaskContextType, TaskData } from "./types";

const TaskContex = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Array<TaskData>>(() => {
    const saved = localStorage.getItem("todo_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  //saved to local storage for each change on data
  useEffect(() => {
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, completed: boolean): void => {
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title, completed }]);
  };

  const toggleTask = (id: string): void => {
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const clearCompleted = (): void => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <TaskContex.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, clearCompleted }}
    >
      {children}
    </TaskContex.Provider>
  );
}

export function useTask() {
  const contex = useContext(TaskContex);
  if (!contex) throw new Error("you must use the provider first");
  return contex;
}
