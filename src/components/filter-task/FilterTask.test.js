import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FilterTask from "./FilterTask";
import { TASK_FILTER_STATUS } from "@/const.js";

describe("FilterTask Component", () => {
  const mockSetTaskFilterStatus = jest.fn();

  it("renders all status options", () => {
    const { getByText } = render(
      <FilterTask
        taskFilterStatus={TASK_FILTER_STATUS.ALL}
        setTaskFilterStatus={mockSetTaskFilterStatus}
      />
    );
    expect(getByText(TASK_FILTER_STATUS.ALL)).toBeInTheDocument();
    expect(getByText(TASK_FILTER_STATUS.UNCOMPLETED)).toBeInTheDocument();
    expect(getByText(TASK_FILTER_STATUS.COMPLETED)).toBeInTheDocument();
  });

  it("handles status click correctly", () => {
    const { getByText } = render(
      <FilterTask
        taskFilterStatus={TASK_FILTER_STATUS.ALL}
        setTaskFilterStatus={mockSetTaskFilterStatus}
      />
    );
    fireEvent.click(getByText(TASK_FILTER_STATUS.UNCOMPLETED));
    expect(mockSetTaskFilterStatus).toHaveBeenCalledWith(
      TASK_FILTER_STATUS.UNCOMPLETED
    );
  });

  it("applies active style for the selected status", () => {
    const { getByText } = render(
      <FilterTask
        taskFilterStatus={TASK_FILTER_STATUS.UNCOMPLETED}
        setTaskFilterStatus={mockSetTaskFilterStatus}
      />
    );
    const uncompletedStatus = getByText(TASK_FILTER_STATUS.UNCOMPLETED);
    expect(uncompletedStatus).toHaveClass("active");
  });

  it("updates task filter status on status click", () => {
    const { getByText } = render(
      <FilterTask
        taskFilterStatus={TASK_FILTER_STATUS.ALL}
        setTaskFilterStatus={mockSetTaskFilterStatus}
      />
    );
    fireEvent.click(getByText(TASK_FILTER_STATUS.COMPLETED));
    expect(mockSetTaskFilterStatus).toHaveBeenCalledWith(
      TASK_FILTER_STATUS.COMPLETED
    );
  });
});
