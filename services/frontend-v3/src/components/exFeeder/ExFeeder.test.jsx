import React from "react";
import { render } from "@testing-library/react";

import ExFeederCard from "./ExFeeder";

test("Test render of edit menu", () => {
  const { getByText } = render(<ExFeeder data={data} editableCardBool={true} />;);

  <ExFeeder data={data} editableCardBool={true} />;
  getByText("Test Title");
});

test("Test header with just main text", async () => {
  const { getByText } = render(<Header title="Test Title" />);
  getByText("Test Title");
});

test("Test header with main text and extra content", async () => {
  const { getByText } = render(<Header title="Test Title" extra="extra" />);
  getByText("Test Title");
  getByText("extra");
});
