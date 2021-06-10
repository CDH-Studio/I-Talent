async function mentorSkillSearch(profiles, skillarray) {
  const skillProf = [];
  profiles.forEach((profile) => {
    if (!profile.mentorshipSkills) return;
    let data = [];

    if (profile.mentorshipSkills) {
      data = [...profile.mentorshipSkills];
    }

    const hasSkill = data.some((skill) => skillarray.includes(skill.skillId));

    if (hasSkill) {
      skillProf.push(profile);
    }
  });

  return skillProf;
}

module.exports = mentorSkillSearch;
