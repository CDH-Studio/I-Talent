async function locationSearch(profiles, locationArray) {
  const locationProf = [];

  profiles.forEach((profile) => {
    if (!profile.officeLocation) return;

    if (locationArray.includes(profile.officeLocation.id)) {
      locationProf.push(profile);
    }
  });

  return locationProf;
}

module.exports = locationSearch;
