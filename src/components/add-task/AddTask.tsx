import { Task } from "@/types";
import React, { useState } from "react";
import styles from "./AddTask.module.scss";

type AddTaskProps = {
  addTask: (task: Task) => void;
};

export default function AddTask({ addTask }: AddTaskProps) {
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleAddTask = (e: React.MouseEvent) => {
    addTask({
      id: Date.now(),
      createdAt: Date.now(),
      description: taskDescription,
      completed: false,
    });

    setTaskDescription("");
  };
  return (
    <div className={styles["add-task-wrap"]}>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Add a new task"
        className={styles["add-task-input"]}
      />
      <button className={styles["add-task-button"]} onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}
