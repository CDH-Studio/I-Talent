"use strict";
const axios = require("axios");
require("dotenv").config();

async function getGedsProfile(searchValue) {
  return new Promise(async (resolve, reject) => {
    const url =
      process.env.GEDSAPIURL +
      "employees?searchValue=" +
      encodeURI(searchValue) +
      "&searchField=9&searchCriterion=2&searchScope=sub&searchFilter=2&maxEntries=1000&returnOrganizationInformation=yes";
    let info = [];
    await axios({
      methon: "get",
      url: url,
      headers: {
        "user-key": process.env.GEDSAPIKEY,
        Accept: "application/json"
      }
    })
      .then(res => {
        if (res.status == 200) {
          res.data.forEach(employee => {
            let currentBranch = employee;
            let organizations = [];
            while (currentBranch.organizationInformation != null) {
              let branchInfo = {
                organizationId:
                  currentBranch.organizationInformation.organization.id,
                organization: {
                  addressInformation:
                    currentBranch.organizationInformation.organization
                      .addressInformation,
                  description:
                    currentBranch.organizationInformation.organization
                      .description
                }
              };
              organizations.push(branchInfo);
              currentBranch =
                currentBranch.organizationInformation.organization;
            }
            organizations = organizations.reverse();
            let contactInfo = {};
            if (employee.contactInformation.email != "")
              contactInfo.email = employee.contactInformation.email;
            if (employee.contactInformation.phoneNumber != "")
              contactInfo.phoneNumber = employee.contactInformation.phoneNumber;
            if (employee.contactInformation.altPhoneNumber != "")
              contactInfo.altPhoneNumber =
                employee.contactInformation.altPhoneNumber;
            let empInfo = {
              id: employee.id,
              givenName: employee.givenName,
              surname: employee.surname,
              title: employee.title,
              organizations: organizations,
              ...contactInfo
            };
            info.push(empInfo);
          });
          if (info.length == 0) {
            reject({ status: 204, statusText: "No content" });
          }
          resolve(info);
        } else {
          reject({ status: res.status, statusText: res.statusText });
        }
      })
      .catch(err => {
        console.error(err);
        if (err.response.status == 429) {
          reject({ status: 429, statusText: "Limit Exceeded" });
        }
      });
  });
}

module.exports = getGedsProfile;
