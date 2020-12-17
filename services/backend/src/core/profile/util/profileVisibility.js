const prisma = require("../../../database");

/**
 * Returns true if the user making the request has access to the profile's
 * information
 *
 * @param {string} userId UUID of the requested profile
 * @param {string} keycloakId UUID of the user making the request
 * @param {string} visibleCardSection A key of the visibleCards
 */
async function hasVisibility(userId, keycloakId, visibleCardSection) {
  if (userId === keycloakId) {
    return true;
  }

  const user = await prisma.user.findOne({
    where: {
      id: userId,
    },
    select: {
      visibleCards: {
        select: {
          [visibleCardSection]: true,
        },
      },
      connections: {
        select: {
          id: true,
        },
      },
    },
  });

  const isConnection = user.connections.some((item) => item.id === keycloakId);

  return (
    user.visibleCards[visibleCardSection] === "CONNECTIONS" ||
    (user.visibleCards[visibleCardSection] === "PRIVATE" && isConnection)
  );
}

module.exports = {
  hasVisibility,
};
