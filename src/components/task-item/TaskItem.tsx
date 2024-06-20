import React, { useEffect, useRef, useState, useId } from "react";
import { Task } from "@/types";
import styles from "./TaskItem.module.scss";
import { formatDate } from "@/utils";

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
  const id = useId();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current!.focus();
    }
  }, [isEditing]);

  return (
    <div key={task.createdAt} className={styles["task-item"]}>
      <div className={styles["task-content"]}>
        <input
          id={id}
          type="checkbox"
          checked={task.completed}
          onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
          className={styles["task-checkbox"]}
        />
        <label htmlFor={id} className={styles["checkbox-label"]}></label>
        {isEditing ? (
          <input
            ref={inputRef}
            role="contentInput"
            type="text"
            value={task.description}
            onChange={(e) =>
              updateTask(task.id, { description: e.target.value })
            }
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
              }
            }}
            className={styles["task-description-input"]}
          />
        ) : (
          <span
            role="description"
            className={styles["task-description"]}
            onClick={() => setIsEditing(true)}
          >
            {task.description}
          </span>
        )}
      </div>
      <div className={styles["task-actions"]}>
        <span
          role="deleteTask"
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
