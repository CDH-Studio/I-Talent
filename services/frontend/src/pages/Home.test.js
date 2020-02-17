import React from "react";
import { mountWithIntl } from "../../test/intlHelper";
import Home from "./Home";

it("contains home layout", () => {
  const wrapper = mountWithIntl(<Home />);
  const layouts = wrapper.find("HomeLayoutController");
  expect(layouts.length).toBe(1);
});
