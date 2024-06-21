import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddTask from "../components/add-task/AddTask";

describe("AddTask Component", () => {
  it("updates input value on change", () => {
    const { getByPlaceholderText } = render(<AddTask addTask={() => {}} />);
    const input = getByPlaceholderText("Add a new task");
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(input.value).toBe("New Task");
  });

  it("calls addTask with the new task when Add button is clicked", () => {
    const mockAddTask = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AddTask addTask={mockAddTask} />
    );
    const input = getByPlaceholderText("Add a new task");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(getByText("Add"));
    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({ description: "New Task" })
    );
  });

  it("clears the input after adding a task", () => {
    const { getByText, getByPlaceholderText } = render(
      <AddTask addTask={() => {}} />
    );
    const input = getByPlaceholderText("Add a new task");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(getByText("Add"));
    expect(input.value).toBe("");
  });
});
