# Migration `20200821203314-add-project-to-experince`

This migration has been generated at 8/21/2020, 4:33:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Language" AS ENUM ('FRENCH', 'ENGLISH')

CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'HIDDEN')

CREATE TYPE "Proficiency" AS ENUM ('READING', 'WRITING', 'ORAL')

CREATE TYPE "ProficiencyLevel" AS ENUM ('A', 'B', 'C', 'E', 'X', 'NA')

CREATE TYPE "CardVisibilityStatus" AS ENUM ('PRIVATE', 'PUBLIC', 'CONNECTIONS')

CREATE TYPE "EmploymentEquityGroup" AS ENUM ('WOMEN', 'INDIGENOUS', 'DISABILITY', 'MINORITY')

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
"unknownExpiredDate" boolean   NOT NULL DEFAULT false,
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
"startDate" timestamp(3)   NOT NULL ,
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
migration 20200820161701-simplify-relocation-locations..20200821203314-add-project-to-experince
--- datamodel.dml
+++ datamodel.dml
@@ -4,9 +4,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model DbSeed {
   id        String   @id
@@ -164,17 +164,17 @@
   opOfficeLocationId String?
 }
 model OpOfficeLocation {
-  id                  String                  @default(uuid()) @id
-  createdAt           DateTime                @default(now())
-  updatedAt           DateTime                @updatedAt
-  postalCode          String
-  streetNumber        Int
-  city                String
-  country             String
-  translations        OpTransOfficeLocation[]
-  users               User[]
+  id           String                  @default(uuid()) @id
+  createdAt    DateTime                @default(now())
+  updatedAt    DateTime                @updatedAt
+  postalCode   String
+  streetNumber Int
+  city         String
+  country      String
+  translations OpTransOfficeLocation[]
+  users        User[]
 }
 model OpClassification {
   id               String   @default(uuid()) @id
@@ -261,10 +261,8 @@
   @@unique([userId, competencyId])
 }
-
-
 model OpTransSchool {
   id         String    @default(uuid()) @id
   createdAt  DateTime  @default(now())
   updatedAt  DateTime  @updatedAt
@@ -302,25 +300,26 @@
   educations   Education[]
 }
 model OpTransRelocationLocation {
-  id                      String     @default(uuid()) @id
-  createdAt               DateTime   @default(now())
-  updatedAt               DateTime   @updatedAt
-  language                String
-  city                    String
-  province                String
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  String
+  city      String
+  province  String
   @@unique([language, city, province])
-  opRelocationLocation    OpRelocationLocation?  @relation(fields: [opRelocationLocationId])
-  opRelocationLocationId  String?
+  opRelocationLocation   OpRelocationLocation? @relation(fields: [opRelocationLocationId])
+  opRelocationLocationId String?
 }
 model OpRelocationLocation {
-  id            String                      @default(uuid()) @id
-  createdAt     DateTime                    @default(now())
-  updatedAt     DateTime                    @updatedAt
-  translations  OpTransRelocationLocation[]
+  id                 String                      @default(uuid()) @id
+  createdAt          DateTime                    @default(now())
+  updatedAt          DateTime                    @updatedAt
+  translations       OpTransRelocationLocation[]
+  RelocationLocation RelocationLocation[]
 }
 model TransEmploymentInfo {
   id               String          @default(uuid()) @id
@@ -353,9 +352,8 @@
   developmentalGoals    CardVisibilityStatus @default(PRIVATE)
   description           CardVisibilityStatus @default(PRIVATE)
   education             CardVisibilityStatus @default(PRIVATE)
   experience            CardVisibilityStatus @default(PRIVATE)
-  projects              CardVisibilityStatus @default(PRIVATE)
   careerInterests       CardVisibilityStatus @default(PRIVATE)
   mentorshipSkills      CardVisibilityStatus @default(PRIVATE)
   exFeeder              CardVisibilityStatus @default(PRIVATE)
   employmentEquityGroup CardVisibilityStatus @default(PRIVATE)
@@ -481,22 +479,23 @@
   translations    TransExperience[]
   userId          String
   startDate       DateTime
   endDate         DateTime?
+  projects        String[]
   attachmentLinks AttachmentLink[]
   user            User              @relation(fields: [userId])
 }
 model RelocationLocation {
-  id                      String                @default(uuid()) @id
-  createdAt               DateTime              @default(now())
-  updatedAt               DateTime              @updatedAt
-  relocationLocationId    String
-  relocationLocation      OpRelocationLocation  @relation(fields: [relocationLocationId])
-  userId                  String
-  user                    User                  @relation(fields: [userId])
+  id                   String               @default(uuid()) @id
+  createdAt            DateTime             @default(now())
+  updatedAt            DateTime             @updatedAt
+  relocationLocationId String
+  relocationLocation   OpRelocationLocation @relation(fields: [relocationLocationId])
+  userId               String
+  user                 User                 @relation(fields: [userId])
-  @@unique([userId, relocationLocationId ])
+  @@unique([userId, relocationLocationId])
 }
 model OpTransAttachmentLinkName {
   id        String   @default(uuid()) @id
@@ -577,9 +576,8 @@
   exFeeder               Boolean                 @default(false)
   interestedInRemote     Boolean?
   status                 UserStatus              @default(ACTIVE)
   signupStep             Int                     @default(1)
-  projects               String[]
   teams                  String[]
   groupLevel             OpClassification?       @relation(fields: [groupLevelId], name: "groupLevels")
   actingLevel            OpClassification?       @relation(fields: [actingLevelId], name: "actingLevels")
   securityClearance      OpSecurityClearance?    @relation(fields: [securityClearanceId])
```


