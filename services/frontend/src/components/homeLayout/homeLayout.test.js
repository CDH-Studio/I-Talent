import React from "react";
import { shallow } from "enzyme";

import HomeLayoutView from "./homeLayoutView";
import HomeLayoutController from "./homeLayoutController";
import experienceItemFormView from "../editForms/common/experienceItemForm/experienceItemFormView";

it("home layout view contains critical components", () => {
  const wrapper = shallow(<HomeLayoutView />);

  const searchForms = wrapper.find("injectIntl(SearchFormController)");
  expect(searchForms.length).toBe(1);

  const navigationBars = wrapper.find("NavigationBarController");
  expect(navigationBars.length).toBe(1);
});

it("home layout controller contains critical components", () => {
  const wrapper = shallow(<HomeLayoutController />);

  const homeLayoutViews = wrapper.find("HomeLayoutView");
  expect(homeLayoutViews.length).toBe(1);
});
