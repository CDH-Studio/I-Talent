import React from "react";
import Results from "./Results";
import axios from "axios";
import { mountWithIntl } from "../../test/intlHelper";
import flushPromises from "flush-promises";

import { FULL_PROFILE_DATA } from "../../test/testValues";

jest.mock("../config", () => ({ backendAddress: "localhost:8080/" }));
const mockResultsData = [
  {
    id: "aaaaaaaa-bbbb-cccc-0000-0000000000",
    ...FULL_PROFILE_DATA,
    resultSkills: [
      {
        en: "Acquisition Card Administration ",
        fr: "Administration de carte d'achat"
      }
    ]
  }
];
it("/results route page renders resultsLayoutController with expected results", async () => {
  delete window.location;
  window.location = {
    toString: () =>
      "localhost:3030/secured/results?branch%5B%5D=branchStringEn0&classification%5B%5D=aaaaaaaa-bbbb-cccc-0004-000000000000&exFeeder=true&location%5B%5D=aaaaaaaa-bbbb-cccc-0003-000000000000&name=nameString0&searchValue=broadString0&skills%5B%5D=aaaaaaaa-bbbb-cccc-0005-000000000000"
  };
  axios.get = jest.fn(async () => ({
    data: mockResultsData
  }));
  const wrapper = mountWithIntl(<Results />);
  await flushPromises();
  wrapper.update();
  const layouts = wrapper.find("ResultsLayoutController");
  expect(layouts.length).toBe(1);
  expect(layouts.first().props().results).toEqual(mockResultsData);
});
