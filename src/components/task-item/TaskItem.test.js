import React from "react";
import { render } from "@testing-library/react";
import TaskItem from "./TaskItem";

it("renders correctly", () => {
  const mockTask = {
    createdAt: 1,
    id: 1,
    description: "Task 1",
    completed: false,
  };

  const { asFragment } = render(
    <TaskItem
      key={mockTask.createdAt}
      task={mockTask}
      updateTask={() => {}}
      deleteTask={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
