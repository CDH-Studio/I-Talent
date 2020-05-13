module.exports = {
	up: (queryInterface) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */
		return queryInterface.bulkInsert(
			"groupLevels",
			[
				{
					description: "AS 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AS 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AS 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AS 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AS 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AS 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AS 07",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AU 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AU 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "AU 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CO 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CO 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CO 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CO 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CR 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CR 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CR 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CR 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CS 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CS 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CS 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CS 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "CS 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EC 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EC 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EC 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EC 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EC 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EC 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EC 07",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EC 08",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EG 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EG 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EG 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EL 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EL 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EL 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EL 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EL 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EL 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EL 07",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "EL 08",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "ENENG02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "ENENG03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "ENENG04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "ENENG05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "ENENG06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "FI 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "FI 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "FI 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "FI 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLCOI13",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLEIM10",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLEIM12",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLMAM08",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLMAM10",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLMAN06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLMDO06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLPIP09",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLPIP12",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GLWOW11",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GSMPS06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GSSTS04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GSSTS05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GSSTS06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GT 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GT 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GT 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "GT 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "HP 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "IS 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "IS 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "IS 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "IS 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "IS 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "LS 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "LS 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "LS 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "LS 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PC 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PC 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PE 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PE 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PE 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PE 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PE 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PE 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PG 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PG 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PG 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PG 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PG 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PG 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PM 01",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PM 02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PM 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PM 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PM 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "PM 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SEREM02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SERES02",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SERES03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SERES04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SERES05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SGPAT03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SGPAT04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SGPAT05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SGPAT06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SGPAT07",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "SGPAT08",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "TI 03",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "TI 04",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "TI 05",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "TI 06",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "TI 07",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					description: "TI 08",
					createdAt: new Date(),
					updatedAt: new Date(),
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
		return queryInterface.bulkDelete("groupLevels", null, {});
	},
};
