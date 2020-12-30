async function branchSearch(profiles, branchArray) {
  return profiles.filter(
    (profile) => profile.branch && branchArray.includes(profile.branch.name)
  );
}

module.exports = branchSearch;
