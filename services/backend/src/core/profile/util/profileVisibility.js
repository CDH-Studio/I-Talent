const prisma = require("../../../database");

function isVisible(user, visibleCardSection, isConnection) {
  return (
    user.visibleCards[visibleCardSection] === "CONNECTIONS" ||
    (user.visibleCards[visibleCardSection] === "PRIVATE" && isConnection)
  );
}

/**
 * Same as `hasVisibility()` but for multiple visibility but returns an array
 * of visibility booleans
 *
 * @param {string} userId
 * @param {string} keycloakId
 * @param {string[]} visibleCardSections
 */
async function hasMultipleVisibility(userId, keycloakId, visibleCardSections) {
  if (userId === keycloakId) {
    return visibleCardSections.map(() => true);
  }

  const user = await prisma.user.findOne({
    where: {
      id: userId,
    },
    select: {
      visibleCards: {
        select: visibleCardSections.reduce((acc, i) => {
          acc[i] = true;
          return acc;
        }, {}),
      },
      connections: {
        select: {
          id: true,
        },
      },
    },
  });

  const isConnection = user.connections.some((item) => item.id === keycloakId);

  return visibleCardSections.map((i) => isVisible(user, i, isConnection));
}

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

  return isVisible(user, visibleCardSection, isConnection);
}

module.exports = {
  hasVisibility,
  hasMultipleVisibility,
};
