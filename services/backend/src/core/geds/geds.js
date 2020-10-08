const axios = require("axios");
const prisma = require("../../database");
const config = require("../../config");
const { handleAxiosErrors } = require("../../utils/handleErrors");

async function getGedsSetup(request, response) {
  const { id } = request.params;
  const { name } = request.query;
  const nameArray = name.split(" ");

  const url = `${config.GEDSAPIURL}employees?searchValue=${nameArray[1]}%2C%20${nameArray[0]}&searchField=0&searchCriterion=2&searchScope=sub&searchFilter=2&maxEntries=200&pageNumber=1&returnOrganizationInformation=yes`;

  const promises = [
    axios({
      method: "get",
      url: url,
      headers: {
        "user-key": config.GEDSAPIKEY,
        Accept: "application/json",
      },
      timeout: 5000,
    }),
    prisma.user.findOne({ where: { id }, select: { email: true } }),
  ];

  Promise.all(promises)
    .then(async (result) => {
      const dataGEDSArray = result[0].data;
      const dataDBEmail = result[1].email;

      const dataGEDS = dataGEDSArray.find((element) => {
        return element.contactInformation.email === dataDBEmail;
      });

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
            currentBranch.organizationInformation.organization
              .addressInformation,
          id: currentBranch.organizationInformation.organization.id,
        };
        organizationCounter += 1;
        organizations.unshift(branchInfo);
      }

      const branchOrg = organizations[Math.min(2, organizations.length - 1)];

      const enAddr = branchOrg.addressInformation.address.en;

      try {
        const location = await prisma.opOfficeLocation.findMany({
          where: {
            country: branchOrg.addressInformation.country.en,
            city: branchOrg.addressInformation.city.en,
            postalCode: branchOrg.addressInformation.pc,
            streetNumber: parseInt(enAddr.split(" ")[0], 10),
          },
        });

        const profile = {
          firstName: dataGEDS.givenName,
          lastName: dataGEDS.surname,

          locationId: location[0].id,
          email: dataGEDS.contactInformation.email,
          branch: {
            ENGLISH: branchOrg.description.en,
            FRENCH: branchOrg.description.en,
          },
          telephone: dataGEDS.contactInformation.phoneNumber,
          cellphone: dataGEDS.contactInformation.altPhoneNumber,
          jobTitle: {
            ENGLISH: dataGEDS.title.en,
            FRENCH: dataGEDS.title.fr,
          },
          organizations: [
            organizations.map((org) => ({
              title: {
                ENGLISH: org.description.en,
                FRENCH: org.description.fr,
              },
              id: org.id,
              tier: org.tier,
            })),
          ],
        };

        response.status(200).send(profile);
      } catch (error) {
        console.log(error);
        response.status(500).json("Unable to parse geds data");
      }
    })
    .catch((error) => {
      handleAxiosErrors(error);
      response.status(500).json("Unable to get geds Profile");
    });
}

module.exports = {
  getGedsSetup,
};
