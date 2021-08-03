const prisma = require("../../../database");

async function branchSearch(profiles, branchArray, language) {
  // find the name of the branches in the DB based on the array of selected employmentInfo ID from frontend and language
  const branchesFoundInDB = await Promise.all(
    branchArray.map(async (employmentInfoId) => {
      const branchNameFound = await prisma.employmentInfo.findUnique({
        where: {
          id: "employmentInfoId",
        },
        select: {
          translations: {
            where: {
              language,
            },
            select: {
              branch: true,
            },
          },
        },
      });
      return branchNameFound && branchNameFound.translations[0].branch;
    })
  );

  return profiles.filter(
    (profile) =>
      profile.branch && branchesFoundInDB.includes(profile.branch.name)
  );
}

module.exports = branchSearch;
