const _ = require("lodash");
const { PrismaClient } = require("../../database/client");

const prisma = new PrismaClient();

async function getBranches(request, response) {
  try {
    const { language } = request.query;

    const branchesQuery = await prisma.transEploymentInfos.findMany({
      where: {
        language,
      },
      select: {
        id: true,
        branch: true,
      },
      orderBy: {
        branch: "asc",
      },
    });

    const branches = _.uniq(branchesQuery.map((i) => i.branch));

    response.status(200).json(branches);
  } catch (error) {
    response.status(500).json("Error fetching branch options");
  }
}

async function getCareerMobilities(request, response) {
  try {
    const { language } = request.query;

    const careerMobilitiesQuery = await prisma.opTransCareerMobilities.findMany(
      {
        where: {
          language,
        },
        select: {
          opCareerMobilitiesId: true,
          description: true,
        },
      }
    );

    const careerMobilities = careerMobilitiesQuery.map((i) => {
      return {
        id: i.opCareerMobilitiesId,
        description: i.description,
      };
    });

    response.status(200).json(careerMobilities);
  } catch (error) {
    response.status(500).json("Error fetching careerMobility options");
  }
}

async function getCompetencies(request, response) {
  try {
    const { language } = request.query;

    const competenciesQuery = await prisma.opTransCompetencies.findMany({
      where: {
        language,
      },
      select: {
        opCompetenciesId: true,
        name: true,
      },
    });

    const competencies = competenciesQuery.map((i) => {
      return {
        id: i.opCompetenciesId,
        name: i.name,
      };
    });

    response.status(200).json(competencies);
  } catch (error) {
    response.status(500).json("Error fetching competency options");
  }
}

async function getDevelopmentalGoals(request, response) {
  try {
    const { language } = request.query;

    const skillsQuery = await prisma.opTransCompetencies.findMany({
      where: {
        language,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const competenciesQuery = await prisma.opTransCompetencies.findMany({
      where: {
        language,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const competencies = competenciesQuery.map((i) => {
      return {
        id: i.opCompetenciesId,
        name: i.name,
      };
    });

    const skills = skillsQuery.map((i) => {
      return {
        id: i.opSkillsId,
        name: i.name,
      };
    });

    const developmentalGoals = [...competencies, ...skills];

    response.status(200).json(developmentalGoals);
  } catch (error) {
    response.status(500).json("Error fetching developmentalGoal options");
  }
}

async function getDiplomas(request, response) {
  try {
    const { language } = request.query;

    const diplomasQuery = await prisma.opTransDiplomas.findMany({
      where: {
        language,
      },
      select: {
        opDiplomasId: true,
        description: true,
      },
    });

    const diplomas = diplomasQuery.map((i) => {
      return {
        id: i.opDiplomasId,
        description: i.description,
      };
    });

    response.status(200).json(diplomas);
  } catch (error) {
    response.status(500).json("Error fetching diploma options");
  }
}

async function getClassifications(request, response) {
  try {
    const classificationsQuery = await prisma.opClassifications.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    response.status(200).json(classificationsQuery);
  } catch (error) {
    response.status(500).json("Error fetching classification options");
  }
}

async function getLocations(request, response) {
  try {
    const { language } = request.query;

    const locationsQuery = await prisma.opTransOfficeLocations.findMany({
      where: {
        language,
      },
      select: {
        streetName: true,
        province: true,
        opOfficeLocations: {
          select: {
            id: true,
            streetNumber: true,
            city: true,
          },
        },
      },
      orderBy: {
        province: "asc",
      },
    });

    const locations = locationsQuery.map((i) => {
      const { streetName, province } = i;
      const { id, city, streetNumber } = i.opOfficeLocations;

      return {
        id,
        streetNumber,
        streetName,
        city,
        province,
      };
    });

    response.status(200).json(locations);
  } catch (error) {
    response.status(500).json("Error fetching location options");
  }
}

async function getSchools(request, response) {
  try {
    const { language } = request.query;

    const schoolsQuery = await prisma.opTransSchools.findMany({
      where: {
        language,
      },
      select: {
        opSchoolsId: true,
        name: true,
      },
    });

    const schools = schoolsQuery.map((i) => {
      return {
        id: i.opSchoolsId,
        name: i.name,
      };
    });

    response.status(200).json(schools);
  } catch (error) {
    response.status(500).json("Error fetching school options");
  }
}

async function getSecurityClearances(request, response) {
  try {
    const { language } = request.query;

    const securityClearancesQuery = await prisma.opTransSecurityClearances.findMany(
      {
        where: {
          language,
        },
        select: {
          opSecurityClearancesId: true,
          description: true,
        },
      }
    );

    const securityClearances = securityClearancesQuery.map((i) => {
      return {
        id: i.opSecurityClearancesId,
        description: i.description,
      };
    });

    response.status(200).json(securityClearances);
  } catch (error) {
    response.status(500).json("Error fetching securityClearance options");
  }
}

async function getCategories(request, response) {
  try {
    const { language } = request.query;

    const categoriesQuery = await prisma.opTransCategories.findMany({
      where: {
        language,
        opCategories: {
          opSkills: {
            every: {
              translations: {
                every: {
                  language,
                },
              },
            },
          },
        },
      },
      select: {
        name: true,
        opCategories: {
          select: {
            id: true,
            opSkills: {
              select: {
                id: true,
                translations: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const categories = categoriesQuery.map((category) => {
      return {
        id: category.opCategories.id,
        name: category.name,
        skills: category.opCategories.opSkills.map((skill) => {
          return {
            id: skill.id,
            name: skill.translations[0].name,
          };
        }),
      };
    });

    response.status(200).json(categories);
  } catch (error) {
    response.status(500).json("Error fetching category options");
  }
}

async function getSkills(request, response) {
  try {
    const { language } = request.query;

    const skillsQuery = await prisma.opTransSkills.findMany({
      where: {
        language,
      },
      select: {
        opSkillsId: true,
        name: true,
      },
    });

    const skills = skillsQuery.map((i) => {
      return {
        id: i.opSkillsId,
        name: i.name,
      };
    });

    response.status(200).json(skills);
  } catch (error) {
    response.status(500).json("Error fetching skill options");
  }
}

async function getTalentMatrixResults(request, response) {
  try {
    const { language } = request.query;

    const talentMatrixResultsQuery = await prisma.opTransTalentMatrixResults.findMany(
      {
        where: {
          language,
        },
        select: {
          opTalentMatrixResultsId: true,
          description: true,
        },
      }
    );

    const talentMatrixResults = talentMatrixResultsQuery.map((i) => {
      return {
        id: i.opTalentMatrixResultsId,
        description: i.description,
      };
    });

    response.status(200).json(talentMatrixResults);
  } catch (error) {
    response.status(500).json("Error fetching talentMatrixResult options");
  }
}

async function getTenures(request, response) {
  try {
    const { language } = request.query;

    const tenuresQuery = await prisma.opTransTenures.findMany({
      where: {
        language,
      },
      select: {
        opTenuresId: true,
        name: true,
      },
    });

    const tenures = tenuresQuery.map((i) => {
      return {
        id: i.opTenuresId,
        name: i.name,
      };
    });

    response.status(200).json(tenures);
  } catch (error) {
    response.status(500).json("Error fetching tenure options");
  }
}

async function getLookingJobs(request, response) {
  try {
    const { language } = request.query;

    const lookingJobsQuery = await prisma.opTransLookingJobs.findMany({
      where: {
        language,
      },
      select: {
        opLookingJobsId: true,
        description: true,
      },
    });

    const lookingJobs = lookingJobsQuery.map((i) => {
      return {
        id: i.opLookingJobsId,
        description: i.description,
      };
    });

    response.status(200).json(lookingJobs);
  } catch (error) {
    response.status(500).json("Error fetching lookinJob options");
  }
}

module.exports = {
  getBranches,
  getCareerMobilities,
  getCompetencies,
  getDevelopmentalGoals,
  getDiplomas,
  getClassifications,
  getLocations,
  getSchools,
  getSecurityClearances,
  getCategories,
  getSkills,
  getTalentMatrixResults,
  getTenures,
  getLookingJobs,
};
