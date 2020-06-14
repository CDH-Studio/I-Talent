async function mentorshipSkillSearch(profiles, skillarray) {
  const mentorSkillProf = [];
  profiles.forEach((profile) => {
    if (!profile.mentorshipSkills) return;
    const skillIds = profile.mentorshipSkills.map((skill) => skill.id);
    if (skillIds.some((id) => skillarray.includes(id)))
      mentorSkillProf.push(profile);
  });
  return mentorSkillProf;
}

module.exports = mentorshipSkillSearch;
