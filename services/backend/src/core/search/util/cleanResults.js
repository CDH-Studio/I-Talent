function cleanResults(profiles) {
  return profiles.map(
    ({
      id,
      avatarColor,
      firstName,
      lastName,
      isConnection,
      jobTitle,
      branch,
      officeLocation,
      resultSkills,
      totalResultSkills,
      groupLevel,
      nameInitials,
      status,
    }) => ({
      id,
      avatarColor,
      firstName,
      lastName,
      isConnection,
      jobTitle,
      branch,
      officeLocation,
      resultSkills,
      totalResultSkills,
      groupLevel,
      nameInitials,
      status,
    })
  );
}

module.exports = cleanResults;
