async function anyMentorshipSkillsSearch(profiles) {
  const mentorSkillProf = [];
  profiles.forEach((profile) => {
    if (profile.mentorshipSkills && profile.mentorshipSkills.length !== 0) {
      mentorSkillProf.push(profile);
    }
  });
  return mentorSkillProf;
}

module.exports = anyMentorshipSkillsSearch;
