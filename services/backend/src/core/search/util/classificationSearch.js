async function classificationSearch(profiles, classificationArray) {
  const classificationProf = [];

  profiles.forEach((profile) => {
    if (!profile.groupLevel) return;

    if (classificationArray.includes(profile.groupLevel.id)) {
      classificationProf.push(profile);
    }
  });

  return classificationProf;
}

module.exports = classificationSearch;
