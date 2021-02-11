# Migration `20201019154547-init`

This migration has been generated at 10/19/2020, 11:45:47 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Language" AS ENUM ('FRENCH', 'ENGLISH')

CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'HIDDEN')

CREATE TYPE "public"."Proficiency" AS ENUM ('READING', 'WRITING', 'ORAL')

CREATE TYPE "public"."ProficiencyLevel" AS ENUM ('A', 'B', 'C', 'E', 'X', 'NA')

CREATE TYPE "public"."CardVisibilityStatus" AS ENUM ('PRIVATE', 'PUBLIC', 'CONNECTIONS')

CREATE TYPE "public"."EmploymentEquityGroup" AS ENUM ('WOMEN', 'INDIGENOUS', 'DISABILITY', 'MINORITY')

CREATE TABLE "public"."DbSeed" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransSecurityClearance" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opSecurityClearanceId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpSecurityClearance" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransLookingJob" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opLookingJobId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpLookingJob" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransTenure" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opTenureId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTenure" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransCareerMobility" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opCareerMobilityId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpCareerMobility" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransTalentMatrixResult" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opTalentMatrixResultId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTalentMatrixResult" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransOfficeLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"streetName" text   NOT NULL ,
"province" text   NOT NULL ,
"opOfficeLocationId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpOfficeLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"postalCode" text   NOT NULL ,
"streetNumber" integer   NOT NULL ,
"city" text   NOT NULL ,
"country" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpClassification" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransSkill" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opSkillId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpSkill" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"categoryId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransCategory" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opCategoryId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpCategory" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransCompetency" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opCompetencyId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpCompetency" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Competency" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"competencyId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransSchool" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opSchoolId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpSchool" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"abbrProvince" text   NOT NULL ,
"abbrCountry" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransDiploma" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opDiplomaId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpDiploma" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransRelocationLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" text   NOT NULL ,
"city" text   NOT NULL ,
"province" text   NOT NULL ,
"opRelocationLocationId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpRelocationLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TransEmploymentInfo" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"jobTitle" text   ,
"branch" text   ,
"employmentInfoId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."EmploymentInfo" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."VisibleCard" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"info" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"talentManagement" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"officialLanguage" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"skills" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"competencies" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"developmentalGoals" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"description" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"education" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"experience" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"careerInterests" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"mentorshipSkills" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"exFeeder" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"employmentEquityGroup" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
PRIMARY KEY ("id")
)

CREATE TABLE "public"."MentorshipSkill" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"skillId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Skill" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"skillId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."DevelopmentalGoal" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"skillId" text   ,
"competencyId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."SecondLangProf" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"date" timestamp(3)   ,
"unknownExpiredDate" boolean   DEFAULT false,
"proficiency" "Proficiency"  NOT NULL ,
"level" "ProficiencyLevel"  NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Organization" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OrganizationTier" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"tier" integer   NOT NULL ,
"organizationId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TransOrganization" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"organizationTierId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Education" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"schoolId" text   ,
"diplomaId" text   ,
"endDate" timestamp(3)   ,
"startDate" timestamp(3)   ,
"ongoingDate" boolean   NOT NULL DEFAULT false,
"description" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TransExperience" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   ,
"jobTitle" text   NOT NULL ,
"organization" text   NOT NULL ,
"experienceId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Experience" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"startDate" timestamp(3)   NOT NULL ,
"endDate" timestamp(3)   ,
"ongoingDate" boolean   NOT NULL DEFAULT false,
"projects" text []  ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."RelocationLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"relocationLocationId" text   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransAttachmentLinkName" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opAttachmentLinkNameId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpAttachmentLinkName" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"type" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TransAttachmentLink" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"nameId" text   NOT NULL ,
"url" text   NOT NULL ,
"attachmentLinkId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."AttachmentLink" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"experienceId" text   ,
"educationId" text   ,
"userId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"groupLevelId" text   ,
"actingLevelId" text   ,
"securityClearanceId" text   ,
"lookingJobId" text   ,
"tenureId" text   ,
"careerMobilityId" text   ,
"employmentInfoId" text   ,
"talentMatrixResultId" text   ,
"officeLocationId" text   ,
"visibleCardId" text   NOT NULL ,
"name" text   ,
"firstName" text   ,
"lastName" text   ,
"avatarColor" text   ,
"email" text   ,
"telephone" text   ,
"cellphone" text   ,
"manager" text   ,
"description" text   ,
"firstLanguage" "Language"  ,
"secondLanguage" "Language"  ,
"preferredLanguage" "Language"  NOT NULL DEFAULT E'ENGLISH',
"actingStartDate" timestamp(3)   ,
"actingEndDate" timestamp(3)   ,
"linkedin" text   ,
"github" text   ,
"gcconnex" text   ,
"exFeeder" boolean   NOT NULL DEFAULT false,
"interestedInRemote" boolean   ,
"status" "UserStatus"  NOT NULL DEFAULT E'ACTIVE',
"signupStep" integer   NOT NULL DEFAULT 1,
"teams" text []  ,
"employmentEquityGroups" "EmploymentEquityGroup"[]  ,
"userId" text   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "OpTransSecurityClearance.language_description_unique" ON "public"."OpTransSecurityClearance"("language", "description")

CREATE UNIQUE INDEX "OpTransLookingJob.language_description_unique" ON "public"."OpTransLookingJob"("language", "description")

CREATE UNIQUE INDEX "OpTransTenure.language_name_unique" ON "public"."OpTransTenure"("language", "name")

CREATE UNIQUE INDEX "OpTransCareerMobility.language_description_unique" ON "public"."OpTransCareerMobility"("language", "description")

CREATE UNIQUE INDEX "OpTransTalentMatrixResult.language_description_unique" ON "public"."OpTransTalentMatrixResult"("language", "description")

CREATE UNIQUE INDEX "OpClassification.name_unique" ON "public"."OpClassification"("name")

CREATE UNIQUE INDEX "OpTransSkill.language_name_unique" ON "public"."OpTransSkill"("language", "name")

CREATE UNIQUE INDEX "OpTransCategory.language_name_unique" ON "public"."OpTransCategory"("language", "name")

CREATE UNIQUE INDEX "OpTransCompetency.language_name_unique" ON "public"."OpTransCompetency"("language", "name")

CREATE UNIQUE INDEX "Competency.userId_competencyId_unique" ON "public"."Competency"("userId", "competencyId")

CREATE UNIQUE INDEX "OpTransRelocationLocation.language_city_province_unique" ON "public"."OpTransRelocationLocation"("language", "city", "province")

CREATE UNIQUE INDEX "MentorshipSkill.userId_skillId_unique" ON "public"."MentorshipSkill"("userId", "skillId")

CREATE UNIQUE INDEX "Skill.userId_skillId_unique" ON "public"."Skill"("userId", "skillId")

CREATE UNIQUE INDEX "DevelopmentalGoal.userId_skillId_unique" ON "public"."DevelopmentalGoal"("userId", "skillId")

CREATE UNIQUE INDEX "DevelopmentalGoal.userId_competencyId_unique" ON "public"."DevelopmentalGoal"("userId", "competencyId")

CREATE UNIQUE INDEX "SecondLangProf.userId_proficiency_unique" ON "public"."SecondLangProf"("userId", "proficiency")

CREATE UNIQUE INDEX "Education.userId_schoolId_diplomaId_startDate_unique" ON "public"."Education"("userId", "schoolId", "diplomaId", "startDate")

CREATE UNIQUE INDEX "RelocationLocation.userId_relocationLocationId_unique" ON "public"."RelocationLocation"("userId", "relocationLocationId")

ALTER TABLE "public"."OpTransSecurityClearance" ADD FOREIGN KEY ("opSecurityClearanceId")REFERENCES "public"."OpSecurityClearance"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransLookingJob" ADD FOREIGN KEY ("opLookingJobId")REFERENCES "public"."OpLookingJob"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransTenure" ADD FOREIGN KEY ("opTenureId")REFERENCES "public"."OpTenure"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCareerMobility" ADD FOREIGN KEY ("opCareerMobilityId")REFERENCES "public"."OpCareerMobility"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransTalentMatrixResult" ADD FOREIGN KEY ("opTalentMatrixResultId")REFERENCES "public"."OpTalentMatrixResult"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransOfficeLocation" ADD FOREIGN KEY ("opOfficeLocationId")REFERENCES "public"."OpOfficeLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransSkill" ADD FOREIGN KEY ("opSkillId")REFERENCES "public"."OpSkill"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpSkill" ADD FOREIGN KEY ("categoryId")REFERENCES "public"."OpCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCategory" ADD FOREIGN KEY ("opCategoryId")REFERENCES "public"."OpCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCompetency" ADD FOREIGN KEY ("opCompetencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Competency" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Competency" ADD FOREIGN KEY ("competencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."OpTransSchool" ADD FOREIGN KEY ("opSchoolId")REFERENCES "public"."OpSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransDiploma" ADD FOREIGN KEY ("opDiplomaId")REFERENCES "public"."OpDiploma"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransRelocationLocation" ADD FOREIGN KEY ("opRelocationLocationId")REFERENCES "public"."OpRelocationLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransEmploymentInfo" ADD FOREIGN KEY ("employmentInfoId")REFERENCES "public"."EmploymentInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."MentorshipSkill" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."MentorshipSkill" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Skill" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Skill" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("competencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."SecondLangProf" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Organization" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."OrganizationTier" ADD FOREIGN KEY ("organizationId")REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransOrganization" ADD FOREIGN KEY ("organizationTierId")REFERENCES "public"."OrganizationTier"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("schoolId")REFERENCES "public"."OpSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("diplomaId")REFERENCES "public"."OpDiploma"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransExperience" ADD FOREIGN KEY ("experienceId")REFERENCES "public"."Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Experience" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."RelocationLocation" ADD FOREIGN KEY ("relocationLocationId")REFERENCES "public"."OpRelocationLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."RelocationLocation" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."OpTransAttachmentLinkName" ADD FOREIGN KEY ("opAttachmentLinkNameId")REFERENCES "public"."OpAttachmentLinkName"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransAttachmentLink" ADD FOREIGN KEY ("nameId")REFERENCES "public"."OpAttachmentLinkName"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."TransAttachmentLink" ADD FOREIGN KEY ("attachmentLinkId")REFERENCES "public"."AttachmentLink"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."AttachmentLink" ADD FOREIGN KEY ("experienceId")REFERENCES "public"."Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."AttachmentLink" ADD FOREIGN KEY ("educationId")REFERENCES "public"."Education"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."AttachmentLink" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("groupLevelId")REFERENCES "public"."OpClassification"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("actingLevelId")REFERENCES "public"."OpClassification"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("securityClearanceId")REFERENCES "public"."OpSecurityClearance"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("lookingJobId")REFERENCES "public"."OpLookingJob"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("tenureId")REFERENCES "public"."OpTenure"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("careerMobilityId")REFERENCES "public"."OpCareerMobility"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("employmentInfoId")REFERENCES "public"."EmploymentInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("talentMatrixResultId")REFERENCES "public"."OpTalentMatrixResult"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("officeLocationId")REFERENCES "public"."OpOfficeLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("visibleCardId")REFERENCES "public"."VisibleCard"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201019154547-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,609 @@
+generator client {
+  provider = "prisma-client-js"
+  output   = "./client"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model DbSeed {
+  id        String   @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
+
+enum Language {
+  FRENCH
+  ENGLISH
+}
+
+enum UserStatus {
+  ACTIVE
+  INACTIVE
+  HIDDEN
+}
+
+enum Proficiency {
+  READING
+  WRITING
+  ORAL
+}
+
+enum ProficiencyLevel {
+  A
+  B
+  C
+  E
+  X
+  NA
+}
+
+enum CardVisibilityStatus {
+  PRIVATE
+  PUBLIC
+  CONNECTIONS
+}
+
+enum EmploymentEquityGroup {
+  WOMEN
+  INDIGENOUS
+  DISABILITY
+  MINORITY
+}
+
+model OpTransSecurityClearance {
+  id          String   @default(uuid()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  language    Language
+  description String
+
+  @@unique([language, description])
+  opSecurityClearance   OpSecurityClearance? @relation(fields: [opSecurityClearanceId])
+  opSecurityClearanceId String?
+}
+
+model OpSecurityClearance {
+  id           String                     @default(uuid()) @id
+  createdAt    DateTime                   @default(now())
+  updatedAt    DateTime                   @updatedAt
+  translations OpTransSecurityClearance[]
+  users        User[]
+}
+
+model OpTransLookingJob {
+  id          String   @default(uuid()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  language    Language
+  description String
+
+  @@unique([language, description])
+  opLookingJob   OpLookingJob? @relation(fields: [opLookingJobId])
+  opLookingJobId String?
+}
+
+model OpLookingJob {
+  id           String              @default(uuid()) @id
+  createdAt    DateTime            @default(now())
+  updatedAt    DateTime            @updatedAt
+  translations OpTransLookingJob[]
+  users        User[]
+}
+
+model OpTransTenure {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  Language
+  name      String
+
+  @@unique([language, name])
+  opTenures  OpTenure? @relation(fields: [opTenureId])
+  opTenureId String?
+}
+
+model OpTenure {
+  id           String          @default(uuid()) @id
+  createdAt    DateTime        @default(now())
+  updatedAt    DateTime        @updatedAt
+  translations OpTransTenure[]
+  users        User[]
+}
+
+model OpTransCareerMobility {
+  id          String   @default(uuid()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  language    Language
+  description String
+
+  @@unique([language, description])
+  opCareerMobility   OpCareerMobility? @relation(fields: [opCareerMobilityId])
+  opCareerMobilityId String?
+}
+
+model OpCareerMobility {
+  id           String                  @default(uuid()) @id
+  createdAt    DateTime                @default(now())
+  updatedAt    DateTime                @updatedAt
+  translations OpTransCareerMobility[]
+  users        User[]
+}
+
+model OpTransTalentMatrixResult {
+  id          String   @default(uuid()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  language    Language
+  description String
+
+  @@unique([language, description])
+  opTalentMatrixResult   OpTalentMatrixResult? @relation(fields: [opTalentMatrixResultId])
+  opTalentMatrixResultId String?
+}
+
+model OpTalentMatrixResult {
+  id           String                      @default(uuid()) @id
+  createdAt    DateTime                    @default(now())
+  updatedAt    DateTime                    @updatedAt
+  translations OpTransTalentMatrixResult[]
+  users        User[]
+}
+
+model OpTransOfficeLocation {
+  id                 String            @default(uuid()) @id
+  createdAt          DateTime          @default(now())
+  updatedAt          DateTime          @updatedAt
+  language           Language
+  streetName         String
+  province           String
+  opOfficeLocation   OpOfficeLocation? @relation(fields: [opOfficeLocationId])
+  opOfficeLocationId String?
+}
+
+model OpOfficeLocation {
+  id           String                  @default(uuid()) @id
+  createdAt    DateTime                @default(now())
+  updatedAt    DateTime                @updatedAt
+  postalCode   String
+  streetNumber Int
+  city         String
+  country      String
+  translations OpTransOfficeLocation[]
+  users        User[]
+}
+
+model OpClassification {
+  id               String   @default(uuid()) @id
+  createdAt        DateTime @default(now())
+  updatedAt        DateTime @updatedAt
+  name             String   @unique
+  actingLevelUsers User[]   @relation("actingLevels")
+  groupLevelUsers  User[]   @relation("groupLevels")
+}
+
+model OpTransSkill {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  Language
+  name      String
+
+  @@unique([language, name])
+  opSkill   OpSkill? @relation(fields: [opSkillId])
+  opSkillId String?
+}
+
+model OpSkill {
+  id                 String              @default(uuid()) @id
+  createdAt          DateTime            @default(now())
+  updatedAt          DateTime            @updatedAt
+  categoryId         String?
+  translations       OpTransSkill[]
+  category           OpCategory?         @relation(fields: [categoryId])
+  mentorshipSkills   MentorshipSkill[]
+  skills             Skill[]
+  developmentalGoals DevelopmentalGoal[]
+}
+
+model OpTransCategory {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  Language
+  name      String
+
+  @@unique([language, name])
+  opCategory   OpCategory? @relation(fields: [opCategoryId])
+  opCategoryId String?
+}
+
+model OpCategory {
+  id           String            @default(uuid()) @id
+  createdAt    DateTime          @default(now())
+  updatedAt    DateTime          @updatedAt
+  translations OpTransCategory[]
+  opSkills     OpSkill[]
+}
+
+model OpTransCompetency {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  Language
+  name      String
+
+  @@unique([language, name])
+  opCompetency   OpCompetency? @relation(fields: [opCompetencyId])
+  opCompetencyId String?
+}
+
+model OpCompetency {
+  id                 String              @default(uuid()) @id
+  createdAt          DateTime            @default(now())
+  updatedAt          DateTime            @updatedAt
+  translations       OpTransCompetency[]
+  developmentalGoals DevelopmentalGoal[]
+  competencies       Competency[]
+}
+
+model Competency {
+  id           String       @default(uuid()) @id
+  createdAt    DateTime     @default(now())
+  updatedAt    DateTime     @updatedAt
+  userId       String
+  competencyId String
+  user         User         @relation(fields: [userId])
+  competency   OpCompetency @relation(fields: [competencyId])
+
+  @@unique([userId, competencyId])
+}
+
+model OpTransSchool {
+  id         String    @default(uuid()) @id
+  createdAt  DateTime  @default(now())
+  updatedAt  DateTime  @updatedAt
+  language   Language
+  name       String
+  opSchool   OpSchool? @relation(fields: [opSchoolId])
+  opSchoolId String?
+}
+
+model OpSchool {
+  id           String          @default(uuid()) @id
+  createdAt    DateTime        @default(now())
+  updatedAt    DateTime        @updatedAt
+  abbrProvince String
+  abbrCountry  String
+  translations OpTransSchool[]
+  educations   Education[]
+}
+
+model OpTransDiploma {
+  id          String     @default(uuid()) @id
+  createdAt   DateTime   @default(now())
+  updatedAt   DateTime   @updatedAt
+  language    Language
+  description String
+  opDiploma   OpDiploma? @relation(fields: [opDiplomaId])
+  opDiplomaId String?
+}
+
+model OpDiploma {
+  id           String           @default(uuid()) @id
+  createdAt    DateTime         @default(now())
+  updatedAt    DateTime         @updatedAt
+  translations OpTransDiploma[]
+  educations   Education[]
+}
+
+model OpTransRelocationLocation {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  String
+  city      String
+  province  String
+
+  @@unique([language, city, province])
+  opRelocationLocation   OpRelocationLocation? @relation(fields: [opRelocationLocationId])
+  opRelocationLocationId String?
+}
+
+model OpRelocationLocation {
+  id                 String                      @default(uuid()) @id
+  createdAt          DateTime                    @default(now())
+  updatedAt          DateTime                    @updatedAt
+  translations       OpTransRelocationLocation[]
+  RelocationLocation RelocationLocation[]
+}
+
+model TransEmploymentInfo {
+  id               String          @default(uuid()) @id
+  createdAt        DateTime        @default(now())
+  updatedAt        DateTime        @updatedAt
+  language         Language
+  jobTitle         String?
+  branch           String?
+  employmentInfo   EmploymentInfo? @relation(fields: [employmentInfoId])
+  employmentInfoId String?
+}
+
+model EmploymentInfo {
+  id           String                @default(uuid()) @id
+  createdAt    DateTime              @default(now())
+  updatedAt    DateTime              @updatedAt
+  translations TransEmploymentInfo[]
+  users        User[]
+}
+
+model VisibleCard {
+  id                    String               @default(uuid()) @id
+  createdAt             DateTime             @default(now())
+  updatedAt             DateTime             @updatedAt
+  info                  CardVisibilityStatus @default(PRIVATE)
+  talentManagement      CardVisibilityStatus @default(PRIVATE)
+  officialLanguage      CardVisibilityStatus @default(PRIVATE)
+  skills                CardVisibilityStatus @default(PRIVATE)
+  competencies          CardVisibilityStatus @default(PRIVATE)
+  developmentalGoals    CardVisibilityStatus @default(PRIVATE)
+  description           CardVisibilityStatus @default(PRIVATE)
+  education             CardVisibilityStatus @default(PRIVATE)
+  experience            CardVisibilityStatus @default(PRIVATE)
+  careerInterests       CardVisibilityStatus @default(PRIVATE)
+  mentorshipSkills      CardVisibilityStatus @default(PRIVATE)
+  exFeeder              CardVisibilityStatus @default(PRIVATE)
+  employmentEquityGroup CardVisibilityStatus @default(PRIVATE)
+  users                 User[]
+}
+
+model MentorshipSkill {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  userId    String
+  skillId   String
+  user      User     @relation(fields: [userId])
+  skill     OpSkill  @relation(fields: [skillId])
+
+  @@unique([userId, skillId])
+}
+
+model Skill {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  userId    String
+  skillId   String
+  user      User     @relation(fields: [userId])
+  skill     OpSkill  @relation(fields: [skillId])
+
+  @@unique([userId, skillId])
+}
+
+model DevelopmentalGoal {
+  id           String        @default(uuid()) @id
+  createdAt    DateTime      @default(now())
+  updatedAt    DateTime      @updatedAt
+  userId       String
+  skillId      String?
+  competencyId String?
+  user         User          @relation(fields: [userId])
+  skill        OpSkill?      @relation(fields: [skillId])
+  competency   OpCompetency? @relation(fields: [competencyId])
+
+  @@unique([userId, skillId])
+  @@unique([userId, competencyId])
+}
+
+model SecondLangProf {
+  id                 String           @default(uuid()) @id
+  createdAt          DateTime         @default(now())
+  updatedAt          DateTime         @updatedAt
+  userId             String
+  date               DateTime?
+  unknownExpiredDate Boolean?         @default(false)
+  proficiency        Proficiency
+  level              ProficiencyLevel
+  user               User             @relation(fields: [userId])
+
+  @@unique([userId, proficiency])
+}
+
+model Organization {
+  id               String             @default(uuid()) @id
+  createdAt        DateTime           @default(now())
+  updatedAt        DateTime           @updatedAt
+  userId           String
+  organizationTier OrganizationTier[]
+  user             User               @relation(fields: [userId])
+}
+
+model OrganizationTier {
+  id             String              @default(uuid()) @id
+  createdAt      DateTime            @default(now())
+  updatedAt      DateTime            @updatedAt
+  tier           Int
+  organization   Organization?       @relation(fields: [organizationId])
+  translations   TransOrganization[]
+  organizationId String?
+}
+
+model TransOrganization {
+  id                 String            @default(uuid()) @id
+  createdAt          DateTime          @default(now())
+  updatedAt          DateTime          @updatedAt
+  language           Language
+  description        String
+  organizationTier   OrganizationTier? @relation(fields: [organizationTierId])
+  organizationTierId String?
+}
+
+model Education {
+  id              String           @default(uuid()) @id
+  createdAt       DateTime         @default(now())
+  updatedAt       DateTime         @updatedAt
+  userId          String
+  schoolId        String?
+  diplomaId       String?
+  endDate         DateTime?
+  startDate       DateTime?
+  ongoingDate     Boolean          @default(false)
+  description     String?
+  attachmentLinks AttachmentLink[]
+  user            User             @relation(fields: [userId])
+  school          OpSchool?        @relation(fields: [schoolId])
+  diploma         OpDiploma?       @relation(fields: [diplomaId])
+
+  @@unique([userId, schoolId, diplomaId, startDate])
+}
+
+model TransExperience {
+  id           String      @default(uuid()) @id
+  createdAt    DateTime    @default(now())
+  updatedAt    DateTime    @updatedAt
+  language     Language
+  description  String?
+  jobTitle     String
+  organization String
+  experience   Experience? @relation(fields: [experienceId])
+  experienceId String?
+}
+
+model Experience {
+  id              String            @default(uuid()) @id
+  createdAt       DateTime          @default(now())
+  updatedAt       DateTime          @updatedAt
+  translations    TransExperience[]
+  userId          String
+  startDate       DateTime
+  endDate         DateTime?
+  ongoingDate     Boolean           @default(false)
+  projects        String[]
+  attachmentLinks AttachmentLink[]
+  user            User              @relation(fields: [userId])
+}
+
+model RelocationLocation {
+  id                   String               @default(uuid()) @id
+  createdAt            DateTime             @default(now())
+  updatedAt            DateTime             @updatedAt
+  relocationLocationId String
+  relocationLocation   OpRelocationLocation @relation(fields: [relocationLocationId])
+  userId               String
+  user                 User                 @relation(fields: [userId])
+
+  @@unique([userId, relocationLocationId])
+}
+
+model OpTransAttachmentLinkName {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  Language
+  name      String
+
+  OpAttachmentLinkName   OpAttachmentLinkName? @relation(fields: [opAttachmentLinkNameId], references: [id])
+  opAttachmentLinkNameId String?
+}
+
+model OpAttachmentLinkName {
+  id                  String                      @default(uuid()) @id
+  createdAt           DateTime                    @default(now())
+  updatedAt           DateTime                    @updatedAt
+  type                String
+  translations        OpTransAttachmentLinkName[]
+  TransAttachmentLink TransAttachmentLink[]
+}
+
+model TransAttachmentLink {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  Language
+  nameId    String
+  url       String
+
+  name             OpAttachmentLinkName @relation(fields: [nameId])
+  AttachmentLink   AttachmentLink?      @relation(fields: [attachmentLinkId], references: [id])
+  attachmentLinkId String?
+}
+
+model AttachmentLink {
+  id           String                @default(uuid()) @id
+  createdAt    DateTime              @default(now())
+  updatedAt    DateTime              @updatedAt
+  translations TransAttachmentLink[]
+
+  Experience   Experience? @relation(fields: [experienceId], references: [id])
+  experienceId String?
+  Education    Education?  @relation(fields: [educationId], references: [id])
+  educationId  String?
+  User         User?       @relation(fields: [userId], references: [id])
+  userId       String?
+}
+
+model User {
+  id                            String                  @default(uuid()) @id
+  createdAt                     DateTime                @default(now())
+  updatedAt                     DateTime                @updatedAt
+  groupLevelId                  String?
+  actingLevelId                 String?
+  securityClearanceId           String?
+  lookingJobId                  String?
+  tenureId                      String?
+  careerMobilityId              String?
+  employmentInfoId              String?
+  talentMatrixResultId          String?
+  officeLocationId              String?
+  visibleCardId                 String
+  name                          String?
+  firstName                     String?
+  lastName                      String?
+  avatarColor                   String?
+  email                         String?
+  telephone                     String?
+  cellphone                     String?
+  manager                       String?
+  description                   String?
+  firstLanguage                 Language?
+  secondLanguage                Language?
+  preferredLanguage             Language                @default(ENGLISH)
+  actingStartDate               DateTime?
+  actingEndDate                 DateTime?
+  linkedin                      String?
+  github                        String?
+  gcconnex                      String?
+  exFeeder                      Boolean                 @default(false)
+  interestedInRemote            Boolean?
+  status                        UserStatus              @default(ACTIVE)
+  signupStep                    Int                     @default(1)
+  teams                         String[]
+  groupLevel                    OpClassification?       @relation(fields: [groupLevelId], name: "groupLevels")
+  actingLevel                   OpClassification?       @relation(fields: [actingLevelId], name: "actingLevels")
+  securityClearance             OpSecurityClearance?    @relation(fields: [securityClearanceId])
+  lookingJob                    OpLookingJob?           @relation(fields: [lookingJobId])
+  tenure                        OpTenure?               @relation(fields: [tenureId])
+  careerMobility                OpCareerMobility?       @relation(fields: [careerMobilityId])
+  employmentInfo                EmploymentInfo?         @relation(fields: [employmentInfoId])
+  talentMatrixResult            OpTalentMatrixResult?   @relation(fields: [talentMatrixResultId])
+  officeLocation                OpOfficeLocation?       @relation(fields: [officeLocationId])
+  visibleCards                  VisibleCard             @relation(fields: [visibleCardId])
+  mentorshipSkills              MentorshipSkill[]
+  skills                        Skill[]
+  developmentalGoals            DevelopmentalGoal[]
+  developmentalGoalsAttachments AttachmentLink[]
+  competencies                  Competency[]
+  secondLangProfs               SecondLangProf[]
+  organizations                 Organization[]
+  educations                    Education[]
+  experiences                   Experience[]
+  relocationLocations           RelocationLocation[]
+  employmentEquityGroups        EmploymentEquityGroup[]
+  connections                   User[]                  @relation("UserToUser")
+  user                          User?                   @relation("UserToUser", fields: [userId])
+  userId                        String?
+}
```


