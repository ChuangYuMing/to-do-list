import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskItem from "./TaskItem";

describe("TaskItem", () => {
  const mockTask = {
    createdAt: 1704067200000, // 2024-01-01T00:00:00.000Z
    id: 1,
    description: "Task 1",
    completed: false,
  };

  it("renders task description correctly", () => {
    render(
      <TaskItem task={mockTask} updateTask={() => {}} deleteTask={() => {}} />
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("toggles edit mode and focuses input on click", () => {
    render(
      <TaskItem task={mockTask} updateTask={() => {}} deleteTask={() => {}} />
    );
    fireEvent.click(screen.getByText("Task 1"));
    const input = screen.getByDisplayValue("Task 1");
    expect(input).toBeInTheDocument();
    expect(document.activeElement).toEqual(input);
  });

  it("calls updateTask on checkbox change", () => {
    const updateTaskMock = jest.fn();
    render(
      <TaskItem
        task={mockTask}
        updateTask={updateTaskMock}
        deleteTask={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(updateTaskMock).toHaveBeenCalledWith(1, { completed: true });
  });

  it("calls updateTask with new description on input blur", async () => {
    const updateTaskMock = jest.fn();
    render(
      <TaskItem
        task={mockTask}
        updateTask={updateTaskMock}
        deleteTask={() => {}}
      />
    );
    fireEvent.click(screen.getByText("Task 1"));
    fireEvent.change(screen.getByDisplayValue("Task 1"), {
      target: { value: "New Description" },
    });
    const inputElement = screen.getByRole("contentInput");

    fireEvent.blur(inputElement);

    expect(updateTaskMock).toHaveBeenCalledWith(1, {
      description: "New Description",
    });
  });

  test("calls setIsEditing on keydown enter", async () => {
    render(
      <TaskItem task={mockTask} updateTask={() => {}} deleteTask={() => {}} />
    );

    fireEvent.click(screen.getByText("Task 1"));

    const inputElement = screen.getByRole("contentInput");

    fireEvent.focus(inputElement);
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(screen.getByRole("description")).toBeInTheDocument();
  });

  it("calls deleteTask on delete click", () => {
    const deleteTaskMock = jest.fn();
    render(
      <TaskItem
        task={mockTask}
        updateTask={() => {}}
        deleteTask={deleteTaskMock}
      />
    );
    fireEvent.click(screen.getByText("Delete"));
    expect(deleteTaskMock).toHaveBeenCalledWith(1);
  });

  it("formats and displays the task creation date correctly", () => {
    render(
      <TaskItem task={mockTask} updateTask={() => {}} deleteTask={() => {}} />
    );
    expect(screen.getByText("Jan 1 2024, 08:00:00")).toBeInTheDocument();
  });
});
