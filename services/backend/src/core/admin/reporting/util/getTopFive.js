function getTopFive(talents) {
	const topFive = [];

	talents.slice(0, 5).forEach((talent) => {
		topFive.push({
			description: { en: talent.descriptionEn, fr: talent.descriptionFr },
			count: Number(talent.countOccurrences)
				? Number(talent.countOccurrences)
				: 0,
		});
	});

	return topFive;
}

module.exports = getTopFive;
