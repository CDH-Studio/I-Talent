async function mentorSkillSearch(profiles, skillarray) {
  const skillProf = [];

  profiles.forEach((profile) => {
    console.log(
      "search filterxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      profile
    );

    if (!profile.mentorshipSkills) return;
    console.log("some profile has mentor skills!!");
    let data = [];

    if (profile.mentorshipSkills) {
      data = [...profile.mentorshipSkills];
    }

    const hasSkill = data.some((skill) => skillarray.includes(skill.id));

    if (hasSkill) {
      skillProf.push(profile);
    }
  });

  return skillProf;
}

module.exports = mentorSkillSearch;

/*
async function skillSearch(profiles, skillarray) {
    const skillProf = [];
    profiles.forEach((profile) => {
      if (!profile.skills) return;
  
      const skillIds = profile.skills.map((skill) => skill.id);
      if (skillIds.some((id) => skillarray.includes(id))) skillProf.push(profile);
    });
    return skillProf;
  }
  
  module.exports = skillSearch;
  
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
  
  module.exports = mentorshipSkillSearch;*/
