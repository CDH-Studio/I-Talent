const branchSearch = async (profiles, branchArray) => {
  let results = profiles.filter(profile =>
    branchArray.includes(encodeURI(profile.branch))
  );
  return results;
};

module.exports = branchSearch;
