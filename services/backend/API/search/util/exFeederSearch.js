const exFeederSearch = profiles => {
  let results = profiles.filter(profile => profile.exFeeder === true);
  return results;
};

module.exports = exFeederSearch;
