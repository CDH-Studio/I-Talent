import React from "react";
import { shallow } from "enzyme";
import { mountWithIntl } from "../../../test/intlHelper";
import ResultsLayoutContoller from "./resultsLayoutController";
import ResultsLayoutView from "./resultsLayoutView";
import { FULL_PROFILE_DATA } from "../../../test/testValues";

it("home layout view contains critical components", () => {
  const wrapper = shallow(<ResultsLayoutView />);

  const searchButtons = wrapper.find(".resultContent");
  expect(searchButtons.length).toBe(1);

  const navigationBars = wrapper.find("NavigationBarController");
  expect(navigationBars.length).toBe(1);
});

it("results layout controller contains critical components", () => {
  const wrapper = shallow(<ResultsLayoutContoller />);

  const navigationBars = wrapper.find("ResultsLayoutView");
  expect(navigationBars.length).toBe(1);
});

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
  },
  {
    id: "aaaaaaaa-bbbb-cccc-0000-0000000001",
    ...FULL_PROFILE_DATA,
    resultSkills: [
      {
        en: "Acquisition Card Administration ",
        fr: "Administration de carte d'achat"
      }
    ]
  }
];

it("results layout renders clickable results", () => {
  const mockRedirectFunction = jest.fn();
  const wrapper = mountWithIntl(
    <ResultsLayoutContoller
      redirectFunction={mockRedirectFunction}
      results={mockResultsData}
    />
  );

  const navigationBars = wrapper.find("ResultsLayoutView");
  expect(navigationBars.length).toBe(1);

  const resultCards = wrapper.find("Card");
  expect(resultCards.length).toBe(2);

  resultCards.at(0).simulate("click");
  expect(mockRedirectFunction.mock.calls.length).toBe(1);
  expect(mockRedirectFunction.mock.calls[0][0]).toBe(
    "/secured/profile/" + mockResultsData[0].id
  );
});
