import { useEffect, useState } from "react";
import InputSection from "./components/inputSection.js";
import TaskList from "./components/task-list.js";
import "./style/global.css";
import { TaskProvider } from "./tasksProvider.js";
import type { Theme } from "./types";

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <div className="todo-app">
      <TaskProvider>
        <main>
          <InputSection theme={theme} onToggleTheme={toggleTheme} />
          <TaskList />
        </main>
      </TaskProvider>
    </div>
  );
}
