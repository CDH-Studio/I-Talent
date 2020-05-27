function exFeederSearch(profiles) {
	const results = profiles.filter((profile) => profile.exFeeder === true);
	return results;
}

module.exports = exFeederSearch;
