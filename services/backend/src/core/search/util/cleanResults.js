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
      skills,
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
      branch,
      officeLocation,
      skills: skills ? skills.slice(0, 3) : [],
      totalSkillsCount: skills ? skills.length : 0,
      groupLevel,
      nameInitials,
      status,
      matches,
    })
  );
}

module.exports = cleanResults;
