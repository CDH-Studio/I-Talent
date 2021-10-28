const axios = require("axios");
const querystring = require("querystring");
const prisma = require("../../database");
const config = require("../../config");
const { getKeycloakUserId } = require("../../utils/keycloak");

function getUrl(email) {
  const qs = querystring.stringify({
    searchValue: email,
    searchField: 5,
    searchCriterion: 2,
    searchScope: "sub",
    searchFilter: 2,
    maxEntries: 200,
    pageNumber: 1,
    returnOrganizationInformation: "yes",
  });

  return `${config.GEDSAPIURL}employees?${qs}`;
}

async function getGedsSetup(request, response) {
  const id = getKeycloakUserId(request);
  const { email } = request.query;

  // seach GC directory using email
  const [{ data: dataGEDSArray }, { email: dataDBEmail }] = await Promise.all([
    axios({
      method: "get",
      url: getUrl(email),
      headers: {
        "user-key": config.GEDSAPIKEY,
        Accept: "application/json",
      },
      timeout: 5000,
    }),
    prisma.user.findUnique({ where: { id }, select: { email: true } }),
  ]);

  if (
    !dataGEDSArray ||
    !Array.isArray(dataGEDSArray) ||
    dataGEDSArray.length === 0
  ) {
    return response.status(200).send({});
  }

  const dataGEDS = dataGEDSArray.find(
    (element) => element.contactInformation.email.toLowerCase() === dataDBEmail.toLowerCase()
  );

  const organizations = [];
  let organizationCounter = 0;
  for (
    let currentBranch = dataGEDS;
    currentBranch.organizationInformation;
    currentBranch = currentBranch.organizationInformation.organization
  ) {
    const branchInfo = {
      description:
        currentBranch.organizationInformation.organization.description,
      tier: organizationCounter,
      addressInformation:
        currentBranch.organizationInformation.organization.addressInformation,
      id: currentBranch.organizationInformation.organization.id,
    };
    organizationCounter += 1;
    organizations.unshift(branchInfo);
  }

  const branchOrg = organizations[Math.min(2, organizations.length - 1)];

  const enAddr = branchOrg.addressInformation.address.en;

  const location = await prisma.opOfficeLocation.findMany({
    where: {
      country: branchOrg.addressInformation.country.en,
      city: branchOrg.addressInformation.city.en,
      postalCode: branchOrg.addressInformation.pc,
      streetNumber: parseInt(enAddr.split(" ")[0], 10),
    },
    select: {
      id: true,
      city: true,
    },
  });

  const profile = {
    firstName: dataGEDS.givenName,
    lastName: dataGEDS.surname,
    locationId: location[0].id,
    locationName: `${enAddr}, ${location[0].city}`,
    email: dataGEDS.contactInformation.email,
    branch: {
      ENGLISH: branchOrg.description.en,
      FRENCH: branchOrg.description.fr,
    },
    telephone: dataGEDS.contactInformation
      ? dataGEDS.contactInformation.phoneNumber
      : null,
    cellphone: dataGEDS.contactInformation
      ? dataGEDS.contactInformation.altPhoneNumber
      : null,
    jobTitle: {
      ENGLISH: dataGEDS.title ? dataGEDS.title.en : null,
      FRENCH: dataGEDS.title ? dataGEDS.title.fr : null,
    },
    organizations: organizations.map((org) => ({
      title: {
        ENGLISH: org.description.en,
        FRENCH: org.description.fr,
      },
      id: org.id,
      tier: org.tier,
    })),
  };

  return response.status(200).send(profile);
}

module.exports = {
  getGedsSetup,
};
