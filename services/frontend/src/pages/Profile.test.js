import React from "react";
import flushPromises from "flush-promises";

import Profile from "./Profile";
import axios from "axios";

import { mountWithIntl } from "../../test/intlHelper";

import { FULL_PROFILE_DATA } from "../../test/testValues";

const BACK_PUBLIC_PROFILE_URL =
  "localhost:8080/api/profile/faba08aa-ffe3-11e9-8d71-362b9e155667";
const FRONT_PUBLIC_PROFILE_URL =
  "localhost:3000/secured/profile/faba08aa-ffe3-11e9-8d71-362b9e155667";
const BACK_PRIVATE_PROFILE_URL =
  "localhost:8080/api/private/profile/1e3b88e6-2035-11ea-8771-fbf73ca08e3f";
const FRONT_PRIVATE_PROFILE_URL = "localhost:3000/secured/profile/";

/** mock config's backend address */
jest.mock("../config", () => ({ backendAddress: "localhost:8080/" }));

it("/Profile page makes expected axios call on a public profile", async () => {
  axios.get = jest.fn(async url => {
    return { [BACK_PUBLIC_PROFILE_URL]: { data: FULL_PROFILE_DATA } }[url];
  });

  delete window.location;
  window.location = {
    reload: jest.fn(),
    toString: () => FRONT_PUBLIC_PROFILE_URL
  };

  const wrapper = mountWithIntl(
    <Profile changeLanguage={jest.fn()} keycloak={{}} />
  );
  await flushPromises();

  expect(wrapper.find("ProfileLayoutController").length).toBe(1);

  expect(axios.get.mock.calls.length).toBe(1);
  expect(axios.get.mock.calls[0][0]).toBe(BACK_PUBLIC_PROFILE_URL);
});

it("/Profile page makes expected axios call on a private profile", async () => {
  /** mock get request response for private profile */
  axios.get = jest.fn(
    async url =>
      ({ [BACK_PRIVATE_PROFILE_URL]: { data: FULL_PROFILE_DATA } }[url])
  );

  /** mock window location */
  delete window.location;
  window.location = {
    reload: jest.fn(),
    toString: () => FRONT_PRIVATE_PROFILE_URL
  };

  /** mock stored localId */
  delete window.localStorage;
  window.localStorage = {
    getItem: name => ({ userId: "1e3b88e6-2035-11ea-8771-fbf73ca08e3f" }[name])
  };

  const wrapper = mountWithIntl(
    <Profile changeLanguage={jest.fn()} keycloak={{}} />
  );

  await flushPromises();
  expect(wrapper.find("ProfileLayoutController").length).toBe(1);
  expect(axios.get.mock.calls.length).toBe(1);
  expect(axios.get.mock.calls[0][0]).toBe(BACK_PRIVATE_PROFILE_URL);
});
