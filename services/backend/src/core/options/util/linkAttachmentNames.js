const prisma = require("../../../database");

async function getNames(request, response) {
  const { language, type } = request.query;

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

  const responseData = attachmentLinkNameQuery.map((attachmentLink) => ({
    label: attachmentLink.name,
    value: attachmentLink.opAttachmentLinkNameId,
  }));

  response.status(200).json(responseData);
}

module.exports = {
  getNames,
};
