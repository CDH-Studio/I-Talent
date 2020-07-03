const Fuse = require("fuse.js");

async function fuzzySearch(profiles, searchValue) {
  const options = {
    shouldSort: true,
    threshold: 0.3,
    keys: [
      "acting.description",
      "branch.en",
      "branch.fr",
      "careerSummary.header",
      "careerSummary.subheader",
      "careerSummary.content",
      "classification.description",
      "competencies.en",
      "competencies.fr",
      "education.school.description.en",
      "education.school.description.fr",
      "education.diploma.description.en",
      "education.diploma.description.fr",
      "email",
      "firstName",
      "jobTitle.en",
      "jobTitle.fr",
      "lastName",
      "location.description.en",
      "location.description.fr",
      "manager",
      "cellphone",
      "organizationList.en",
      "organizationList.fr",
      "skills.description.en",
      "skills.description.fr",
      "team",
      "telephone",
      "projects.text",
      "exFeeder",
    ],
  };

  console.log(profiles);

  const fuse = new Fuse(profiles, options);
  const results = fuse.search(searchValue).map(({ item }) => item);
  return results;
}

module.exports = fuzzySearch;
