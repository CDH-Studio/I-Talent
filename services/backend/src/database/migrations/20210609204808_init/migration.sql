-- CreateEnum
CREATE TYPE "SecondLangStatus" AS ENUM ('EXPIRED', 'VALID', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('FRENCH', 'ENGLISH');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'HIDDEN');

-- CreateEnum
CREATE TYPE "Proficiency" AS ENUM ('READING', 'WRITING', 'ORAL');

-- CreateEnum
CREATE TYPE "ProficiencyLevel" AS ENUM ('A', 'B', 'C', 'E', 'X', 'NA');

-- CreateEnum
CREATE TYPE "CardVisibilityStatus" AS ENUM ('PRIVATE', 'PUBLIC', 'CONNECTIONS');

-- CreateEnum
CREATE TYPE "EmploymentEquityGroup" AS ENUM ('WOMEN', 'INDIGENOUS', 'DISABILITY', 'MINORITY');

-- CreateEnum
CREATE TYPE "BugsStatus" AS ENUM ('DUPLICATE', 'UNRESOLVED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "BugsLocation" AS ENUM ('HOME', 'PROFILE', 'SEARCH', 'FORMS');

-- CreateTable
CREATE TABLE "DbSeed" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransSecurityClearance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT NOT NULL,
    "opSecurityClearanceId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpSecurityClearance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransLookingJob" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT NOT NULL,
    "opLookingJobId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpLookingJob" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransTenure" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "opTenureId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTenure" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransCareerMobility" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT NOT NULL,
    "opCareerMobilityId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpCareerMobility" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransTalentMatrixResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT NOT NULL,
    "opTalentMatrixResultId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTalentMatrixResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransOfficeLocation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "streetName" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "opOfficeLocationId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpOfficeLocation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postalCode" TEXT NOT NULL,
    "streetNumber" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpClassification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransSkill" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "opSkillId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpSkill" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "opCategoryId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransCompetency" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "opCompetencyId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpCompetency" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competency" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "competencyId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransSchool" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "opSchoolId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpSchool" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "abbrProvince" TEXT NOT NULL,
    "abbrCountry" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransDiploma" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT NOT NULL,
    "opDiplomaId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpDiploma" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransRelocationLocation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "opRelocationLocationId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpRelocationLocation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransEmploymentInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "jobTitle" TEXT,
    "branch" TEXT,
    "employmentInfoId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisibleCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "info" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "talentManagement" "CardVisibilityStatus" NOT NULL DEFAULT E'PRIVATE',
    "officialLanguage" "CardVisibilityStatus" NOT NULL DEFAULT E'PRIVATE',
    "skills" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "competencies" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "developmentalGoals" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "qualifiedPools" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "description" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "education" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "experience" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "careerInterests" "CardVisibilityStatus" NOT NULL DEFAULT E'PRIVATE',
    "mentorshipSkills" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "exFeeder" "CardVisibilityStatus" NOT NULL DEFAULT E'PUBLIC',
    "employmentEquityGroup" "CardVisibilityStatus" NOT NULL DEFAULT E'PRIVATE',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorshipSkill" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevelopmentalGoal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" TEXT,
    "competencyId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualifiedPool" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "classificationId" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "selectionProcessNumber" TEXT,
    "jobPosterLink" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecondLangProf" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "SecondLangStatus" DEFAULT E'UNKNOWN',
    "proficiency" "Proficiency" NOT NULL,
    "level" "ProficiencyLevel" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationTier" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tier" INTEGER NOT NULL,
    "organizationId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransOrganization" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT NOT NULL,
    "organizationTierId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "schoolId" TEXT,
    "diplomaId" TEXT,
    "endDate" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "ongoingDate" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransExperience" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT,
    "jobTitle" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "experienceId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "ongoingDate" BOOLEAN NOT NULL DEFAULT false,
    "projects" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelocationLocation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "relocationLocationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpTransAttachmentLinkName" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "opAttachmentLinkNameId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpAttachmentLinkName" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransAttachmentLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" "Language" NOT NULL,
    "nameId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "attachmentLinkId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttachmentLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "experienceId" TEXT,
    "educationId" TEXT,
    "userId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bug" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "BugsStatus" NOT NULL DEFAULT E'UNRESOLVED',
    "location" "BugsLocation" NOT NULL,
    "appVersion" TEXT,
    "githubIssue" INTEGER,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupLevelId" TEXT,
    "actingLevelId" TEXT,
    "securityClearanceId" TEXT,
    "lookingJobId" TEXT,
    "tenureId" TEXT,
    "careerMobilityId" TEXT,
    "employmentInfoId" TEXT,
    "talentMatrixResultId" TEXT,
    "officeLocationId" TEXT,
    "visibleCardId" TEXT NOT NULL,
    "name" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatarColor" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "cellphone" TEXT,
    "pri" TEXT,
    "manager" TEXT,
    "description" TEXT,
    "firstLanguage" "Language",
    "secondLanguage" "Language",
    "preferredLanguage" "Language" NOT NULL DEFAULT E'ENGLISH',
    "linkedin" TEXT,
    "github" TEXT,
    "gcconnex" TEXT,
    "exFeeder" BOOLEAN NOT NULL DEFAULT false,
    "interestedInRemote" BOOLEAN,
    "status" "UserStatus" NOT NULL DEFAULT E'ACTIVE',
    "signupStep" INTEGER NOT NULL DEFAULT 1,
    "teams" TEXT[],
    "employmentEquityGroups" "EmploymentEquityGroup"[],
    "userId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpTransSecurityClearance.language_description_unique" ON "OpTransSecurityClearance"("language", "description");

-- CreateIndex
CREATE UNIQUE INDEX "OpTransLookingJob.language_description_unique" ON "OpTransLookingJob"("language", "description");

-- CreateIndex
CREATE UNIQUE INDEX "OpTransTenure.language_name_unique" ON "OpTransTenure"("language", "name");

-- CreateIndex
CREATE UNIQUE INDEX "OpTransCareerMobility.language_description_unique" ON "OpTransCareerMobility"("language", "description");

-- CreateIndex
CREATE UNIQUE INDEX "OpTransTalentMatrixResult.language_description_unique" ON "OpTransTalentMatrixResult"("language", "description");

-- CreateIndex
CREATE UNIQUE INDEX "OpClassification.name_unique" ON "OpClassification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OpTransSkill.language_name_unique" ON "OpTransSkill"("language", "name");

-- CreateIndex
CREATE UNIQUE INDEX "OpTransCategory.language_name_unique" ON "OpTransCategory"("language", "name");

-- CreateIndex
CREATE UNIQUE INDEX "OpTransCompetency.language_name_unique" ON "OpTransCompetency"("language", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Competency.userId_competencyId_unique" ON "Competency"("userId", "competencyId");

-- CreateIndex
CREATE UNIQUE INDEX "OpTransRelocationLocation.language_city_province_unique" ON "OpTransRelocationLocation"("language", "city", "province");

-- CreateIndex
CREATE UNIQUE INDEX "MentorshipSkill.userId_skillId_unique" ON "MentorshipSkill"("userId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill.userId_skillId_unique" ON "Skill"("userId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "DevelopmentalGoal.userId_skillId_unique" ON "DevelopmentalGoal"("userId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "DevelopmentalGoal.userId_competencyId_unique" ON "DevelopmentalGoal"("userId", "competencyId");

-- CreateIndex
CREATE UNIQUE INDEX "SecondLangProf.userId_proficiency_unique" ON "SecondLangProf"("userId", "proficiency");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_userId_unique" ON "Organization"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Education.userId_schoolId_diplomaId_startDate_unique" ON "Education"("userId", "schoolId", "diplomaId", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "RelocationLocation.userId_relocationLocationId_unique" ON "RelocationLocation"("userId", "relocationLocationId");

-- AddForeignKey
ALTER TABLE "OpTransSecurityClearance" ADD FOREIGN KEY ("opSecurityClearanceId") REFERENCES "OpSecurityClearance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransLookingJob" ADD FOREIGN KEY ("opLookingJobId") REFERENCES "OpLookingJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransTenure" ADD FOREIGN KEY ("opTenureId") REFERENCES "OpTenure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransCareerMobility" ADD FOREIGN KEY ("opCareerMobilityId") REFERENCES "OpCareerMobility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransTalentMatrixResult" ADD FOREIGN KEY ("opTalentMatrixResultId") REFERENCES "OpTalentMatrixResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransOfficeLocation" ADD FOREIGN KEY ("opOfficeLocationId") REFERENCES "OpOfficeLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransSkill" ADD FOREIGN KEY ("opSkillId") REFERENCES "OpSkill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpSkill" ADD FOREIGN KEY ("categoryId") REFERENCES "OpCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransCategory" ADD FOREIGN KEY ("opCategoryId") REFERENCES "OpCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransCompetency" ADD FOREIGN KEY ("opCompetencyId") REFERENCES "OpCompetency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competency" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competency" ADD FOREIGN KEY ("competencyId") REFERENCES "OpCompetency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransSchool" ADD FOREIGN KEY ("opSchoolId") REFERENCES "OpSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransDiploma" ADD FOREIGN KEY ("opDiplomaId") REFERENCES "OpDiploma"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransRelocationLocation" ADD FOREIGN KEY ("opRelocationLocationId") REFERENCES "OpRelocationLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransEmploymentInfo" ADD FOREIGN KEY ("employmentInfoId") REFERENCES "EmploymentInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipSkill" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipSkill" ADD FOREIGN KEY ("skillId") REFERENCES "OpSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD FOREIGN KEY ("skillId") REFERENCES "OpSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevelopmentalGoal" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevelopmentalGoal" ADD FOREIGN KEY ("skillId") REFERENCES "OpSkill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevelopmentalGoal" ADD FOREIGN KEY ("competencyId") REFERENCES "OpCompetency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualifiedPool" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualifiedPool" ADD FOREIGN KEY ("classificationId") REFERENCES "OpClassification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondLangProf" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTier" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransOrganization" ADD FOREIGN KEY ("organizationTierId") REFERENCES "OrganizationTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD FOREIGN KEY ("schoolId") REFERENCES "OpSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD FOREIGN KEY ("diplomaId") REFERENCES "OpDiploma"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransExperience" ADD FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelocationLocation" ADD FOREIGN KEY ("relocationLocationId") REFERENCES "OpRelocationLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelocationLocation" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpTransAttachmentLinkName" ADD FOREIGN KEY ("opAttachmentLinkNameId") REFERENCES "OpAttachmentLinkName"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransAttachmentLink" ADD FOREIGN KEY ("nameId") REFERENCES "OpAttachmentLinkName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransAttachmentLink" ADD FOREIGN KEY ("attachmentLinkId") REFERENCES "AttachmentLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttachmentLink" ADD FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttachmentLink" ADD FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttachmentLink" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("groupLevelId") REFERENCES "OpClassification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("actingLevelId") REFERENCES "OpClassification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("securityClearanceId") REFERENCES "OpSecurityClearance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("lookingJobId") REFERENCES "OpLookingJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("tenureId") REFERENCES "OpTenure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("careerMobilityId") REFERENCES "OpCareerMobility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("employmentInfoId") REFERENCES "EmploymentInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("talentMatrixResultId") REFERENCES "OpTalentMatrixResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("officeLocationId") REFERENCES "OpOfficeLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("visibleCardId") REFERENCES "VisibleCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
