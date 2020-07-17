const axios = require("axios");
const { PrismaClient } = require("../../database/client");
require("dotenv").config();

const prisma = new PrismaClient();

async function getGedsAssist(request, response) {
  console.log("GET GEDS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  const { id } = request.params;
  const { name } = request.query;
  const nameArray = name.split(" ");

  /*
const url = `${
    process.env.GEDSAPIURL
  }employees?searchValue=${"Machado"}%2C%20${"Mena"}&searchField=0&searchCriterion=2&searchScope=sub&searchFilter=2&maxEntries=200&pageNumber=1&returnOrganizationInformation=yes`;

*/

  //nameArray[1]  nameArray[0]
  const url = `${process.env.GEDSAPIURL}employees?searchValue=${nameArray[1]}%2C%20${nameArray[0]}&searchField=0&searchCriterion=2&searchScope=sub&searchFilter=2&maxEntries=200&pageNumber=1&returnOrganizationInformation=yes`;
  console.log(url);
  /*const res = await axios({
    method: "get",
    url: url,
    headers: {
      "user-key": process.env.GEDSAPIKEY,
      Accept: "application/json",
    },
  });
*/
  const promises = [
    axios({
      method: "get",
      url: url,
      headers: {
        "user-key": process.env.GEDSAPIKEY,
        Accept: "application/json",
      },
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
      const frAddr = branchOrg.addressInformation.address.fr;

      try {
        const location = await prisma.opOfficeLocation.findMany({
          where: {
            country: branchOrg.addressInformation.country.en,
            city: branchOrg.addressInformation.city.en,
            postalCode: branchOrg.addressInformation.pc,
            streetNumber: parseInt(enAddr.split(" ")[0], 10),
          },
        });

        const city = branchOrg.addressInformation.city;
        const province = branchOrg.addressInformation.province;

        const profile = {
          firstName: dataGEDS.givenName,
          lastName: dataGEDS.surname,

          locationId: location[0].id,
          email: dataGEDS.contactInformation.email,
          branch: {
            ENGLISH: branchOrg.description.en,
            FRENCH: branchOrg.description.en,
          },
          telephone: dataGEDS.phoneNumber,
          cellphone: dataGEDS.altPhoneNumber,
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
        /*
          gcconnex: null,
          github: null,
          linkedin: null,
          teams: null,
        */
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
