import { useState } from "react";
import { useTask } from "../tasksProvider";
import type { Theme } from "../types";
import "./../style/inputSection.css";

interface InputSectionProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function InputSection({
  theme,
  onToggleTheme,
}: InputSectionProps) {
  // hook must run inside the component, under <TaskProvider>
  const { addTask } = useTask();

  // UI state
  const [title, setTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      // guard against empty input instead of crashing the render
      if (title.trim() === "") return;
      // add some task to task contex
      addTask(title, completed);
      //reset the UI states
      setTitle("");
      setCompleted(false);
    }
  };

  const themeIcon: string = theme === "light" ? "moon" : "sun";

  return (
    <>
      <header>
        <h1>T O D O</h1>
        <button onClick={onToggleTheme} aria-label="Toggle theme">
          <img src={`/assets/images/icon-${themeIcon}.svg`} alt=""></img>
        </button>
      </header>

      {/* assign it here  */}
      <div className="text-field" onKeyDown={handleKeyDown}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        ></input>
        <input
          type="text"
          placeholder="Create a new todo.."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
      </div>
    </>
  );
}
