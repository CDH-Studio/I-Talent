const prisma = require("../../../database");

async function getSkillNames(searchSkill, language) {
  const skillNames = await Promise.all(
    searchSkill.map(async (id) => {
      const findSkills = await prisma.opTransSkill.findMany({
        where: {
          opSkillId: id,
          language,
        },
        select: {
          name: true,
        },
      });

      if (findSkills[0]) {
        return findSkills[0].name;
      }

      const findCompetencies = await prisma.opTransCompetency.findMany({
        where: {
          opCompetencyId: id,
          language,
        },
        select: {
          name: true,
        },
      });

      if (findCompetencies[0]) {
        return findCompetencies[0].name;
      }

      return "";
    })
  );

  return skillNames.join(" ");
}

module.exports = getSkillNames;
