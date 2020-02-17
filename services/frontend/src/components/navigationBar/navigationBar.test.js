import React from "react";
import { shallow } from "enzyme";

import NavigationBarView from "./navigationBarView";

it("home layout view contains critical components", () => {
  const wrapper = shallow(<NavigationBarView />);

  const logoutButton = wrapper.find("#logoutButton");
  expect(logoutButton.length).toBe(1);
});
