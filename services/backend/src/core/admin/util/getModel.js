const Models = require("../../../database/models");

const CareerMobility = Models.careerMobility;
const Competency = Models.competency;
const Diploma = Models.diploma;
const GroupLevel = Models.groupLevel;
const KeyCompetency = Models.keyCompetency;
const Location = Models.location;
const School = Models.school;
const SecurityClearance = Models.securityClearance;
const Skill = Models.skill;
const Category = Models.category;
const TalentMatrixResult = Models.talentMatrixResult;
const Tenure = Models.tenure;

/*
 getCareerMobility,
  getCompetency,
  getDiploma,
  getDevelopmentalGoals,
  getGroupLevel,
  getKeyCompetency,
  getLocation,
  getSchool,
  getSecurityClearance,
  getSkill,
  getTalentMatrixResult,
  getTenure,
  optionRouter
*/
const mapping = {
	careerMobility: CareerMobility,
	competency: Competency,
	diploma: Diploma,
	groupLevel: GroupLevel,
	keyCompetency: KeyCompetency,
	location: Location,
	school: School,
	securityClearance: SecurityClearance,
	skill: Skill,
	category: Category,
	talentManager: TalentMatrixResult,
	tenure: Tenure,
};

function getModel(type) {
	return mapping[type];
}

module.exports = { getModel: getModel };
