# Migration `20200624155130-init`

This migration has been generated at 6/24/2020, 3:51:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Language" AS ENUM ('FRENCH', 'ENGLISH');

CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'HIDDEN');

CREATE TYPE "Proficiency" AS ENUM ('READING', 'WRITING', 'ORAL');

CREATE TYPE "ProficiencyLevel" AS ENUM ('A', 'B', 'C', 'E', 'X');

CREATE TABLE "public"."dbSeed" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransSecurityClearance" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opSecurityClearanceId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpSecurityClearance" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransLookingJob" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opLookingJobId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpLookingJob" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransTenure" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opTenureId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTenure" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransCareerMobility" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opCareerMobilityId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpCareerMobility" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransTalentMatrixResult" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opTalentMatrixResultId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTalentMatrixResult" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransOfficeLocation" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opOfficeLocationId" text   ,"province" text  NOT NULL ,"streetName" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpOfficeLocation" (
"city" text  NOT NULL ,"country" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"postalCode" text  NOT NULL ,"streetNumber" integer  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpClassification" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"name" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransSkill" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opSkillId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpSkill" (
"categoryId" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransCategory" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opCategoryId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpCategory" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransCompetency" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opCompetencyId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpCompetency" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransSchool" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opSchoolId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpSchool" (
"abbrCountry" text  NOT NULL ,"abbrProvince" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpTransDiploma" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opDiplomaId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OpDiploma" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."TransEmploymentInfo" (
"branch" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"employmentInfoId" text   ,"id" text  NOT NULL ,"jobTitle" text   ,"language" "Language" NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."EmploymentInfo" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."VisibleCard" (
"careerInterests" boolean  NOT NULL DEFAULT true,"competencies" boolean  NOT NULL DEFAULT true,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"developmentalGoals" boolean  NOT NULL DEFAULT true,"education" boolean  NOT NULL DEFAULT true,"exFeeder" boolean  NOT NULL DEFAULT true,"experience" boolean  NOT NULL DEFAULT true,"id" text  NOT NULL ,"info" boolean  NOT NULL DEFAULT true,"manager" boolean  NOT NULL DEFAULT true,"mentorshipSkills" boolean  NOT NULL DEFAULT true,"officialLanguage" boolean  NOT NULL DEFAULT true,"projects" boolean  NOT NULL DEFAULT true,"skills" boolean  NOT NULL DEFAULT true,"talentManagement" boolean  NOT NULL DEFAULT true,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."MentorshipSkill" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"skillId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Skill" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"skillId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."DevelopmentalGoal" (
"competencyId" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"skillId" text   ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Competency" (
"competencyId" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."SecondLangProf" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"date" timestamp(3)   ,"id" text  NOT NULL ,"level" "ProficiencyLevel" NOT NULL ,"proficiency" "Proficiency" NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Organization" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."OrganizationTier" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"organizationId" text   ,"tier" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."TransOrganization" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"organizationTierId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Education" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"diplomaId" text   ,"endDate" timestamp(3)   ,"id" text  NOT NULL ,"schoolId" text   ,"startDate" timestamp(3)  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."TransExperience" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"experienceId" text   ,"id" text  NOT NULL ,"jobTitle" text  NOT NULL ,"language" "Language" NOT NULL ,"organization" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Experience" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"endDate" timestamp(3)   ,"id" text  NOT NULL ,"startDate" timestamp(3)  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."RelocationLocation" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"locationId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."User" (
"actingEndDate" timestamp(3)   ,"actingLevelId" text   ,"actingStartDate" timestamp(3)   ,"avatarColor" text   ,"careerMobilityId" text   ,"cellphone" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"email" text   ,"employmentInfoId" text   ,"exFeeder" boolean  NOT NULL DEFAULT false,"firstLanguage" "Language"  ,"firstName" text   ,"gcconnex" text   ,"github" text   ,"groupLevelId" text   ,"id" text  NOT NULL ,"interestedInRemote" boolean  NOT NULL DEFAULT false,"lastName" text   ,"linkedin" text   ,"lookingJobId" text   ,"manager" text   ,"name" text   ,"officeLocationId" text   ,"preferredLanguage" "Language" NOT NULL DEFAULT E'ENGLISH',"projects" text []  ,"secondLanguage" "Language"  ,"securityClearanceId" text   ,"signupStep" integer  NOT NULL DEFAULT 0,"status" "UserStatus" NOT NULL DEFAULT E'ACTIVE',"talentMatrixResultId" text   ,"team" text []  ,"telephone" text   ,"tenureId" text   ,"updatedAt" timestamp(3)  NOT NULL ,"visibleCardId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "OpTransSecurityClearance.language_description" ON "public"."OpTransSecurityClearance"("language","description")

CREATE UNIQUE INDEX "OpTransLookingJob.language_description" ON "public"."OpTransLookingJob"("language","description")

CREATE UNIQUE INDEX "OpTransTenure.language_name" ON "public"."OpTransTenure"("language","name")

CREATE UNIQUE INDEX "OpTransCareerMobility.language_description" ON "public"."OpTransCareerMobility"("language","description")

CREATE UNIQUE INDEX "OpTransTalentMatrixResult.language_description" ON "public"."OpTransTalentMatrixResult"("language","description")

CREATE UNIQUE INDEX "OpClassification.name" ON "public"."OpClassification"("name")

CREATE UNIQUE INDEX "OpTransSkill.language_name" ON "public"."OpTransSkill"("language","name")

CREATE UNIQUE INDEX "OpTransCategory.language_name" ON "public"."OpTransCategory"("language","name")

CREATE UNIQUE INDEX "OpTransCompetency.language_name" ON "public"."OpTransCompetency"("language","name")

CREATE UNIQUE INDEX "MentorshipSkill.userId_skillId" ON "public"."MentorshipSkill"("userId","skillId")

CREATE UNIQUE INDEX "Skill.userId_skillId" ON "public"."Skill"("userId","skillId")

CREATE UNIQUE INDEX "DevelopmentalGoal.userId_skillId" ON "public"."DevelopmentalGoal"("userId","skillId")

CREATE UNIQUE INDEX "DevelopmentalGoal.userId_competencyId" ON "public"."DevelopmentalGoal"("userId","competencyId")

CREATE UNIQUE INDEX "Competency.userId_competencyId" ON "public"."Competency"("userId","competencyId")

CREATE UNIQUE INDEX "SecondLangProf.userId_proficiency" ON "public"."SecondLangProf"("userId","proficiency")

CREATE UNIQUE INDEX "Education.userId_schoolId_diplomaId_startDate" ON "public"."Education"("userId","schoolId","diplomaId","startDate")

CREATE UNIQUE INDEX "RelocationLocation.userId_locationId" ON "public"."RelocationLocation"("userId","locationId")

ALTER TABLE "public"."OpTransSecurityClearance" ADD FOREIGN KEY ("opSecurityClearanceId")REFERENCES "public"."OpSecurityClearance"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransLookingJob" ADD FOREIGN KEY ("opLookingJobId")REFERENCES "public"."OpLookingJob"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransTenure" ADD FOREIGN KEY ("opTenureId")REFERENCES "public"."OpTenure"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCareerMobility" ADD FOREIGN KEY ("opCareerMobilityId")REFERENCES "public"."OpCareerMobility"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransTalentMatrixResult" ADD FOREIGN KEY ("opTalentMatrixResultId")REFERENCES "public"."OpTalentMatrixResult"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransOfficeLocation" ADD FOREIGN KEY ("opOfficeLocationId")REFERENCES "public"."OpOfficeLocation"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransSkill" ADD FOREIGN KEY ("opSkillId")REFERENCES "public"."OpSkill"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpSkill" ADD FOREIGN KEY ("categoryId")REFERENCES "public"."OpCategory"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCategory" ADD FOREIGN KEY ("opCategoryId")REFERENCES "public"."OpCategory"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCompetency" ADD FOREIGN KEY ("opCompetencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransSchool" ADD FOREIGN KEY ("opSchoolId")REFERENCES "public"."OpSchool"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."OpTransDiploma" ADD FOREIGN KEY ("opDiplomaId")REFERENCES "public"."OpDiploma"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."TransEmploymentInfo" ADD FOREIGN KEY ("employmentInfoId")REFERENCES "public"."EmploymentInfo"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."MentorshipSkill" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."MentorshipSkill" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Skill" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Skill" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("competencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Competency" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Competency" ADD FOREIGN KEY ("competencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."SecondLangProf" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Organization" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."OrganizationTier" ADD FOREIGN KEY ("organizationId")REFERENCES "public"."Organization"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."TransOrganization" ADD FOREIGN KEY ("organizationTierId")REFERENCES "public"."OrganizationTier"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("schoolId")REFERENCES "public"."OpSchool"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("diplomaId")REFERENCES "public"."OpDiploma"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."TransExperience" ADD FOREIGN KEY ("experienceId")REFERENCES "public"."Experience"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Experience" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."RelocationLocation" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."RelocationLocation" ADD FOREIGN KEY ("locationId")REFERENCES "public"."OpOfficeLocation"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("groupLevelId")REFERENCES "public"."OpClassification"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("actingLevelId")REFERENCES "public"."OpClassification"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("securityClearanceId")REFERENCES "public"."OpSecurityClearance"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("lookingJobId")REFERENCES "public"."OpLookingJob"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("tenureId")REFERENCES "public"."OpTenure"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("careerMobilityId")REFERENCES "public"."OpCareerMobility"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("employmentInfoId")REFERENCES "public"."EmploymentInfo"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("talentMatrixResultId")REFERENCES "public"."OpTalentMatrixResult"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("officeLocationId")REFERENCES "public"."OpOfficeLocation"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("visibleCardId")REFERENCES "public"."VisibleCard"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200624155130-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,516 @@
+generator client {
+  provider = "prisma-client-js"
+  output   = "./client"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+model dbSeed {
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
+  id                  String                  @default(uuid()) @id
+  createdAt           DateTime                @default(now())
+  updatedAt           DateTime                @updatedAt
+  postalCode          String
+  streetNumber        Int
+  city                String
+  country             String
+  translations        OpTransOfficeLocation[]
+  relocationLocations RelocationLocation[]
+  users               User[]
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
+  id                 String   @default(uuid()) @id
+  createdAt          DateTime @default(now())
+  updatedAt          DateTime @updatedAt
+  info               Boolean  @default(true)
+  manager            Boolean  @default(true)
+  talentManagement   Boolean  @default(true)
+  officialLanguage   Boolean  @default(true)
+  skills             Boolean  @default(true)
+  competencies       Boolean  @default(true)
+  developmentalGoals Boolean  @default(true)
+  education          Boolean  @default(true)
+  experience         Boolean  @default(true)
+  projects           Boolean  @default(true)
+  careerInterests    Boolean  @default(true)
+  mentorshipSkills   Boolean  @default(true)
+  exFeeder           Boolean  @default(true)
+  users              User[]
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
+model SecondLangProf {
+  id          String           @default(uuid()) @id
+  createdAt   DateTime         @default(now())
+  updatedAt   DateTime         @updatedAt
+  userId      String
+  date        DateTime?
+  proficiency Proficiency
+  level       ProficiencyLevel
+  user        User             @relation(fields: [userId])
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
+  tier           String
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
+  id        String     @default(uuid()) @id
+  createdAt DateTime   @default(now())
+  updatedAt DateTime   @updatedAt
+  userId    String
+  schoolId  String?
+  diplomaId String?
+  endDate   DateTime?
+  startDate DateTime
+  user      User       @relation(fields: [userId])
+  school    OpSchool?  @relation(fields: [schoolId])
+  diploma   OpDiploma? @relation(fields: [diplomaId])
+
+  @@unique([userId, schoolId, diplomaId, startDate])
+}
+
+model TransExperience {
+  id           String      @default(uuid()) @id
+  createdAt    DateTime    @default(now())
+  updatedAt    DateTime    @updatedAt
+  language     Language
+  description  String
+  jobTitle     String
+  organization String
+  experience   Experience? @relation(fields: [experienceId])
+  experienceId String?
+}
+
+model Experience {
+  id           String            @default(uuid()) @id
+  createdAt    DateTime          @default(now())
+  updatedAt    DateTime          @updatedAt
+  translations TransExperience[]
+  userId       String
+  startDate    DateTime
+  endDate      DateTime?
+  user         User              @relation(fields: [userId])
+}
+
+model RelocationLocation {
+  id         String           @default(uuid()) @id
+  createdAt  DateTime         @default(now())
+  updatedAt  DateTime         @updatedAt
+  userId     String
+  locationId String
+  user       User             @relation(fields: [userId])
+  location   OpOfficeLocation @relation(fields: [locationId])
+
+  @@unique([userId, locationId])
+}
+
+model User {
+  id                   String                @default(uuid()) @id
+  createdAt            DateTime              @default(now())
+  updatedAt            DateTime              @updatedAt
+  groupLevelId         String?
+  actingLevelId        String?
+  securityClearanceId  String?
+  lookingJobId         String?
+  tenureId             String?
+  careerMobilityId     String?
+  employmentInfoId     String?
+  talentMatrixResultId String?
+  officeLocationId     String?
+  visibleCardId        String
+  name                 String?
+  firstName            String?
+  lastName             String?
+  avatarColor          String?
+  email                String?
+  telephone            String?
+  cellphone            String?
+  manager              String?
+  firstLanguage        Language?
+  secondLanguage       Language?
+  preferredLanguage    Language              @default(ENGLISH)
+  actingStartDate      DateTime?
+  actingEndDate        DateTime?
+  linkedin             String?
+  github               String?
+  gcconnex             String?
+  exFeeder             Boolean               @default(false)
+  interestedInRemote   Boolean               @default(false)
+  status               UserStatus            @default(ACTIVE)
+  signupStep           Int                   @default(0)
+  projects             String[]
+  team                 String[]
+  groupLevel           OpClassification?     @relation(fields: [groupLevelId], name: "groupLevels")
+  actingLevel          OpClassification?     @relation(fields: [actingLevelId], name: "actingLevels")
+  securityClearance    OpSecurityClearance?  @relation(fields: [securityClearanceId])
+  lookingJob           OpLookingJob?         @relation(fields: [lookingJobId])
+  tenure               OpTenure?             @relation(fields: [tenureId])
+  careerMobility       OpCareerMobility?     @relation(fields: [careerMobilityId])
+  employmentInfo       EmploymentInfo?       @relation(fields: [employmentInfoId])
+  talentMatrixResult   OpTalentMatrixResult? @relation(fields: [talentMatrixResultId])
+  officeLocation       OpOfficeLocation?     @relation(fields: [officeLocationId])
+  visibleCards         VisibleCard           @relation(fields: [visibleCardId])
+  mentorshipSkills     MentorshipSkill[]
+  skills               Skill[]
+  developmentalGoals   DevelopmentalGoal[]
+  competencies         Competency[]
+  secondLangProfs      SecondLangProf[]
+  organizations        Organization[]
+  educations           Education[]
+  experiences          Experience[]
+  relocationLocations  RelocationLocation[]
+}
```


