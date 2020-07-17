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
      resultSkills,
      groupLevel,
      nameInitials,
    }) => ({
      id,
      avatarColor,
      firstName,
      lastName,
      isConnection,
      jobTitle,
      branch,
      resultSkills,
      groupLevel,
      nameInitials,
    })
  );
}

module.exports = cleanResults;
