import { useState } from "react";
import { useTask } from "../tasksProvider";
import { type TaskData } from "../types";
import "./../style/taskList.css";
import { Task } from "./task";

enum Filter {
  All = "all",
  Active = "active",
  Completed = "completed",
}

function filterVisibleTasks(tasks: Array<TaskData>, filter: Filter) {
  let filteredTasks = tasks;

  if (filter === Filter.Active) {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === Filter.Completed) {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  return filteredTasks;
}

export default function TaskList() {
  // take the data and logic functions from the provider
  const { tasks, toggleTask, deleteTask, clearCompleted } = useTask();

  const [filter, setFilter] = useState<Filter>(Filter.All);

  return (
    <>
      <ul className="task-list">
        {filterVisibleTasks(tasks, filter).map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              actions={{ onToggle: toggleTask, onDelete: deleteTask }}
            />
          );
        })}
      </ul>
      <div className="task-list-footer">
        <p>
          <span id="itemsLeft">
            {tasks.filter((tsk) => !tsk.completed).length}
          </span>{" "}
          items left
        </p>
        <div className="filters">
          <button
            className={filter === Filter.All ? "active" : undefined}
            onClick={() => {
              setFilter(Filter.All);
            }}
          >
            all
          </button>
          <button
            className={filter === Filter.Active ? "active" : undefined}
            onClick={() => {
              setFilter(Filter.Active);
            }}
          >
            active
          </button>
          <button
            className={filter == Filter.Completed ? "active" : undefined}
            onClick={() => {
              setFilter(Filter.Completed);
            }}
          >
            completed
          </button>
        </div>
        <button className="clear-completed" onClick={clearCompleted}>
          clear completed
        </button>
      </div>
    </>
  );
}
