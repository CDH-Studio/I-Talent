async function skillSearch(profiles, skillarray) {
  const skillProf = [];

  profiles.forEach((profile) => {
    if (!profile.skills && !profile.competencies) return;

    let data = [];

    if (profile.skills) {
      data = [...profile.skills];
    }

    if (profile.competencies) {
      data = [...data, ...profile.competencies];
    }

    const hasSkill = data.some((skill) => skillarray.includes(skill.id));

    if (hasSkill) {
      skillProf.push(profile);
    }
  });

  return skillProf;
}

module.exports = skillSearch;
