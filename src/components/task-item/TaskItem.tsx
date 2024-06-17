import React, { useState } from "react";
import { Task } from "@/types";
import styles from "./TaskItem.module.scss";

type TaskItemProps = {
  task: Task;
  updateTask: (taskId: number, payload: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
};

export default function TaskItem({
  task,
  updateTask,
  deleteTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div key={task.createdAt} className={styles["task-item"]}>
      <div className={styles["task-content"]}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
        />
        {isEditing ? (
          <input
            type="text"
            value={task.description}
            onChange={(e) =>
              updateTask(task.id, { description: e.target.value })
            }
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <span>{task.description}</span>
        )}
      </div>
      <div className={styles["task-actions"]}>
        <span
          className={styles["task-action"]}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </span>
        <span
          className={styles["task-action"]}
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </span>
      </div>
      <span className={styles["created-date"]}>
        {formatDate(task.createdAt)}
      </span>
    </div>
  );
}
