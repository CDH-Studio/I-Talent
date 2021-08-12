const { sortBy } = require("lodash");
const prisma = require("../../../database");

async function getNames(request, response) {
  const { language, type } = request.query;

  // const attachmentLinkNameQuery = await prisma.opAttachmentLinkName.findMany({
  //   where: {
  //     type,
  //   },
  //   select: {
  //     id: true,
  //     translations: {
  //       where: {
  //         language,
  //       },
  //       select: {
  //         name: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     translations.name: "asc",
  //   },
  // });

  // const attachmentLinkNameQuery = await prisma.opAttachmentLinkName.findMany({
  //   where: {
  //     type,
  //   },
  //   include: {
  //     translations: {
  //       where: {
  //         language,
  //       },
  //       select: {
  //         name: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     translations: {
  //       name: "asc",
  //     },
  //   },
  // });

  // const attachmentLinkNameQuery =
  //   await prisma.opTransAttachmentLinkName.findMany({
  //     where: {
  //       language,
  //     },
  //     select: {
  //       name: true,
  //       OpAttachmentLinkName: {
  //         where: {
  //           id: 1,
  //         },
  //         select: {
  //           id: true,
  //         },
  //       },
  //     },
  //     // orderBy: {
  //     //   translations: {
  //     //     name: "asc",
  //     //   },
  //     // },
  //   });

  // const attachmentLinkNameQuery = await prisma.opDiploma.findMany({
  //   where: {
  //     id: "f0eb9f18-812c-490e-8f53-1abbe6e471fe",
  //   },
  //   select: {
  //     translations: {
  //       where: {
  //         language,
  //       },
  //       select: {
  //         id: true,
  //       },
  //     },
  //   },
  // });

  const attachmentLinkNameQuery =
    await prisma.opTransAttachmentLinkName.findMany({
      where: {
        opAttachmentLinkName: {
          type,
        },
        language,
      },
      select: {
        name: true,
        opAttachmentLinkNameId: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  console.log(attachmentLinkNameQuery);
  const responseData = attachmentLinkNameQuery.map((attachmentLink) => ({
    value: attachmentLink.opAttachmentLinkNameId,
    label: attachmentLink.name,
  }));

  response.status(200).json(responseData);
}

module.exports = {
  getNames,
};
