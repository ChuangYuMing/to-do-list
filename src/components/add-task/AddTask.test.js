import React from "react";
import { render } from "@testing-library/react";
import AddTask from "./AddTask";

it("renders correctly", () => {
  const { asFragment } = render(<AddTask />);
  expect(asFragment()).toMatchSnapshot();
});
