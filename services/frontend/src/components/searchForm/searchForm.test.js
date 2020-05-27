import React from "react";
import flushPromises from "flush-promises";

import axios from "axios";
import SearchFormView from "./searchFormView";
import SearchFormController from "./searchFormController";

import { mountWithIntl, shallowWithIntl } from "../../../test/intlHelper";

delete window.localStorage;
window.localStorage = {
  getItem: name =>
    ({ userId: "1e3b88e6-2035-11ea-8771-fbf73ca08e3f", lang: "en" }[name])
};

const searchFormProps = {
  departments: [],
  jobTitles: [],
  locations: [],
  securityClearances: [],
  skills: [],
  defaultValues: {}
};

jest.mock("../../config", () => ({ backendAddress: "localhost:8080/" }));

it("SearchFormView with advanced fields toggled on but no advancedOptions on /home route gathers advancedOptions", () => {
  const mockGetAdvancedFunctions = jest.fn();

  const wrapper = mountWithIntl(
    <SearchFormView
      advancedSearch={true}
      advancedOptions={undefined}
      getAdvancedOptions={mockGetAdvancedFunctions}
      {...searchFormProps}
    />
  );

  expect(mockGetAdvancedFunctions.mock.calls.length).toBe(1);
  expect(wrapper.find(".loading").length).toBe(1);
});

it("SearchFormView with advanced fields toggled on and and advancedOptions on /home route renders critical components", () => {
  const mockGetAdvancedFunctions = jest.fn();

  const wrapper = mountWithIntl(
    <SearchFormView
      advancedSearch={true}
      advancedOptions={{
        branch: [],
        classification: [],
        developmentalGoals: [],
        location: []
      }}
      getAdvancedOptions={mockGetAdvancedFunctions}
      {...searchFormProps}
    />
  );

  const searchForms = wrapper.find("Form");
  expect(searchForms.length).toBe(1);

  const dropdowns = wrapper.find("Dropdown");
  expect(dropdowns.length).toBe(4);

  const checkboxes = wrapper.find("Checkbox");
  expect(checkboxes.length).toBe(1);

  const textInput = wrapper.find("Input");
  expect(textInput.length).toBe(1);

  const inputs = wrapper.find("FormField");
  expect(inputs.length).toBe(7);
  expect(1).toBe(1);
});

it("SearchFormView on /results route renders critical components", () => {
  const wrapper = mountWithIntl(
    <SearchFormView
      advancedSearch={true}
      advancedOptions={{
        branch: [],
        classification: [],
        developmentalGoals: [],
        location: []
      }}
      navBarLayout
      {...searchFormProps}
    />
  );

  const searchForms = wrapper.find("Form");
  expect(searchForms.length).toBe(1);

  const dropdowns = wrapper.find("Dropdown");
  expect(dropdowns.length).toBe(4);

  const checkboxes = wrapper.find("Checkbox");
  expect(checkboxes.length).toBe(1);

  const textInput = wrapper.find("Input");
  expect(textInput.length).toBe(2);

  const inputs = wrapper.find("input");
  expect(inputs.length).toBe(7);
  expect(1).toBe(1);
});

it("SearchFormView on /results route renders default values", () => {
  const wrapper = mountWithIntl(
    <SearchFormView
      advancedSearch={true}
      advancedOptions={{
        branch: [
          {
            key: "aaaaaaaa-bbbb-cccc-0000-eeeeeeee0000",
            value: "aaaaaaaa-bbbb-cccc-0000-eeeeeeee0000",
            text: "branchString0"
          }
        ],
        classification: [
          {
            key: "aaaaaaaa-bbbb-cccc-0001-eeeeeeee0000",
            value: "aaaaaaaa-bbbb-cccc-0001-eeeeeeee0000",
            text: "classificationString0"
          }
        ],
        developmentalGoals: [
          {
            key: "aaaaaaaa-bbbb-cccc-0002-eeeeeeee0000",
            value: "aaaaaaaa-bbbb-cccc-0002-eeeeeeee0000",
            text: "skillsString0"
          }
        ],
        location: [
          {
            key: "aaaaaaaa-bbbb-cccc-0003-eeeeeeee0000",
            value: "aaaaaaaa-bbbb-cccc-0003-eeeeeeee0000",
            text: "locationString0"
          }
        ]
      }}
      navBarLayout
      {...searchFormProps}
      defaultValues={{
        name: "nameString0",
        branch: ["aaaaaaaa-bbbb-cccc-0000-eeeeeeee0000"],
        classification: ["aaaaaaaa-bbbb-cccc-0001-eeeeeeee0000"],
        skills: ["aaaaaaaa-bbbb-cccc-0002-eeeeeeee0000"],
        location: ["aaaaaaaa-bbbb-cccc-0003-eeeeeeee0000"],
        exFeeder: true
      }}
    />
  );

  const wrapperHtml = wrapper.html();
  expect(wrapper.find({ defaultValue: "nameString0" }).length).toBe(3);
  expect(wrapperHtml.includes("nameString0")).toBe(true);

  expect(
    wrapper.find({ value: "aaaaaaaa-bbbb-cccc-0000-eeeeeeee0000" }).length
  ).toBe(2);
  expect(wrapperHtml.includes("branchString0")).toBe(true);

  expect(
    wrapper.find({ value: "aaaaaaaa-bbbb-cccc-0001-eeeeeeee0000" }).length
  ).toBe(2);
  expect(wrapperHtml.includes("classificationString0")).toBe(true);

  expect(
    wrapper.find({ value: "aaaaaaaa-bbbb-cccc-0002-eeeeeeee0000" }).length
  ).toBe(2);
  expect(wrapperHtml.includes("skillsString0")).toBe(true);

  expect(
    wrapper.find({ value: "aaaaaaaa-bbbb-cccc-0003-eeeeeeee0000" }).length
  ).toBe(2);
  expect(wrapperHtml.includes("locationString0")).toBe(true);

  expect(wrapper.find({ defaultChecked: true }).length).toBe(2);
});

it("SearchFormController on /home route performs toggles between basic and advanced search properly", async () => {
  delete window.location;
  window.location = {
    reload: jest.fn(),
    toString: () => "localhost:3000/secured/home"
  };

  const mockRedirectFunction = jest.fn();
  axios.get = jest.fn(async url => ({ data: [] }));

  const wrapper = mountWithIntl(
    <SearchFormController
      toggleButton
      redirectFunction={mockRedirectFunction}
    />
  );
  expect(
    Boolean(
      wrapper
        .find("SearchFormView")
        .first()
        .props().advancedSearch
    )
  ).toBe(false);
  wrapper
    .find("#toggleButtonField")
    .last()
    .simulate("click");

  // wait for loading spinner to go away
  await flushPromises();
  wrapper.update();
  expect(
    wrapper
      .find("SearchFormView")
      .first()
      .props().advancedSearch
  ).toBe(true);
});

it("SearchFormController on /home route performs broad search properly", () => {
  delete window.location;
  window.location = {
    reload: jest.fn(),
    toString: () => "localhost:3000/secured/home"
  };

  const mockRedirectFunction = jest.fn();

  const wrapper = mountWithIntl(
    <SearchFormController
      toggleButton
      redirectFunction={mockRedirectFunction}
    />
  );

  wrapper
    .find("#searchValueField")
    .last()
    .simulate("change", {
      target: { name: "searchValue", value: "broadString0" }
    });

  expect(
    wrapper
      .find("SearchFormView")
      .first()
      .props().defaultValues.searchValue
  ).toBe("broadString0");

  wrapper
    .find("#searchButtonField")
    .last()
    .simulate("click");

  expect(mockRedirectFunction.mock.calls.length).toBe(1);
  expect(mockRedirectFunction.mock.calls[0][0]).toBe(
    "/secured/results/fuzzySearch?searchValue=broadString0"
  );
});

it("SearchFormController on /home route performs advanced search properly", async () => {
  delete window.location;
  window.location = {
    reload: jest.fn(),
    toString: () => "localhost:3000/secured/home"
  };

  const mockRedirectFunction = jest.fn();
  const mockGetGroupLevels = {
    data: [
      {
        id: "aaaaaaaa-bbbb-cccc-0004-000000000000",
        description: "groupLevelString0"
      },
      {
        id: "aaaaaaaa-bbbb-cccc-0004-000000000001",
        description: "groupLevelString1"
      }
    ]
  };

  const mockGetDevelopmentalGoals = {
    data: [
      {
        id: "aaaaaaaa-bbbb-cccc-0005-000000000000",
        description: {
          en: "developmentalGoalsStringEn0",
          fr: "developmentalGoalsStringFr0"
        }
      },
      {
        id: "aaaaaaaa-bbbb-cccc-0005-000000000001",
        description: {
          en: "developmentalGoalsStringEn1",
          fr: "developmentalGoalsStringFr1"
        }
      }
    ]
  };

  const mockGetLocations = {
    data: [
      {
        id: "aaaaaaaa-bbbb-cccc-0006-000000000000",
        description: {
          en: "LocationStringEn0",
          fr: "LocationStringFr0"
        }
      },
      {
        id: "aaaaaaaa-bbbb-cccc-0006-000000000001",
        description: {
          en: "LocationStringEn1",
          fr: "LocationStringFr1"
        }
      }
    ]
  };

  const mockGetBranches = {
    data: [
      {
        description: {
          en: "branchStringEn0",
          fr: "branchStringFr0"
        }
      },
      {
        description: {
          en: "branchStringEn1",
          fr: "branchStringFr1"
        }
      },
      /* I don't know why this is in the backend for me */
      {
        description: {
          en: null,
          fr: null
        }
      }
    ]
  };

  axios.get = jest.fn(
    async url =>
      ({
        "localhost:8080/api/option/getGroupLevel": mockGetGroupLevels,
        "localhost:8080/api/option/getDevelopmentalGoals": mockGetDevelopmentalGoals,
        "localhost:8080/api/option/getLocation": mockGetLocations,
        "localhost:8080/api/option/getBranch": mockGetBranches
      }[url])
  );

  const wrapper = mountWithIntl(
    <SearchFormController
      toggleButton
      defaultAdvanced={true}
      redirectFunction={mockRedirectFunction}
    />
  );
  // wait for loading spinner to go away
  await flushPromises();
  wrapper.update();

  expect(axios.get.mock.calls.length).toBe(4);
  expect(axios.get.mock.calls[0][0]).toBe(
    "localhost:8080/api/option/getGroupLevel"
  );
  expect(axios.get.mock.calls[1][0]).toBe(
    "localhost:8080/api/option/getDevelopmentalGoals"
  );
  expect(axios.get.mock.calls[2][0]).toBe(
    "localhost:8080/api/option/getLocation"
  );
  expect(axios.get.mock.calls[3][0]).toBe(
    "localhost:8080/api/option/getBranch"
  );

  // modify forms
  wrapper
    .find("#nameField")
    .last()
    .simulate("change", { target: { name: "name", value: "nameString0" } });

  wrapper
    .find("#exFeederField")
    .last()
    .simulate("change", { target: { name: "name", checked: true } });

  const classificationField = wrapper.find("#classificationField").last();
  classificationField
    .props()
    .onChange(undefined, ["aaaaaaaa-bbbb-cccc-0004-000000000000"]);

  const locationField = wrapper.find("#locationField").last();
  locationField
    .props()
    .onChange(undefined, ["aaaaaaaa-bbbb-cccc-0003-000000000000"]);

  const skillsField = wrapper.find("#skillsField").last();
  skillsField
    .props()
    .onChange(undefined, ["aaaaaaaa-bbbb-cccc-0005-000000000000"]);

  const branchField = wrapper.find("#branchField").last();
  branchField.props().onChange(undefined, ["branchStringEn0"]);

  //wait for changes to finish
  await flushPromises();
  wrapper.update();

  //verify view is being passed expected defaultValue
  const searchFormViewDefaultValues = wrapper
    .find("SearchFormView")
    .first()
    .props().defaultValues;

  expect(searchFormViewDefaultValues).toEqual({
    name: "nameString0",
    exFeeder: true,
    classification: ["aaaaaaaa-bbbb-cccc-0004-000000000000"],
    location: ["aaaaaaaa-bbbb-cccc-0003-000000000000"],
    skills: ["aaaaaaaa-bbbb-cccc-0005-000000000000"],
    branch: ["branchStringEn0"]
  });

  wrapper
    .find("#searchButtonField")
    .last()
    .simulate("click");

  expect(mockRedirectFunction.mock.calls.length).toBe(1);
  expect(mockRedirectFunction.mock.calls[0][0]).toBe(
    "/secured/results?branch%5B%5D=branchStringEn0&classification%5B%5D=aaaaaaaa-bbbb-cccc-0004-000000000000&exFeeder=true&location%5B%5D=aaaaaaaa-bbbb-cccc-0003-000000000000&name=nameString0&skills%5B%5D=aaaaaaaa-bbbb-cccc-0005-000000000000"
  );
});

it("SearchFormController on /results route performs advanced search properly", async () => {
  delete window.location;
  window.location = {
    reload: jest.fn(),
    toString: () => "localhost:3000/secured/results"
  };

  const mockRedirectFunction = jest.fn();
  const mockGetGroupLevels = {
    data: [
      {
        id: "aaaaaaaa-bbbb-cccc-0004-000000000000",
        description: "groupLevelString0"
      },
      {
        id: "aaaaaaaa-bbbb-cccc-0004-000000000001",
        description: "groupLevelString1"
      }
    ]
  };

  const mockGetDevelopmentalGoals = {
    data: [
      {
        id: "aaaaaaaa-bbbb-cccc-0005-000000000000",
        description: {
          en: "developmentalGoalsStringEn0",
          fr: "developmentalGoalsStringFr0"
        }
      },
      {
        id: "aaaaaaaa-bbbb-cccc-0005-000000000001",
        description: {
          en: "developmentalGoalsStringEn1",
          fr: "developmentalGoalsStringFr1"
        }
      }
    ]
  };

  const mockGetLocations = {
    data: [
      {
        id: "aaaaaaaa-bbbb-cccc-0006-000000000000",
        description: {
          en: "LocationStringEn0",
          fr: "LocationStringFr0"
        }
      },
      {
        id: "aaaaaaaa-bbbb-cccc-0006-000000000001",
        description: {
          en: "LocationStringEn1",
          fr: "LocationStringFr1"
        }
      }
    ]
  };

  const mockGetBranches = {
    data: [
      {
        description: {
          en: "branchStringEn0",
          fr: "branchStringFr0"
        }
      },
      {
        description: {
          en: "branchStringEn1",
          fr: "branchStringFr1"
        }
      },
      /* I don't know why this is in the backend for me */
      {
        description: {
          en: null,
          fr: null
        }
      }
    ]
  };

  delete axios.get;
  axios.get = jest.fn(async url => {
    return {
      "localhost:8080/api/option/getGroupLevel": mockGetGroupLevels,
      "localhost:8080/api/option/getDevelopmentalGoals": mockGetDevelopmentalGoals,
      "localhost:8080/api/option/getLocation": mockGetLocations,
      "localhost:8080/api/option/getBranch": mockGetBranches
    }[url];
  });

  const wrapper = mountWithIntl(
    <SearchFormController
      defaultAdvanced={true}
      navBarLayout
      redirectFunction={mockRedirectFunction}
      toggleButton
    />
  );

  // wait for loading spinner to go away
  await flushPromises();
  wrapper.update();

  expect(axios.get.mock.calls.length).toBe(4);
  expect(axios.get.mock.calls[0][0]).toBe(
    "localhost:8080/api/option/getGroupLevel"
  );
  expect(axios.get.mock.calls[1][0]).toBe(
    "localhost:8080/api/option/getDevelopmentalGoals"
  );
  expect(axios.get.mock.calls[2][0]).toBe(
    "localhost:8080/api/option/getLocation"
  );
  expect(axios.get.mock.calls[3][0]).toBe(
    "localhost:8080/api/option/getBranch"
  );

  // modify forms
  wrapper
    .find("#searchValueField")
    .last()
    .simulate("change", { target: { name: "name", value: "broadString0" } });
  wrapper
    .find("#nameField")
    .last()
    .simulate("change", { target: { name: "name", value: "nameString0" } });

  wrapper
    .find("#exFeederField")
    .last()
    .simulate("change", { target: { name: "name", checked: true } });

  const classificationField = wrapper.find("#classificationField").last();
  classificationField
    .props()
    .onChange(undefined, ["aaaaaaaa-bbbb-cccc-0004-000000000000"]);

  const locationField = wrapper.find("#locationField").last();
  locationField
    .props()
    .onChange(undefined, ["aaaaaaaa-bbbb-cccc-0003-000000000000"]);

  const skillsField = wrapper.find("#skillsField").last();
  skillsField
    .props()
    .onChange(undefined, ["aaaaaaaa-bbbb-cccc-0005-000000000000"]);

  const branchField = wrapper.find("#branchField").last();
  branchField.props().onChange(undefined, ["branchStringEn0"]);

  //wait for changes to finish
  await flushPromises();
  wrapper.update();

  //verify view is being passed expected defaultValue
  const searchFormViewDefaultValues = wrapper
    .find("SearchFormView")
    .first()
    .props().defaultValues;

  expect(searchFormViewDefaultValues).toEqual({
    name: "nameString0",
    searchValue: "broadString0",
    exFeeder: true,
    classification: ["aaaaaaaa-bbbb-cccc-0004-000000000000"],
    location: ["aaaaaaaa-bbbb-cccc-0003-000000000000"],
    skills: ["aaaaaaaa-bbbb-cccc-0005-000000000000"],
    branch: ["branchStringEn0"]
  });

  wrapper
    .find("#applyButtonField")
    .last()
    .simulate("click");

  expect(mockRedirectFunction.mock.calls.length).toBe(1);
  expect(mockRedirectFunction.mock.calls[0][0]).toBe(
    "/secured/results?branch%5B%5D=branchStringEn0&classification%5B%5D=aaaaaaaa-bbbb-cccc-0004-000000000000&exFeeder=true&location%5B%5D=aaaaaaaa-bbbb-cccc-0003-000000000000&name=nameString0&searchValue=broadString0&skills%5B%5D=aaaaaaaa-bbbb-cccc-0005-000000000000"
  );
});
