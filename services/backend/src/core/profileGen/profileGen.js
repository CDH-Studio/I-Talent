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
    .then((result) => {
      const dataGEDSArray = result[0].data;
      const dataDB = result[1].dataValues;
      console.log(dataGEDSArray);

      const dataGEDS = dataGEDSArray.find((element) => {
        return element.contactInformation.email === dataDB.email;
      });

      response.status(200).send(dataGEDS);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  getGedsAssist,
};
