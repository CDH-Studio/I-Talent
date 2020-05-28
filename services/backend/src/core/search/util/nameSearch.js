const Fuse = require("fuse.js");

async function nameSearch(profiles, searchValue) {
  const options = {
    shouldSort: true,
    threshold: 0.3,
    keys: ["fullName"],
  };

  const searchData = profiles.map((profile) => ({
    ...profile,
    fullName: `${profile.firstName} ${profile.lastName}`,
  }));

  const fuse = new Fuse(searchData, options);

  const results = fuse.search(searchValue).map(({ item }) => item);
  return results;
}

module.exports = nameSearch;
