const prisma = require("../../database");

async function setTalentMatrixResult(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      talentMatrixResult: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeTalentMatrixResult(request, response) {
  const { userId } = request.params;

  const { talentMatrixResult } = await prisma.user.findOne({
    where: { id: userId },
    select: { securityClearance: { select: { id: true } } },
  });

  if (talentMatrixResult) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        talentMatrixResult: {
          disconnect: true,
        },
      },
    });
  }

  response.sendStatus(204);
}

module.exports = {
  setTalentMatrixResult,
  removeTalentMatrixResult,
};
