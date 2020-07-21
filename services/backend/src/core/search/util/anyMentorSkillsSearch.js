async function anyMentorshipSkillSearch(profiles) {
  const skillProf = [];

  profiles.forEach((profile) => {
    if (!profile.mentorSkills) false;

    return Boolean(profile.mentorSkills.length);
  });

  return skillProf;
}

module.exports = anyMentorshipSkillSearch;
