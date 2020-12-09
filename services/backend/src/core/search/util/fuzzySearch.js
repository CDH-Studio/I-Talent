const Fuse = require("fuse.js");

async function fuzzySearch(profiles, searchValue) {
  const options = {
    shouldSort: true,
    threshold: 0.5,
    includeMatches: true,
    keys: [
      "actingLevel.name",
      "branch.name",
      "branch.acronym",
      "experiences.description",
      "experiences.jobTitle",
      "experiences.projects",
      "experiences.organization",
      "groupLevel.name",
      "competencies.name",
      "educations.school",
      "educations.diploma",
      "qualifiedPools.jobTitle",
      "qualifiedPools.selectionProcessNumber",
      "qualifiedPools.classification.name",
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
      "organizations.description",
      "skills.name",
      "teams",
      "telephone",
      "tenure",
    ],
  };

  const fuse = new Fuse(profiles, options);
  const results = fuse
    .search(searchValue)
    .map(({ item, matches }) => ({ ...item, matches: matches }));
  return results;
}

module.exports = fuzzySearch;
