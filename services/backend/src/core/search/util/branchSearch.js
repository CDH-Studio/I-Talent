const branchSearch = async (profiles, branchArray) => {
  const results = profiles.filter((profile) =>
    branchArray.includes(encodeURI(profile.branch))
  );
  return results;
};

module.exports = branchSearch;
