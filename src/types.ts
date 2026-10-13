export type Theme = "light" | "dark";

export interface TaskData {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskContextType {
  tasks: Array<TaskData>;
  addTask: (title: string, completed: boolean) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
}
