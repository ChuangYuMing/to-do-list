import { Task } from "@/types";
import React, { useState } from "react";

type AddTaskProps = {
  addTask: (task: Task) => void;
};

export default function AddTask({ addTask }: AddTaskProps) {
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleAddTask = (e: React.MouseEvent) => {
    addTask({
      createdAt: Date.now(),
      description: taskDescription,
      completed: false,
    });

    setTaskDescription("");
  };
  return (
    <div className="add-task-wrap">
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Add a new task"
        className="add-task-input"
      />
      <button className="add-task-button" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}
