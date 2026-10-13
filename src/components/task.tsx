import "./../style/task.css";
import { type TaskData } from "./../types";

interface TaskProps {
  task: TaskData;
  actions: {
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
  };
}

export function Task(props: TaskProps) {
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={props.task.completed}
        onChange={() => props.actions.onToggle(props.task.id)}
      ></input>
      <p>{props.task.title}</p>
      <button onClick={() => props.actions.onDelete(props.task.id)}>
        <img src="/assets/images/icon-cross.svg" alt="close"></img>
      </button>
    </div>
  );
}
