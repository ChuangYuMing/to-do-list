import React from "react";
import { render } from "@testing-library/react";
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
  expect(asFragment()).toMatchSnapshot();
});
