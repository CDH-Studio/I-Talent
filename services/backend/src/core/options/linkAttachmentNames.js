const { sortBy } = require("lodash");
const prisma = require("../../database");

async function getNames(request, response) {
  const { language, type } = request.query;

  const nameQuery = await prisma.opAttachmentLinkName.findMany({
    where: {
      type,
    },
    select: {
      id: true,
      translations: {
        where: {
          language,
        },
        select: {
          name: true,
        },
      },
    },
  });

  const name = sortBy(
    nameQuery.map((i) => {
      return {
        id: i.id,
        name: i.translations[0].name,
      };
    }),
    "name"
  );

  response.status(200).json(name);
}

module.exports = {
  getNames,
};
