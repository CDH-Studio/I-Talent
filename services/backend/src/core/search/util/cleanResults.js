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
      matches,
    }) => ({
      id,
      avatarColor,
      firstName,
      lastName,
      isConnection,
      jobTitle,
      branch: branch && branch.name,
      officeLocation,
      resultSkills,
      totalResultSkills,
      groupLevel,
      nameInitials,
      status,
      matches,
    })
  );
}

module.exports = cleanResults;
