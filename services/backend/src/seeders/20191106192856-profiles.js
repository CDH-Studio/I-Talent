module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "profiles",
      [
        {
          id: "faba08aa-ffe3-11e9-8d71-362b9e155667",
          firstName: "Mary",
          lastName: "Doe",
          jobTitleEn: "Manager",
          jobTitleFr: "Gestionaire",
          telephone: "343-123-4567",
          cellphone: "613-123-4567",
          // locationId: "5888300c-0245-11ea-8d71-362b9e155667",
          manager: "Chahine El Chaar",
          team: "CDH Studio",
          firstLanguage: "Français",
          secondLanguage: "English",
          linkedin: "linkedinUrl",
          github: "githubUrl",
          createdAt: new Date(),
          updatedAt: new Date(),
          interestedInRemote: true,
          indeterminate: true,
          // tenureId: "725c6d40-ddc3-4a55-bdf5-f85155091acd",
          // groupLevelId: "a3975faa-ff43-11e9-8f0b-362b9e155667",
          // securityClearanceId: "882ef330-ff44-11e9-8f0b-362b9e155667",
          // careerMobilityId: "ed78c3ba-ff44-11e9-8f0b-362b9e155667",
          // talentMatrixResultId: "e4f5d678-ff45-11e9-8f0b-362b9e155667",
          // keyCompetencyId: "ff60e5f6-ff46-11e9-8f0b-362b9e155667",
          // secondLanguageProficiencyId: "a34e38b4-ffdb-11e9-8d71-362b9e155667"
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("profiles", null, {});
  },
};
