async function mentorshipSkillSearch(profiles, skillarray) {
  const skillProf = [];
  profiles.forEach(profile => {
    console.log("PROFIL:E", profile);
    if (!profile.mentorshipSkills) return;
    console.log("^FOUND THING");
    const skillIds = profile.mentorshipSkills.map(skill => skill.id);
    if (skillIds.some(id => skillarray.includes(id))) skillProf.push(profile);
  });
  return skillProf;
}

module.exports = mentorshipSkillSearch;
