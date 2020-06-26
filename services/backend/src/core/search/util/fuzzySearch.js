const Fuse = require("fuse.js");

async function fuzzySearch(profiles, searchValue) {
  const options = {
    shouldSort: true,
    threshold: 0.3,
    keys: [
      "actingLevel.name",
      "branch",
      "experiences.description",
      "experiences.jobTitle",
      "experiences.organization",
      "groupLevel.name",
      "competencies.name",
      "educations.school",
      "educations.diploma",
      "email",
      "firstName",
      "jobTitle",
      "lastName",
      "officeLocation.city",
      "officeLocation.streetNumber",
      "officeLocation.province",
      "officeLocation.streetName",
      "manager",
      "cellphone",
      "organizations",
      "skills.name",
      "team",
      "telephone",
      "projects",
      "exFeeder",
      "tenure",
    ],
  };

  const fuse = new Fuse(profiles, options);
  const results = fuse.search(searchValue).map(({ item }) => item);
  return results;
}

module.exports = fuzzySearch;
