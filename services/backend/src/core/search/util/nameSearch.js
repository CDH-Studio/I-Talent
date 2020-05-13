const Fuse = require("fuse.js");

async function nameSearch(profiles, searchValue) {
	const options = {
		shouldSort: true,
		threshold: 0.3,
		keys: ["firstName", "lastName"],
	};

	const fuse = new Fuse(profiles, options);

	const results = fuse.search(searchValue);
	return results;
}

module.exports = nameSearch;
