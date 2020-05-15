async function classificationSearch(profiles, classificationArray) {
	const classificationProf = [];

	profiles.forEach((profile) => {
		if (!profile.classification) return;
		const classificationId = profile.classification.id;

		if (classificationArray.includes(classificationId))
			classificationProf.push(profile);
	});
	return classificationProf;
}

module.exports = classificationSearch;
