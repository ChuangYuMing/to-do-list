import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "../components/task-list/TaskList";

it("renders correctly", () => {
  const mockFilterTasks = [
    {
      createdAt: 1718944797228,
      id: 1,
      description: "Task 1",
      completed: false,
    },
    { createdAt: 1718924797228, id: 2, description: "Task 2", completed: true },
  ];

  const { asFragment } = render(
    <TaskList
      filterTasks={mockFilterTasks}
      updateTask={() => {}}
      deleteTask={() => {}}
    />
  );

  const task1Element = screen.getByText(/Task 1/i);
  expect(task1Element).toBeInTheDocument();

  const task2Element = screen.getByText(/Task 2/i);
  expect(task2Element).toBeInTheDocument();
});
