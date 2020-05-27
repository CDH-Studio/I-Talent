const Fuse = require("fuse.js");

const nameSearch = async (profiles, searchValue) => {
  const options = {
    shouldSort: true,
    threshold: 0.3,
    keys: ["firstName", "lastName"]
  };

  const fuse = new Fuse(profiles, options);

  let results = fuse.search(searchValue);
  return results;
};

module.exports = nameSearch;
