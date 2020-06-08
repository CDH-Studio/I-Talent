async function mentorshipSkillSearch(profiles, skillarray) {
  const skillProf = [];
  profiles.forEach((profile) => {
    if (!profile.mentorshipSkills) return;
    const skillIds = profile.mentorshipSkills.map((skill) => skill.id);
    if (skillIds.some((id) => skillarray.includes(id))) skillProf.push(profile);
  });
  return skillProf;
}

module.exports = mentorshipSkillSearch;
