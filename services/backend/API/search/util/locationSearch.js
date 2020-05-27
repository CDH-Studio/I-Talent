const locationSearch = async (profiles, locationArray) => {
  let locationProf = [];

  profiles.forEach(profile => {
    if (!profile.location) return;
    const locationId = profile.location.id;

    if (locationArray.includes(locationId)) locationProf.push(profile);
  });
  return locationProf;
};

module.exports = locationSearch;
