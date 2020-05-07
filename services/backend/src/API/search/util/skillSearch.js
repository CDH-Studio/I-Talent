const skillSearch = async (profiles, skillarray) => {
  const skillProf = [];
  profiles.forEach((profile) => {
    if (!profile.skills) return;

    const skillIds = profile.skills.map((skill) => skill.id);
    if (skillIds.some((id) => skillarray.includes(id))) skillProf.push(profile);
  });
  return skillProf;
};

module.exports = skillSearch;
