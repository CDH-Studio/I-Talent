# Migration `20200820133639-add-employment-equity-group`

This migration has been generated at 8/20/2020, 9:36:39 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "EmploymentEquityGroup" AS ENUM ('WOMEN', 'INDIGENOUS', 'DISABILITY', 'MINORITY')

ALTER TABLE "public"."User" ADD COLUMN "employmentEquityGroups" "EmploymentEquityGroup"[]  

ALTER TABLE "public"."VisibleCard" ADD COLUMN "employmentEquityGroup" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200819173159-add-link-section..20200820133639-add-employment-equity-group
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
@@ -45,8 +45,15 @@
   PUBLIC
   CONNECTIONS
 }
+enum EmploymentEquityGroup {
+  WOMEN
+  INDIGENOUS
+  DISABILITY
+  MINORITY
+}
+
 model OpTransSecurityClearance {
   id          String   @default(uuid()) @id
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
@@ -313,25 +320,26 @@
   users        User[]
 }
 model VisibleCard {
-  id                 String               @default(uuid()) @id
-  createdAt          DateTime             @default(now())
-  updatedAt          DateTime             @updatedAt
-  info               CardVisibilityStatus @default(PRIVATE)
-  talentManagement   CardVisibilityStatus @default(PRIVATE)
-  officialLanguage   CardVisibilityStatus @default(PRIVATE)
-  skills             CardVisibilityStatus @default(PRIVATE)
-  competencies       CardVisibilityStatus @default(PRIVATE)
-  developmentalGoals CardVisibilityStatus @default(PRIVATE)
-  description        CardVisibilityStatus @default(PRIVATE)
-  education          CardVisibilityStatus @default(PRIVATE)
-  experience         CardVisibilityStatus @default(PRIVATE)
-  projects           CardVisibilityStatus @default(PRIVATE)
-  careerInterests    CardVisibilityStatus @default(PRIVATE)
-  mentorshipSkills   CardVisibilityStatus @default(PRIVATE)
-  exFeeder           CardVisibilityStatus @default(PRIVATE)
-  users              User[]
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
+  projects              CardVisibilityStatus @default(PRIVATE)
+  careerInterests       CardVisibilityStatus @default(PRIVATE)
+  mentorshipSkills      CardVisibilityStatus @default(PRIVATE)
+  exFeeder              CardVisibilityStatus @default(PRIVATE)
+  employmentEquityGroup CardVisibilityStatus @default(PRIVATE)
+  users                 User[]
 }
 model MentorshipSkill {
   id        String   @default(uuid()) @id
@@ -372,17 +380,17 @@
   @@unique([userId, competencyId])
 }
 model SecondLangProf {
-  id                    String            @default(uuid()) @id
-  createdAt             DateTime          @default(now())
-  updatedAt             DateTime          @updatedAt
-  userId                String
-  date                  DateTime?
-  unknownExpiredDate    Boolean           @default(false)
-  proficiency           Proficiency
-  level                 ProficiencyLevel
-  user                  User              @relation(fields: [userId])
+  id                 String           @default(uuid()) @id
+  createdAt          DateTime         @default(now())
+  updatedAt          DateTime         @updatedAt
+  userId             String
+  date               DateTime?
+  unknownExpiredDate Boolean          @default(false)
+  proficiency        Proficiency
+  level              ProficiencyLevel
+  user               User             @relation(fields: [userId])
   @@unique([userId, proficiency])
 }
@@ -514,63 +522,64 @@
   educationId  String?
 }
 model User {
-  id                   String                @default(uuid()) @id
-  createdAt            DateTime              @default(now())
-  updatedAt            DateTime              @updatedAt
-  groupLevelId         String?
-  actingLevelId        String?
-  securityClearanceId  String?
-  lookingJobId         String?
-  tenureId             String?
-  careerMobilityId     String?
-  employmentInfoId     String?
-  talentMatrixResultId String?
-  officeLocationId     String?
-  visibleCardId        String
-  name                 String?
-  firstName            String?
-  lastName             String?
-  avatarColor          String?
-  email                String?
-  telephone            String?
-  cellphone            String?
-  manager              String?
-  description          String?
-  firstLanguage        Language?
-  secondLanguage       Language?
-  preferredLanguage    Language              @default(ENGLISH)
-  actingStartDate      DateTime?
-  actingEndDate        DateTime?
-  linkedin             String?
-  github               String?
-  gcconnex             String?
-  exFeeder             Boolean               @default(false)
-  interestedInRemote   Boolean?
-  status               UserStatus            @default(ACTIVE)
-  signupStep           Int                   @default(1)
-  projects             String[]
-  teams                String[]
-  groupLevel           OpClassification?     @relation(fields: [groupLevelId], name: "groupLevels")
-  actingLevel          OpClassification?     @relation(fields: [actingLevelId], name: "actingLevels")
-  securityClearance    OpSecurityClearance?  @relation(fields: [securityClearanceId])
-  lookingJob           OpLookingJob?         @relation(fields: [lookingJobId])
-  tenure               OpTenure?             @relation(fields: [tenureId])
-  careerMobility       OpCareerMobility?     @relation(fields: [careerMobilityId])
-  employmentInfo       EmploymentInfo?       @relation(fields: [employmentInfoId])
-  talentMatrixResult   OpTalentMatrixResult? @relation(fields: [talentMatrixResultId])
-  officeLocation       OpOfficeLocation?     @relation(fields: [officeLocationId])
-  visibleCards         VisibleCard           @relation(fields: [visibleCardId])
-  mentorshipSkills     MentorshipSkill[]
-  skills               Skill[]
-  developmentalGoals   DevelopmentalGoal[]
-  competencies         Competency[]
-  secondLangProfs      SecondLangProf[]
-  organizations        Organization[]
-  educations           Education[]
-  experiences          Experience[]
-  relocationLocations  RelocationLocation[]
-  connections          User[]                @relation("UserToUser")
-  user                 User?                 @relation("UserToUser", fields: [userId])
-  userId               String?
+  id                     String                  @default(uuid()) @id
+  createdAt              DateTime                @default(now())
+  updatedAt              DateTime                @updatedAt
+  groupLevelId           String?
+  actingLevelId          String?
+  securityClearanceId    String?
+  lookingJobId           String?
+  tenureId               String?
+  careerMobilityId       String?
+  employmentInfoId       String?
+  talentMatrixResultId   String?
+  officeLocationId       String?
+  visibleCardId          String
+  name                   String?
+  firstName              String?
+  lastName               String?
+  avatarColor            String?
+  email                  String?
+  telephone              String?
+  cellphone              String?
+  manager                String?
+  description            String?
+  firstLanguage          Language?
+  secondLanguage         Language?
+  preferredLanguage      Language                @default(ENGLISH)
+  actingStartDate        DateTime?
+  actingEndDate          DateTime?
+  linkedin               String?
+  github                 String?
+  gcconnex               String?
+  exFeeder               Boolean                 @default(false)
+  interestedInRemote     Boolean?
+  status                 UserStatus              @default(ACTIVE)
+  signupStep             Int                     @default(1)
+  projects               String[]
+  teams                  String[]
+  groupLevel             OpClassification?       @relation(fields: [groupLevelId], name: "groupLevels")
+  actingLevel            OpClassification?       @relation(fields: [actingLevelId], name: "actingLevels")
+  securityClearance      OpSecurityClearance?    @relation(fields: [securityClearanceId])
+  lookingJob             OpLookingJob?           @relation(fields: [lookingJobId])
+  tenure                 OpTenure?               @relation(fields: [tenureId])
+  careerMobility         OpCareerMobility?       @relation(fields: [careerMobilityId])
+  employmentInfo         EmploymentInfo?         @relation(fields: [employmentInfoId])
+  talentMatrixResult     OpTalentMatrixResult?   @relation(fields: [talentMatrixResultId])
+  officeLocation         OpOfficeLocation?       @relation(fields: [officeLocationId])
+  visibleCards           VisibleCard             @relation(fields: [visibleCardId])
+  mentorshipSkills       MentorshipSkill[]
+  skills                 Skill[]
+  developmentalGoals     DevelopmentalGoal[]
+  competencies           Competency[]
+  secondLangProfs        SecondLangProf[]
+  organizations          Organization[]
+  educations             Education[]
+  experiences            Experience[]
+  relocationLocations    RelocationLocation[]
+  employmentEquityGroups EmploymentEquityGroup[]
+  connections            User[]                  @relation("UserToUser")
+  user                   User?                   @relation("UserToUser", fields: [userId])
+  userId                 String?
 }
```


