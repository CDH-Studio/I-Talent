const axios = require("axios");
const { PrismaClient } = require("../../database/client");
require("dotenv").config();

const prisma = new PrismaClient();

async function getGedsAssist(request, response) {
  const { id } = request.params;
  const { name } = request.query;
  const nameArray = name.split(" ");

  const url = `${process.env.GEDSAPIURL}employees?searchValue=${nameArray[1]}%2C%20${nameArray[0]}&searchField=0&searchCriterion=2&searchScope=sub&searchFilter=2&maxEntries=200&pageNumber=1&returnOrganizationInformation=yes`;

  const promises = [
    axios({
      methon: "get",
      url: url,
      headers: {
        "user-key": process.env.GEDSAPIKEY,
        Accept: "application/json",
      },
    }),
    prisma.users.findOne({ where: { id }, select: { email: true } }),
  ];

  Promise.all(promises)
    .then(async (result) => {
      const dataGEDSArray = result[0].data;
      const dataDB = result[1].dataValues;

      const dataGEDS = dataGEDSArray.find((element) => {
        return element.contactInformation.email === dataDB.email;
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
        };
        organizationCounter += 1;
        organizations.unshift(branchInfo);
      }

      const branchOrg = organizations[Math.min(2, organizations.length - 1)];
      try {
        const location = await prisma.opOfficeLocations.findMany({
          where: {
            country: branchOrg.addressInformation.country,
            city: branchOrg.addressInformation.city,
            postalCode: branchOrg.addressInformation.postalCode,
            streetNumber: branchOrg.addressInformation.streetNumber,
            translations: {
              some: {
                province: branchOrg.addressInformation.province,
                streetName: branchOrg.addressInformation.streetNumber,
              },
            },
          },
        });

        const profile = {
          firstName: dataGEDS.givenName,
          lastName: dataGEDS.surname,
          jobTitle: {
            en: dataGEDS.title.en,
            fr: dataGEDS.title.fr,
          },
          email: dataGEDS.contactInformation.email,
          telephone: dataGEDS.phoneNumber,
          cellphone: dataGEDS.altPhoneNumber,
          branchEn: branchOrg.description.en,
          branchFr: branchOrg.description.fr,
          organizations: organizations,
          location: {
            id: location.id,
            description: {
              en: `${location[0].addressEn}, ${location[0].city}, ${location[0].provinceEn}`,
              fr: `${location[0].addressFr}, ${location[0].city}, ${location[0].provinceFr}`,
            },
          },
        };

        response.status(200).send(profile);
      } catch (error) {
        console.log(error);
        response.status(500).json("Unable to get location");
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json("Unable to get geds Profile");
    });
}

module.exports = {
  getGedsAssist,
};
