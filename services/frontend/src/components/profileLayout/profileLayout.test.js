import React from "react";
//import ProfileLayoutView from "./profileLayoutView";

import ProfileLayoutController from "./profileLayoutController.js";
import { mountWithIntl } from "../../../test/intlHelper";
import moment from "moment";

import {
  EMPTY_PROFILE_DATA,
  FULL_PROFILE_DATA
} from "../../../test/testValues";

delete window.localStorage;
window.localStorage = {
  getItem: name =>
    ({ userId: "1e3b88e6-2035-11ea-8771-fbf73ca08e3f", lang: "en" }[name])
};

it("Profile layout renders expected elements on own profile with empty profileInfo", () => {
  const wrapper = mountWithIntl(
    <ProfileLayoutController
      changeLanguage={jest.fn()}
      keycloak={{}}
      editable={true}
      privateView={true}
      visibleProfileCards={{
        skills: true,
        competencies: true,
        developmentalGoals: true,
        education: true,
        careerOverview: true,
        projects: true,
        careerInterests: true,
        info: true,
        manager: true,
        officialLanguage: true,
        talentManager: true
      }}
      profileInfo={EMPTY_PROFILE_DATA}
      updateProfileInfo={jest.fn()}
      redirectFunction={jest.fn()}
    />
  );

  expect(wrapper.find("NavigationBarController").length).toBe(1);
  expect(wrapper.find("Sidebar").length).toBe(1);
  expect(wrapper.find("ProfileCardController").length).toBe(11);
  expect(wrapper.find("EditModalController").length).toBe(13);
});

it("Profile layout renders expected elements on own profile with full profileInfo", () => {
  const wrapper = mountWithIntl(
    <ProfileLayoutController
      changeLanguage={jest.fn()}
      keycloak={{}}
      editable={true}
      privateView={true}
      visibleProfileCards={{
        skills: true,
        competencies: true,
        developmentalGoals: true,
        education: true,
        careerOverview: true,
        projects: true,
        careerInterests: true,
        info: true,
        manager: true,
        officialLanguage: true,
        talentManager: true
      }}
      profileInfo={FULL_PROFILE_DATA}
      updateProfileInfo={jest.fn()}
      redirectFunction={jest.fn()}
    />
  );

  // expect primary items to be present
  expect(wrapper.find("NavigationBarController").length).toBe(1);
  expect(wrapper.find("Sidebar").length).toBe(1);
  expect(wrapper.find("ProfileCardController").length).toBe(11);
  expect(wrapper.find("EditModalController").length).toBe(13);
});

it("Profile layout renders expected text strings when on own profile with full profileInfo", () => {
  const wrapper = mountWithIntl(
    <ProfileLayoutController
      changeLanguage={jest.fn()}
      keycloak={{}}
      editable={true}
      privateView={true}
      visibleProfileCards={{
        skills: true,
        competencies: true,
        developmentalGoals: true,
        education: true,
        careerOverview: true,
        projects: true,
        careerInterests: true,
        info: true,
        manager: true,
        officialLanguage: true,
        talentManager: true
      }}
      profileInfo={FULL_PROFILE_DATA}
      updateProfileInfo={jest.fn()}
      redirectFunction={jest.fn()}
    />
  );

  const visibleProfileData = Object.assign({}, FULL_PROFILE_DATA);

  //not used / not directly used
  delete visibleProfileData.flagged;
  delete visibleProfileData.gradedOnSecondLanguage;
  delete visibleProfileData.secondLanguage;

  //not visible unless hovering
  delete visibleProfileData.organizationList;
  delete visibleProfileData.team;

  //url strings are used as hrefs, not directly rendered
  expect(wrapper.find({ href: visibleProfileData.githubUrl }).length).toBe(2);
  expect(wrapper.find({ href: visibleProfileData.linkedinUrl }).length).toBe(2);
  expect(wrapper.find({ href: visibleProfileData.twitterUrl }).length).toBe(2);
  delete visibleProfileData.githubUrl;
  delete visibleProfileData.linkedinUrl;
  delete visibleProfileData.twitterUrl;

  expect(
    wrapper.contains(
      moment(visibleProfileData.actingPeriodStartDate).format("DD/MM/YYYY") +
        " - " +
        moment(visibleProfileData.actingPeriodEndDate).format("DD/MM/YYYY")
    )
  ).toBe(true);
  delete visibleProfileData.actingPeriodStartDate;
  delete visibleProfileData.actingPeriodEndDate;

  expect(wrapper.contains("I'm nominated in the EX-Feeder Program.")).toBe(
    true
  );
  delete visibleProfileData.exFeeder;

  expect(wrapper.contains("Yes")).toBe(true);
  delete visibleProfileData.interestedInRemote;

  expect(wrapper.contains("Indeterminate")).toBe(true);
  delete visibleProfileData.indeterminate;

  expect(
    wrapper.contains(visibleProfileData.education[0].diploma.description.en)
  ).toBe(true);
  expect(
    wrapper.contains(visibleProfileData.education[0].school.description.en)
  ).toBe(true);
  expect(
    wrapper.contains(
      moment(visibleProfileData.education[0].startDate).format("MMM YYYY") +
        " - " +
        moment(visibleProfileData.education[0].endDate).format("MMM YYYY")
    )
  ).toBe(true);
  expect(
    wrapper.contains(visibleProfileData.education[1].diploma.description.en)
  ).toBe(true);
  expect(
    wrapper.contains(visibleProfileData.education[1].school.description.en)
  ).toBe(true);
  expect(
    wrapper.contains(
      moment(visibleProfileData.education[1].startDate).format("MMM YYYY") +
        " - Present"
    )
  ).toBe(true);
  delete visibleProfileData.education;

  expect(wrapper.contains(visibleProfileData.careerSummary[0].header)).toBe(
    true
  );
  expect(wrapper.contains(visibleProfileData.careerSummary[0].subheader)).toBe(
    true
  );
  expect(wrapper.contains(visibleProfileData.careerSummary[0].content)).toBe(
    true
  );
  expect(
    wrapper.contains(
      moment(visibleProfileData.careerSummary[0].startDate).format("MMM YYYY") +
        " - " +
        moment(visibleProfileData.careerSummary[0].endDate).format("MMM YYYY")
    )
  ).toBe(true);
  expect(wrapper.contains(visibleProfileData.careerSummary[1].header)).toBe(
    true
  );
  expect(wrapper.contains(visibleProfileData.careerSummary[1].subheader)).toBe(
    true
  );
  expect(wrapper.contains(visibleProfileData.careerSummary[1].content)).toBe(
    true
  );
  expect(
    wrapper.contains(
      moment(visibleProfileData.careerSummary[1].startDate).format("MMM YYYY") +
        " - Present"
    )
  ).toBe(true);
  delete visibleProfileData.careerSummary;

  //convert some other dates into more other profile strings
  visibleProfileData.secondaryOralDate = moment(
    visibleProfileData.secondaryOralDate
  ).format("ll");
  visibleProfileData.secondaryReadingDate = moment(
    visibleProfileData.secondaryReadingDate
  ).format("ll");
  visibleProfileData.secondaryWritingDate = moment(
    visibleProfileData.secondaryWritingDate
  ).format("ll");

  /* expect other profile strings to be rendered */
  for (const [key, value] of Object.entries(visibleProfileData)) {
    if (Array.isArray(value)) {
      for (const element of value) {
        let string = element.text || element.description || element;
        string = string.en || string;
        expect(wrapper.contains(string)).toBe(true);
      }
    } else {
      let string = value.description || value;
      string = string.en || string;
      expect(wrapper.contains(string)).toBe(true);
    }
  }

  //default word used to replace unfilled information should not have to be used
  expect(wrapper.contains("Undefined")).toBe(false);
});

it("Profile layout renders expected elements on another user's profile with empty profileInfo and all profile cards hidden", () => {
  const wrapper = mountWithIntl(
    <ProfileLayoutController
      changeLanguage={jest.fn()}
      keycloak={{}}
      editable={false}
      privateView={false}
      visibleProfileCards={{
        skills: false,
        competencies: false,
        developmentalGoals: false,
        education: false,
        careerOverview: false,
        projects: false,
        careerInterests: false,
        info: false,
        manager: false,
        officialLanguage: false,
        talentManager: false
      }}
      profileInfo={EMPTY_PROFILE_DATA}
      updateProfileInfo={jest.fn()}
      redirectFunction={jest.fn()}
    />
  );

  expect(wrapper.find("NavigationBarController").length).toBe(1);
  expect(wrapper.find("Sidebar").length).toBe(1);
  expect(wrapper.find("ProfileCardController").length).toBe(0);
  expect(wrapper.find("EditModalController").length).toBe(0);
});

it("Profile layout renders expected elements on another user's profile with full profileInfo and all profile cards hidden", () => {
  const wrapper = mountWithIntl(
    <ProfileLayoutController
      changeLanguage={jest.fn()}
      keycloak={{}}
      editable={false}
      privateView={false}
      visibleProfileCards={{
        skills: false,
        competencies: false,
        developmentalGoals: false,
        education: false,
        careerOverview: false,
        projects: false,
        careerInterests: false,
        info: false,
        manager: false,
        officialLanguage: false,
        talentManager: false
      }}
      profileInfo={FULL_PROFILE_DATA}
      updateProfileInfo={jest.fn()}
      redirectFunction={jest.fn()}
    />
  );
  expect(wrapper.find("NavigationBarController").length).toBe(1);
  expect(wrapper.find("ProfileCardController").length).toBe(0);
  expect(wrapper.find("EditModalController").length).toBe(0);
});

it("Profile layout renders expected elements on another user's profile with empty profileInfo and all profile cards visible", () => {
  const wrapper = mountWithIntl(
    <ProfileLayoutController
      changeLanguage={jest.fn()}
      keycloak={{}}
      editable={false}
      privateView={false}
      visibleProfileCards={{
        skills: true,
        competencies: true,
        developmentalGoals: true,
        education: true,
        careerOverview: true,
        projects: true,
        careerInterests: true,
        info: true,
        manager: true,
        officialLanguage: true,
        talentManager: true
      }}
      profileInfo={EMPTY_PROFILE_DATA}
      updateProfileInfo={jest.fn()}
      redirectFunction={jest.fn()}
    />
  );
  expect(wrapper.find("NavigationBarController").length).toBe(1);
  expect(wrapper.find("ProfileCardController").length).toBe(10);
  expect(wrapper.find("EditModalController").length).toBe(0);
});

it("Profile layout renders expected elements on another user's profile with full profileInfo and all profile cards visible", () => {
  const wrapper = mountWithIntl(
    <ProfileLayoutController
      changeLanguage={jest.fn()}
      keycloak={{}}
      editable={false}
      privateView={false}
      visibleProfileCards={{
        skills: true,
        competencies: true,
        developmentalGoals: true,
        education: true,
        careerOverview: true,
        projects: true,
        careerInterests: true,
        info: true,
        manager: true,
        officialLanguage: true,
        talentManager: true
      }}
      profileInfo={FULL_PROFILE_DATA}
      updateProfileInfo={jest.fn()}
      redirectFunction={jest.fn()}
    />
  );
  expect(wrapper.find("NavigationBarController").length).toBe(1);
  expect(wrapper.find("ProfileCardController").length).toBe(10);
  expect(wrapper.find("EditModalController").length).toBe(0);
});
