import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchTask from "../components/search-task/SearchTask";

describe("SearchTask Component", () => {
  it("calls setSearchText on input change", () => {
    const setSearchTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchTask
        searchText=""
        setSearchText={setSearchTextMock}
        setIsSortByCreatedAt={() => {}}
      />
    );

    fireEvent.change(getByPlaceholderText("Search tasks"), {
      target: { value: "new task" },
    });

    expect(setSearchTextMock).toHaveBeenCalledWith("new task");
  });

  it("calls setIsSortByCreatedAt on checkbox change", () => {
    const setIsSortByCreatedAtMock = jest.fn();
    const { getByLabelText } = render(
      <SearchTask
        searchText=""
        setSearchText={() => {}}
        setIsSortByCreatedAt={setIsSortByCreatedAtMock}
      />
    );

    fireEvent.click(getByLabelText("Sort by created date"));

    expect(setIsSortByCreatedAtMock).toHaveBeenCalledWith(true);
  });
});
