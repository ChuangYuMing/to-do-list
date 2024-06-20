import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoList from "./index";
import useLocalStorage from "src/hooks/useLocalStorage.js";

describe("Task operations", () => {
  let tasks;
  let setTasks;

  beforeEach(() => {
    setTasks = jest.fn();
  });

  it("adds a new task to the list", () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const input = getByPlaceholderText("Add a new task");
    const addButton = getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(getByText("New Task")).toBeInTheDocument();
  });

  it("updates task correctly", () => {
    render(<TodoList />);

    fireEvent.click(screen.getByText("New Task"));
    fireEvent.change(screen.getByDisplayValue("New Task"), {
      target: { value: "New Description" },
    });
    fireEvent.blur(screen.getByDisplayValue("New Description"));

    expect(screen.getByText("New Description")).toBeInTheDocument();
  });

  it("deletes task correctly", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText("Delete"));

    expect(screen.queryByText("New Description")).not.toBeInTheDocument();
  });
});
