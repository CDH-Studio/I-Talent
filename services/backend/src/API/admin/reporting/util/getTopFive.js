const getTopFive = talents => {
  const topFive = [];

  talents.slice(0, 5).forEach(talent => {
    topFive.push({
      description: { en: talent.descriptionEn, fr: talent.descriptionFr },
      count: parseInt(talent.countOccurences)
        ? parseInt(talent.countOccurences)
        : 0
    });
  });

  return topFive;
};

module.exports = getTopFive;
