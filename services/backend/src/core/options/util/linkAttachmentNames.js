const { validationResult } = require("express-validator");
const { sortBy } = require("lodash");
const prisma = require("../../../database");

async function getNames(request, response) {
  try {
    validationResult(request).throw();
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
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching link attachment name options");
  }
}

module.exports = {
  getNames,
};
