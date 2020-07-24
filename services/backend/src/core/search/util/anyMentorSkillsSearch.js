async function anyMentorshipSkillSearch(profiles) {
  const skillProf = [];

  profiles.forEach((profile) => {
    if (profile.mentorshipSkills && profile.mentorshipSkills.length) {
      skillProf.push(profile);
    }
  });

  return skillProf;
}

module.exports = anyMentorshipSkillSearch;
