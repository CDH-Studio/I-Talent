const axios = require("axios");
require("dotenv").config();
const models = require("../../database/models");

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
    models.user.findOne({ where: { id } }),
  ];

  Promise.all(promises)
    .then(async (result) => {
      const dataGEDSArray = result[0].data;
      const dataDB = result[1].dataValues;

      const dataGEDS = dataGEDSArray.find((element) => {
        return element.contactInformation.email === dataDB.email;
      });

      // eslint-disable-next-line prefer-const
      let organizations = [];
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

      const location = await models.location
        .findOne({
          where: {
            postalCode: branchOrg.addressInformation.pc,
          },
        })
        .then((res) => {
          if (res) return res.dataValues;
          return {};
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
            en: `${location.addressEn}, ${location.city}, ${location.provinceEn}`,
            fr: `${location.addressFr}, ${location.city}, ${location.provinceFr}`,
          },
        },
      };

      response.status(200).send(profile);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  getGedsAssist,
};
