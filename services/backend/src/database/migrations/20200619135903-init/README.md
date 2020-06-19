# Migration `20200619135903-init`

This migration has been generated at 6/19/2020, 1:59:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Language" AS ENUM ('FRENCH', 'ENGLISH');

CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'HIDDEN');

CREATE TYPE "Proficiency" AS ENUM ('READING', 'WRITING', 'ORAL');

CREATE TYPE "ProficiencyLevel" AS ENUM ('A', 'B', 'C', 'E', 'X');

CREATE TABLE "public"."dbSeeds" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransSecurityClearances" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opSecurityClearancesId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opSecurityClearances" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransLookingJobs" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opLookingJobsId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opLookingJobs" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransTenures" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opTenuresId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTenures" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransCareerMobilities" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opCareerMobilitiesId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opCareerMobilities" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransTalentMatrixResults" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opTalentMatrixResultsId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTalentMatrixResults" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransOfficeLocations" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opOfficeLocationsId" text   ,"province" text  NOT NULL ,"streetName" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opOfficeLocations" (
"city" text  NOT NULL ,"country" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"postalCode" text  NOT NULL ,"streetNumber" integer  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opClassifications" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"name" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransSkills" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opSkillsId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opSkills" (
"categoryId" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransCategories" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opCategoriesId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opCategories" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransCompetencies" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opCompetenciesId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opCompetencies" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransSchools" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"name" text  NOT NULL ,"opSchoolsId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opSchools" (
"abbrCountry" text  NOT NULL ,"abbrProvince" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opTransDiplomas" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"opDiplomasId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."opDiplomas" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."transEploymentInfos" (
"branch" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"employmentInfosId" text   ,"id" text  NOT NULL ,"jobTitle" text   ,"language" "Language" NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."employmentInfos" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."visibleCards" (
"careerInterests" boolean  NOT NULL DEFAULT true,"competencies" boolean  NOT NULL DEFAULT true,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"developmentalGoals" boolean  NOT NULL DEFAULT true,"education" boolean  NOT NULL DEFAULT true,"exFeeder" boolean  NOT NULL DEFAULT true,"experience" boolean  NOT NULL DEFAULT true,"id" text  NOT NULL ,"info" boolean  NOT NULL DEFAULT true,"manager" boolean  NOT NULL DEFAULT true,"mentorshipSkills" boolean  NOT NULL DEFAULT true,"officialLanguage" boolean  NOT NULL DEFAULT true,"projects" boolean  NOT NULL DEFAULT true,"skills" boolean  NOT NULL DEFAULT true,"talentManagement" boolean  NOT NULL DEFAULT true,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."mentorshipSkills" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"skillId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."skills" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"skillId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."developmentalGoals" (
"competencyId" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"skillId" text   ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."competencies" (
"competencyId" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."secondLangProfs" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"date" timestamp(3)   ,"id" text  NOT NULL ,"level" "ProficiencyLevel" NOT NULL ,"proficiency" "Proficiency" NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."transOrganizations" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"language" "Language" NOT NULL ,"organizationsId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."organizations" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"tier" integer  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."educations" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"diplomaId" text   ,"endDate" timestamp(3)   ,"id" text  NOT NULL ,"schoolId" text   ,"startDate" timestamp(3)  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."transExperiences" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"experiencesId" text   ,"id" text  NOT NULL ,"jobTitle" text  NOT NULL ,"language" "Language" NOT NULL ,"organization" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."experiences" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"endDate" timestamp(3)   ,"id" text  NOT NULL ,"startDate" timestamp(3)  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."relocationLocations" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"locationId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."users" (
"actingEndDate" timestamp(3)   ,"actingLevelId" text   ,"actingStartDate" timestamp(3)   ,"avatarColor" text   ,"careerMobilityId" text   ,"cellphone" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"email" text   ,"employmentInfoId" text   ,"exFeeder" boolean  NOT NULL DEFAULT false,"firstLanguage" "Language"  ,"firstName" text   ,"gcconnex" text   ,"github" text   ,"groupLevelId" text   ,"id" text  NOT NULL ,"interestedInRemote" boolean  NOT NULL DEFAULT false,"lastName" text   ,"linkedin" text   ,"lookingJobId" text   ,"manager" text   ,"mentoring" boolean  NOT NULL DEFAULT false,"name" text   ,"nameInitials" text   ,"officeLocationId" text   ,"preferredLanguage" "Language" NOT NULL DEFAULT E'ENGLISH',"projects" text []  ,"secondLanguage" "Language"  ,"securityClearanceId" text   ,"signupStep" integer  NOT NULL DEFAULT 0,"status" "UserStatus" NOT NULL DEFAULT E'ACTIVE',"talentMatrixResultId" text   ,"team" text   ,"telephone" text   ,"tenureId" text   ,"updatedAt" timestamp(3)  NOT NULL ,"visibleCardId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "opTransSecurityClearances.language_description" ON "public"."opTransSecurityClearances"("language","description")

CREATE UNIQUE INDEX "opTransLookingJobs.language_description" ON "public"."opTransLookingJobs"("language","description")

CREATE UNIQUE INDEX "opTransTenures.language_name" ON "public"."opTransTenures"("language","name")

CREATE UNIQUE INDEX "opTransCareerMobilities.language_description" ON "public"."opTransCareerMobilities"("language","description")

CREATE UNIQUE INDEX "opTransTalentMatrixResults.language_description" ON "public"."opTransTalentMatrixResults"("language","description")

CREATE UNIQUE INDEX "opClassifications.name" ON "public"."opClassifications"("name")

CREATE UNIQUE INDEX "opTransSkills.language_name" ON "public"."opTransSkills"("language","name")

CREATE UNIQUE INDEX "opTransCategories.language_name" ON "public"."opTransCategories"("language","name")

CREATE UNIQUE INDEX "opTransCompetencies.language_name" ON "public"."opTransCompetencies"("language","name")

CREATE UNIQUE INDEX "mentorshipSkills.userId_skillId" ON "public"."mentorshipSkills"("userId","skillId")

CREATE UNIQUE INDEX "skills.userId_skillId" ON "public"."skills"("userId","skillId")

CREATE UNIQUE INDEX "developmentalGoals.userId_skillId" ON "public"."developmentalGoals"("userId","skillId")

CREATE UNIQUE INDEX "developmentalGoals.userId_competencyId" ON "public"."developmentalGoals"("userId","competencyId")

CREATE UNIQUE INDEX "competencies.userId_competencyId" ON "public"."competencies"("userId","competencyId")

CREATE UNIQUE INDEX "secondLangProfs.userId_proficiency" ON "public"."secondLangProfs"("userId","proficiency")

CREATE UNIQUE INDEX "educations.userId_schoolId_diplomaId_startDate" ON "public"."educations"("userId","schoolId","diplomaId","startDate")

CREATE UNIQUE INDEX "transExperiences.language_description_jobTitle_organization" ON "public"."transExperiences"("language","description","jobTitle","organization")

CREATE UNIQUE INDEX "relocationLocations.userId_locationId" ON "public"."relocationLocations"("userId","locationId")

ALTER TABLE "public"."opTransSecurityClearances" ADD FOREIGN KEY ("opSecurityClearancesId")REFERENCES "public"."opSecurityClearances"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransLookingJobs" ADD FOREIGN KEY ("opLookingJobsId")REFERENCES "public"."opLookingJobs"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransTenures" ADD FOREIGN KEY ("opTenuresId")REFERENCES "public"."opTenures"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransCareerMobilities" ADD FOREIGN KEY ("opCareerMobilitiesId")REFERENCES "public"."opCareerMobilities"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransTalentMatrixResults" ADD FOREIGN KEY ("opTalentMatrixResultsId")REFERENCES "public"."opTalentMatrixResults"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransOfficeLocations" ADD FOREIGN KEY ("opOfficeLocationsId")REFERENCES "public"."opOfficeLocations"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransSkills" ADD FOREIGN KEY ("opSkillsId")REFERENCES "public"."opSkills"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opSkills" ADD FOREIGN KEY ("categoryId")REFERENCES "public"."opCategories"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransCategories" ADD FOREIGN KEY ("opCategoriesId")REFERENCES "public"."opCategories"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransCompetencies" ADD FOREIGN KEY ("opCompetenciesId")REFERENCES "public"."opCompetencies"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransSchools" ADD FOREIGN KEY ("opSchoolsId")REFERENCES "public"."opSchools"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."opTransDiplomas" ADD FOREIGN KEY ("opDiplomasId")REFERENCES "public"."opDiplomas"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."transEploymentInfos" ADD FOREIGN KEY ("employmentInfosId")REFERENCES "public"."employmentInfos"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."mentorshipSkills" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."mentorshipSkills" ADD FOREIGN KEY ("skillId")REFERENCES "public"."opSkills"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."skills" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."skills" ADD FOREIGN KEY ("skillId")REFERENCES "public"."opSkills"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."developmentalGoals" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."developmentalGoals" ADD FOREIGN KEY ("skillId")REFERENCES "public"."opSkills"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."developmentalGoals" ADD FOREIGN KEY ("competencyId")REFERENCES "public"."opCompetencies"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."competencies" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."competencies" ADD FOREIGN KEY ("competencyId")REFERENCES "public"."opCompetencies"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."secondLangProfs" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."transOrganizations" ADD FOREIGN KEY ("organizationsId")REFERENCES "public"."organizations"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."organizations" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."educations" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."educations" ADD FOREIGN KEY ("schoolId")REFERENCES "public"."opSchools"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."educations" ADD FOREIGN KEY ("diplomaId")REFERENCES "public"."opDiplomas"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."transExperiences" ADD FOREIGN KEY ("experiencesId")REFERENCES "public"."experiences"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."experiences" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."relocationLocations" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."relocationLocations" ADD FOREIGN KEY ("locationId")REFERENCES "public"."opOfficeLocations"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("groupLevelId")REFERENCES "public"."opClassifications"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("actingLevelId")REFERENCES "public"."opClassifications"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("securityClearanceId")REFERENCES "public"."opSecurityClearances"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("lookingJobId")REFERENCES "public"."opLookingJobs"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("tenureId")REFERENCES "public"."opTenures"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("careerMobilityId")REFERENCES "public"."opCareerMobilities"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("employmentInfoId")REFERENCES "public"."employmentInfos"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("talentMatrixResultId")REFERENCES "public"."opTalentMatrixResults"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("officeLocationId")REFERENCES "public"."opOfficeLocations"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."users" ADD FOREIGN KEY ("visibleCardId")REFERENCES "public"."visibleCards"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200619135903-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,471 @@
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
+model dbSeeds {
+  id            String     @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
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
+model opTransSecurityClearances {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  language      Language
+  description   String
+
+  @@unique([language, description])
+}
+
+model opSecurityClearances {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  translations  opTransSecurityClearances[]
+}
+
+model opTransLookingJobs {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  language      Language
+  description   String
+
+  @@unique([language, description])
+}
+
+model opLookingJobs {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  translations  opTransLookingJobs[]
+}
+
+model opTransTenures {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  language      Language
+  name          String
+
+  @@unique([language, name])
+}
+
+model opTenures {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  translations  opTransTenures[]
+}
+
+model opTransCareerMobilities {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  language      Language
+  description   String
+
+  @@unique([language, description])
+}
+
+model opCareerMobilities {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  translations  opTransCareerMobilities[]
+}
+
+model opTransTalentMatrixResults {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  language      Language
+  description   String
+
+  @@unique([language, description])
+}
+
+model opTalentMatrixResults {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  translations  opTransTalentMatrixResults[]
+}
+
+model opTransOfficeLocations {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  language      Language
+  streetName    String
+  province      String
+}
+
+model opOfficeLocations {
+  id            String                @default(uuid()) @id
+  createdAt     DateTime              @default(now())
+  updatedAt     DateTime              @updatedAt
+  postalCode    String
+  streetNumber  Int
+  city          String
+  country       String
+  translations  opTransOfficeLocations[]
+}
+
+model opClassifications {
+  id                  String     @default(uuid()) @id
+  createdAt           DateTime   @default(now())
+  updatedAt           DateTime   @updatedAt 
+  name                String     @unique
+
+  actingLevelUsers    users[]    @relation("actingLevels")
+  groupLevelUsers     users[]    @relation("groupLevels")
+}
+
+model opTransSkills {
+  id                  String     @default(uuid()) @id
+  createdAt           DateTime   @default(now())
+  updatedAt           DateTime   @updatedAt
+  language            Language
+  name                String
+
+  @@unique([language, name])
+}
+
+model opSkills {
+  id                  String        @default(uuid()) @id
+  createdAt           DateTime      @default(now())
+  updatedAt           DateTime      @updatedAt
+  categoryId          String?
+
+  translations        opTransSkills[]
+  category            opCategories?  @relation(fields: [categoryId])
+}
+
+model opTransCategories {
+  id            String   @default(uuid()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  language      Language
+  name          String
+
+  @@unique([language, name])
+}
+
+model opCategories {
+  id            String   @default(uuid()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  translations  opTransCategories[]
+}
+
+model opTransCompetencies {
+  id            String   @default(uuid()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  language      Language
+  name          String
+
+  @@unique([language, name])
+}
+
+model opCompetencies {
+  id            String   @default(uuid()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  translations  opTransCompetencies[]
+}
+
+model opTransSchools {
+  id          String      @default(uuid()) @id
+  createdAt   DateTime    @default(now())
+  updatedAt   DateTime    @updatedAt
+  language    Language
+  name        String
+}
+
+model opSchools {
+  id            String      @default(uuid()) @id
+  createdAt     DateTime    @default(now())
+  updatedAt     DateTime    @updatedAt
+  abbrProvince  String
+  abbrCountry   String
+  translations  opTransSchools[]
+}
+
+model opTransDiplomas {
+  id            String      @default(uuid()) @id
+  createdAt     DateTime    @default(now())
+  updatedAt     DateTime    @updatedAt
+  language      Language
+  description   String
+}
+
+model opDiplomas {
+  id            String      @default(uuid()) @id
+  createdAt     DateTime    @default(now())
+  updatedAt     DateTime    @updatedAt
+  translations  opTransDiplomas[]
+}
+
+model transEploymentInfos {
+  id            String      @default(uuid()) @id
+  createdAt     DateTime    @default(now())
+  updatedAt     DateTime    @updatedAt
+  language      Language
+  jobTitle      String?
+  branch        String?
+}
+
+model employmentInfos {
+  id            String      @default(uuid()) @id
+  createdAt     DateTime    @default(now())
+  updatedAt     DateTime    @updatedAt
+  translations  transEploymentInfos[]
+}
+
+model visibleCards {
+  id                  String    @default(uuid()) @id
+  createdAt           DateTime  @default(now())
+  updatedAt           DateTime  @updatedAt
+  info                Boolean   @default(true)
+  manager             Boolean   @default(true)
+  talentManagement    Boolean   @default(true)
+  officialLanguage    Boolean   @default(true)
+  skills              Boolean   @default(true)
+  competencies        Boolean   @default(true)
+  developmentalGoals  Boolean   @default(true)
+  education           Boolean   @default(true)
+  experience          Boolean   @default(true)
+  projects            Boolean   @default(true)
+  careerInterests     Boolean   @default(true)
+  mentorshipSkills    Boolean   @default(true)
+  exFeeder            Boolean   @default(true)
+}
+
+model mentorshipSkills {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  userId    String
+  skillId   String
+
+  user      users    @relation(fields: [userId])
+  skill     opSkills @relation(fields: [skillId])
+
+  @@unique([userId, skillId])
+}
+
+model skills {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  userId    String
+  skillId   String
+
+  user      users    @relation(fields: [userId])
+  skill     opSkills @relation(fields: [skillId])
+
+  @@unique([userId, skillId])
+}
+
+model developmentalGoals {
+  id            String          @default(uuid()) @id
+  createdAt     DateTime        @default(now())
+  updatedAt     DateTime        @updatedAt
+  userId        String
+  skillId       String?
+  competencyId  String?
+
+  user          users           @relation(fields: [userId])
+  skill         opSkills?       @relation(fields: [skillId])
+  competency    opCompetencies? @relation(fields: [competencyId])
+
+  @@unique([userId, skillId])
+  @@unique([userId, competencyId])
+}
+
+model competencies {
+  id            String          @default(uuid()) @id
+  createdAt     DateTime        @default(now())
+  updatedAt     DateTime        @updatedAt
+  userId        String
+  competencyId  String
+
+  user           users           @relation(fields: [userId])
+  competency    opCompetencies  @relation(fields: [competencyId])
+
+  @@unique([userId, competencyId])
+}
+
+model secondLangProfs {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  userId        String
+  date          DateTime?
+  proficiency   Proficiency
+  level         ProficiencyLevel
+
+  user          users      @relation(fields: [userId])
+
+  @@unique([userId, proficiency])
+}
+
+model transOrganizations {
+  id            String    @default(uuid()) @id
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+  language      Language
+  description   String
+}
+
+model organizations {
+  id            String    @default(uuid()) @id
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+  userId        String
+  tier          Int
+  translations  transOrganizations[]
+
+  user          users     @relation(fields: [userId])
+}
+
+model educations {
+  id        String    @default(uuid()) @id
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+  userId    String
+  schoolId  String?
+  diplomaId String?
+  endDate   DateTime?
+  startDate DateTime
+
+  user      users       @relation(fields: [userId])
+  school    opSchools?  @relation(fields: [schoolId])
+  diploma   opDiplomas? @relation(fields: [diplomaId])
+
+  @@unique([userId, schoolId, diplomaId, startDate])
+}
+
+model transExperiences {
+  id           String    @default(uuid()) @id
+  createdAt    DateTime  @default(now())
+  updatedAt    DateTime  @updatedAt
+  language     Language
+  description  String
+  jobTitle     String
+  organization String
+
+  @@unique([language, description, jobTitle, organization])
+}
+
+model experiences {
+  id           String    @default(uuid()) @id
+  createdAt    DateTime  @default(now())
+  updatedAt    DateTime  @updatedAt
+  translations transExperiences[]
+  userId       String
+  startDate    DateTime
+  endDate      DateTime?
+  
+  user         users     @relation(fields: [userId])
+}
+
+model relocationLocations {
+  id         String            @default(uuid()) @id
+  createdAt  DateTime          @default(now())
+  updatedAt  DateTime          @updatedAt
+  userId     String
+  locationId String
+
+  user       users             @relation(fields: [userId])
+  location   opOfficeLocations @relation(fields: [locationId])
+
+  @@unique([userId, locationId])
+}
+
+model users {
+  id                    String                  @default(uuid()) @id
+  createdAt             DateTime                @default(now())
+  updatedAt             DateTime                @updatedAt
+
+  groupLevelId          String?
+  actingLevelId         String?
+  securityClearanceId   String?
+  lookingJobId          String?
+  tenureId              String?
+  careerMobilityId      String?
+  employmentInfoId      String?
+  talentMatrixResultId  String?
+  officeLocationId      String?
+  visibleCardId         String
+
+  name                  String?
+  nameInitials          String?
+  firstName             String?
+  lastName              String?
+  avatarColor           String?
+  email                 String?
+  telephone             String?
+  cellphone             String?
+  manager               String?
+  team                  String?
+  firstLanguage         Language?
+  secondLanguage        Language?
+  preferredLanguage     Language                @default(ENGLISH)
+  actingStartDate       DateTime?
+  actingEndDate         DateTime?
+  linkedin              String?
+  github                String?
+  gcconnex              String?
+  exFeeder              Boolean                 @default(false)
+  mentoring             Boolean                 @default(false)
+  interestedInRemote    Boolean                 @default(false)
+  status                UserStatus              @default(ACTIVE)
+  projects              String[]
+  signupStep            Int                     @default(0)
+
+  groupLevel            opClassifications?      @relation(fields: [groupLevelId], name: "groupLevels")
+  actingLevel           opClassifications?      @relation(fields: [actingLevelId], name: "actingLevels")
+  securityClearance     opSecurityClearances?   @relation(fields: [securityClearanceId])
+  lookingJob            opLookingJobs?          @relation(fields: [lookingJobId])
+  tenure                opTenures?              @relation(fields: [tenureId])
+  careerMobility        opCareerMobilities?     @relation(fields: [careerMobilityId])
+  employmentInfo        employmentInfos?        @relation(fields: [employmentInfoId])
+  talentMatrixResult    opTalentMatrixResults?  @relation(fields: [talentMatrixResultId])
+  officeLocation        opOfficeLocations?      @relation(fields: [officeLocationId])
+  visibleCards          visibleCards            @relation(fields: [visibleCardId])
+}
```


