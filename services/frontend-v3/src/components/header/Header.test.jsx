import React from "react";
import { render } from "@testing-library/react";

import Header from "./Header";

test("Test header with just main text", () => {
  const { getByText } = render(<Header title="Test Title" />);
  getByText("Test Title");
});

test("Test header with just main text", () => {
  const { getByText } = render(<Header title="Test Title" />);
  getByText("Test Title");
});

test("Test header with main text and extra content", () => {
  const { getByText } = render(<Header title="Test Title" extra="extra" />);
  getByText("Test Title");
  getByText("extra");
});
