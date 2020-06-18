function exFeederSearch(profiles) {
  return profiles.filter((profile) => profile.exFeeder === true);
}

module.exports = exFeederSearch;
