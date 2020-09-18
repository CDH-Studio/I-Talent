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
      groupLevel,
      nameInitials,
      status,
    })
  );
}

module.exports = cleanResults;
