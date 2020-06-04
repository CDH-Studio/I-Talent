# Migration `20200604114616-init`

This migration has been generated at 6/4/2020, 11:46:16 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."careerMobilities" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."categories" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" SERIAL,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."competencies" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."diplomas" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."education" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"diplomaId" text   ,"endDate" timestamp(3)   ,"id" text  NOT NULL ,"profileId" text   ,"schoolId" text   ,"startDate" timestamp(3)   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."experiences" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text   ,"endDate" timestamp(3)   ,"id" text  NOT NULL ,"jobTitle" text   ,"organization" text   ,"profileId" text   ,"startDate" timestamp(3)   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."groupLevels" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."keyCompetencies" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."locations" (
"addressEn" text   ,"addressFr" text   ,"city" text   ,"country" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"postalCode" text   ,"provinceEn" text   ,"provinceFr" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."lookingForANewJobs" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."profileCompetencies" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"profileId" text  NOT NULL ,"skillId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("profileId","skillId"))

CREATE TABLE "public"."profileDevelopmentGoals" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"profileId" text  NOT NULL ,"skillId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("profileId","skillId"))

CREATE TABLE "public"."profileMentorshipSkills" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"profileId" text  NOT NULL ,"skillId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("profileId","skillId"))

CREATE TABLE "public"."profileOrganizations" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"profileId" text   ,"tier" integer   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."profileProjects" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text   ,"id" text  NOT NULL ,"profileId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."profileSkills" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"profileId" text  NOT NULL ,"skillId" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("profileId","skillId"))

CREATE TABLE "public"."profiles" (
"actingEndDate" timestamp(3)   ,"actingId" text   ,"actingStartDate" timestamp(3)   ,"branchEn" text   ,"branchFr" text   ,"careerMobilityId" text   ,"cellphone" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"exFeeder" boolean   ,"firstLanguage" text   ,"firstName" text   ,"flagged" boolean  NOT NULL DEFAULT false,"gcconnex" text   ,"github" text   ,"groupLevelId" text   ,"id" text  NOT NULL ,"indeterminate" boolean   DEFAULT false,"interestedInRemote" boolean   ,"isMentor" boolean   DEFAULT false,"jobTitleEn" text   ,"jobTitleFr" text   ,"keyCompetencyId" text   ,"lastName" text   ,"linkedin" text   ,"locationId" text   ,"lookingForANewJobId" text   ,"manager" text   ,"secondLanguage" text   ,"secondLanguageProficiencyId" text   ,"securityClearanceId" text   ,"talentMatrixResultId" text   ,"team" text   ,"telephone" text   ,"tenureId" text   ,"updatedAt" timestamp(3)  NOT NULL ,"visibleCardsId" text  NOT NULL ,"yearService" integer   ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."visibleCards" (
"careerInterests" boolean  NOT NULL DEFAULT true,"competencies" boolean  NOT NULL DEFAULT true,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"developmentalGoals" boolean  NOT NULL DEFAULT true,"education" boolean  NOT NULL DEFAULT true,"experience" boolean  NOT NULL DEFAULT true,"id" text  NOT NULL ,"info" boolean  NOT NULL DEFAULT true,"manager" boolean  NOT NULL DEFAULT true,"mentorshipSkills" boolean  NOT NULL DEFAULT true,"officialLanguage" boolean  NOT NULL DEFAULT true,"projects" boolean  NOT NULL DEFAULT true,"skills" boolean  NOT NULL DEFAULT true,"talentManagement" boolean  NOT NULL DEFAULT true,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."relocationLocations" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"locationId" text   ,"profileId" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."schools" (
"country" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text   ,"id" text  NOT NULL ,"state" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."secondLanguageProficiencies" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"oralDate" timestamp(3)   ,"oralProficiency" text   ,"readingDate" timestamp(3)   ,"readingProficiency" text   ,"updatedAt" timestamp(3)  NOT NULL ,"writingDate" timestamp(3)   ,"writingProficiency" text   ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."securityClearances" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."skills" (
"categoryId" integer  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"type" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."talentMatrixResults" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."tenures" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"descriptionEn" text   ,"descriptionFr" text   ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."users" (
"avatarColor" text   ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"email" text   ,"id" text  NOT NULL ,"inactive" boolean  NOT NULL DEFAULT false,"name" text   ,"nameInitials" text   ,"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "categories_unique_definition" ON "public"."categories"("descriptionEn","descriptionFr")

CREATE UNIQUE INDEX "skills_unique_definition" ON "public"."skills"("descriptionEn","descriptionFr")

ALTER TABLE "public"."education" ADD FOREIGN KEY ("diplomaId")REFERENCES "public"."diplomas"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."education" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."education" ADD FOREIGN KEY ("schoolId")REFERENCES "public"."schools"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."experiences" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profileCompetencies" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profileCompetencies" ADD FOREIGN KEY ("skillId")REFERENCES "public"."skills"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profileDevelopmentGoals" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profileDevelopmentGoals" ADD FOREIGN KEY ("skillId")REFERENCES "public"."skills"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profileMentorshipSkills" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profileMentorshipSkills" ADD FOREIGN KEY ("skillId")REFERENCES "public"."skills"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profileOrganizations" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profileProjects" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profileSkills" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profileSkills" ADD FOREIGN KEY ("skillId")REFERENCES "public"."skills"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("visibleCardsId")REFERENCES "public"."visibleCards"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("actingId")REFERENCES "public"."groupLevels"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("careerMobilityId")REFERENCES "public"."careerMobilities"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("groupLevelId")REFERENCES "public"."groupLevels"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("id")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("keyCompetencyId")REFERENCES "public"."keyCompetencies"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("locationId")REFERENCES "public"."locations"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("lookingForANewJobId")REFERENCES "public"."lookingForANewJobs"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("secondLanguageProficiencyId")REFERENCES "public"."secondLanguageProficiencies"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("securityClearanceId")REFERENCES "public"."securityClearances"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("talentMatrixResultId")REFERENCES "public"."talentMatrixResults"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."profiles" ADD FOREIGN KEY ("tenureId")REFERENCES "public"."tenures"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."relocationLocations" ADD FOREIGN KEY ("locationId")REFERENCES "public"."locations"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."relocationLocations" ADD FOREIGN KEY ("profileId")REFERENCES "public"."profiles"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."skills" ADD FOREIGN KEY ("categoryId")REFERENCES "public"."categories"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200604114616-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,346 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+model careerMobilities {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  profiles      profiles[]
+}
+
+model categories {
+  id            Int      @default(autoincrement()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  skills        skills[]
+
+  @@unique([descriptionEn, descriptionFr], name: "categories_unique_definition")
+}
+
+model competencies {
+  id            String   @default(uuid()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+}
+
+model diplomas {
+  id            String      @default(uuid()) @id
+  createdAt     DateTime    @default(now())
+  updatedAt     DateTime    @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  education     education[]
+}
+
+model education {
+  id        String    @default(uuid()) @id
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+  diplomaId String?
+  endDate   DateTime?
+  profileId String?
+  schoolId  String?
+  startDate DateTime?
+  diplomas  diplomas? @relation(fields: [diplomaId], references: [id])
+  profiles  profiles? @relation(fields: [profileId], references: [id])
+  schools   schools?  @relation(fields: [schoolId], references: [id])
+}
+
+model experiences {
+  id           String    @default(uuid()) @id
+  createdAt    DateTime  @default(now())
+  updatedAt    DateTime  @updatedAt
+  description  String?
+  endDate      DateTime?
+  jobTitle     String?
+  organization String?
+  profileId    String?
+  startDate    DateTime?
+  profiles     profiles? @relation(fields: [profileId], references: [id])
+}
+
+model groupLevels {
+  id                                          String     @default(uuid()) @id
+  createdAt                                   DateTime   @default(now())
+  updatedAt                                   DateTime   @updatedAt 
+  description                                 String?
+  profiles_groupLevelsToprofiles_actingId     profiles[] @relation("groupLevelsToprofiles_actingId")
+  profiles_groupLevelsToprofiles_groupLevelId profiles[] @relation("groupLevelsToprofiles_groupLevelId")
+}
+
+model keyCompetencies {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  profiles      profiles[]
+}
+
+model locations {
+  id                  String                @default(uuid()) @id
+  createdAt           DateTime              @default(now())
+  updatedAt           DateTime              @updatedAt
+  addressEn           String?
+  addressFr           String?
+  city                String?
+  country             String?
+  postalCode          String?
+  provinceEn          String?
+  provinceFr          String?
+  profiles            profiles[]
+  relocationLocations relocationLocations[]
+}
+
+model lookingForANewJobs {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  profiles      profiles[]
+}
+
+model profileCompetencies {
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  profileId String
+  skillId   String
+  profiles  profiles @relation(fields: [profileId], references: [id])
+  skills    skills   @relation(fields: [skillId], references: [id])
+
+  @@id([profileId, skillId])
+}
+
+model profileDevelopmentGoals {
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  profileId String
+  skillId   String
+  profiles  profiles @relation(fields: [profileId], references: [id])
+  skills    skills   @relation(fields: [skillId], references: [id])
+
+  @@id([profileId, skillId])
+}
+
+model profileMentorshipSkills {
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  profileId String
+  skillId   String
+  profiles  profiles @relation(fields: [profileId], references: [id])
+  skills    skills   @relation(fields: [skillId], references: [id])
+
+  @@id([profileId, skillId])
+}
+
+model profileOrganizations {
+  id            String    @default(uuid()) @id
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  profileId     String?
+  tier          Int?
+  profiles      profiles? @relation(fields: [profileId], references: [id])
+}
+
+model profileProjects {
+  id          String    @default(uuid()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+  description String?
+  profileId   String?
+  profiles    profiles? @relation(fields: [profileId], references: [id])
+}
+
+model profileSkills {
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  profileId String
+  skillId   String
+  profiles  profiles @relation(fields: [profileId], references: [id])
+  skills    skills   @relation(fields: [skillId], references: [id])
+
+  @@id([profileId, skillId])
+}
+
+model profiles {
+  id                                             String                       @default(uuid()) @id
+  createdAt                                      DateTime                     @default(now())
+  updatedAt                                      DateTime                     @updatedAt
+  actingEndDate                                  DateTime?
+  actingId                                       String?
+  actingStartDate                                DateTime?
+  branchEn                                       String?
+  branchFr                                       String?
+  careerMobilityId                               String?
+  cellphone                                      String?
+  exFeeder                                       Boolean?
+  firstLanguage                                  String?
+  firstName                                      String?
+  flagged                                        Boolean                      @default(false)
+  gcconnex                                       String?
+  github                                         String?
+  groupLevelId                                   String?
+  indeterminate                                  Boolean?                     @default(false)
+  interestedInRemote                             Boolean?
+  isMentor                                       Boolean?                     @default(false)
+  jobTitleEn                                     String?
+  jobTitleFr                                     String?
+  keyCompetencyId                                String?
+  lastName                                       String?
+  linkedin                                       String?
+  locationId                                     String?
+  lookingForANewJobId                            String?
+  manager                                        String?
+  secondLanguage                                 String?
+  secondLanguageProficiencyId                    String?
+  securityClearanceId                            String?
+  talentMatrixResultId                           String?
+  team                                           String?
+  telephone                                      String?
+  tenureId                                       String?
+  visibleCards                                   visibleCards  @relation(fields: [visibleCardsId], references: [id])
+  visibleCardsId                                 String
+  yearService                                    Int?
+  groupLevels_groupLevelsToprofiles_actingId     groupLevels?                 @relation("groupLevelsToprofiles_actingId", fields: [actingId], references: [id])
+  careerMobilities                               careerMobilities?            @relation(fields: [careerMobilityId], references: [id])
+  groupLevels_groupLevelsToprofiles_groupLevelId groupLevels?                 @relation("groupLevelsToprofiles_groupLevelId", fields: [groupLevelId], references: [id])
+  users                                          users                        @relation(fields: [id], references: [id])
+  keyCompetencies                                keyCompetencies?             @relation(fields: [keyCompetencyId], references: [id])
+  locations                                      locations?                   @relation(fields: [locationId], references: [id])
+  lookingForANewJobs                             lookingForANewJobs?          @relation(fields: [lookingForANewJobId], references: [id])
+  secondLanguageProficiencies                    secondLanguageProficiencies? @relation(fields: [secondLanguageProficiencyId], references: [id])
+  securityClearances                             securityClearances?          @relation(fields: [securityClearanceId], references: [id])
+  talentMatrixResults                            talentMatrixResults?         @relation(fields: [talentMatrixResultId], references: [id])
+  tenures                                        tenures?                     @relation(fields: [tenureId], references: [id])
+  education                                      education[]
+  experiences                                    experiences[]
+  profileCompetencies                            profileCompetencies[]
+  profileDevelopmentGoals                        profileDevelopmentGoals[]
+  profileMentorshipSkills                        profileMentorshipSkills[]
+  profileOrganizations                           profileOrganizations[]
+  profileProjects                                profileProjects[]
+  profileSkills                                  profileSkills[]
+  relocationLocations                            relocationLocations[]
+}
+
+model visibleCards {
+  id      String @default(uuid()) @id
+  createdAt  DateTime   @default(now())
+  updatedAt  DateTime   @updatedAt
+  info              Boolean   @default(true)
+  manager              Boolean   @default(true)
+  talentManagement              Boolean   @default(true)
+  officialLanguage              Boolean   @default(true)
+  skills              Boolean   @default(true)
+  competencies              Boolean   @default(true)
+  developmentalGoals              Boolean   @default(true)
+  education              Boolean   @default(true)
+  experience              Boolean   @default(true)
+  projects              Boolean   @default(true)
+  careerInterests              Boolean   @default(true)
+  mentorshipSkills              Boolean   @default(true)
+}
+
+model relocationLocations {
+  id         String     @default(uuid()) @id
+  createdAt  DateTime   @default(now())
+  updatedAt  DateTime   @updatedAt
+  locationId String?
+  profileId  String?
+  locations  locations? @relation(fields: [locationId], references: [id])
+  profiles   profiles?  @relation(fields: [profileId], references: [id])
+}
+
+model schools {
+  id          String      @default(uuid()) @id
+  createdAt   DateTime    @default(now())
+  updatedAt   DateTime    @updatedAt
+  country     String?
+  description String?
+  state       String?
+  education   education[]
+}
+
+model secondLanguageProficiencies {
+  id                 String     @default(uuid()) @id
+  createdAt          DateTime   @default(now())
+  updatedAt          DateTime   @updatedAt
+  oralDate           DateTime?
+  oralProficiency    String?
+  readingDate        DateTime?
+  readingProficiency String?
+  writingDate        DateTime?
+  writingProficiency String?
+  profiles           profiles[]
+}
+
+model securityClearances {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  profiles      profiles[]
+}
+
+model skills {
+  id                      String                    @default(uuid()) @id
+  createdAt               DateTime                  @default(now())
+  updatedAt               DateTime                  @updatedAt
+  categoryId              Int
+  descriptionEn           String?
+  descriptionFr           String?
+  type                    String?
+  categories              categories                @relation(fields: [categoryId], references: [id])
+  profileCompetencies     profileCompetencies[]
+  profileDevelopmentGoals profileDevelopmentGoals[]
+  profileMentorshipSkills profileMentorshipSkills[]
+  profileSkills           profileSkills[]
+
+  @@unique([descriptionEn, descriptionFr], name: "skills_unique_definition")
+}
+
+model talentMatrixResults {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  profiles      profiles[]
+}
+
+model tenures {
+  id            String     @default(uuid()) @id
+  createdAt     DateTime   @default(now())
+  updatedAt     DateTime   @updatedAt
+  descriptionEn String?
+  descriptionFr String?
+  profiles      profiles[]
+}
+
+model users {
+  id           String     @default(uuid()) @id
+  createdAt    DateTime   @default(now())
+  updatedAt    DateTime   @updatedAt
+  avatarColor  String?
+  email        String?
+  inactive     Boolean    @default(false)
+  name         String?
+  nameInitials String?
+  profiles     profiles[]
+}
```


