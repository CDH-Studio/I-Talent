async function branchSearch(profiles, branchArray) {
  return profiles.filter((profile) => branchArray.includes(profile.branch));
}

module.exports = branchSearch;
