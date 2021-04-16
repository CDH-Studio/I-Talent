# Migration `20210416204705-change-default-visibilty`

This migration has been generated at 4/16/2021, 4:47:05 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "VisibleCard" ALTER COLUMN "info" SET DEFAULT E'PUBLIC',
ALTER COLUMN "skills" SET DEFAULT E'PUBLIC',
ALTER COLUMN "competencies" SET DEFAULT E'PUBLIC',
ALTER COLUMN "developmentalGoals" SET DEFAULT E'PUBLIC',
ALTER COLUMN "description" SET DEFAULT E'PUBLIC',
ALTER COLUMN "education" SET DEFAULT E'PUBLIC',
ALTER COLUMN "experience" SET DEFAULT E'PUBLIC',
ALTER COLUMN "mentorshipSkills" SET DEFAULT E'PUBLIC',
ALTER COLUMN "exFeeder" SET DEFAULT E'PUBLIC',
ALTER COLUMN "qualifiedPools" SET DEFAULT E'PUBLIC'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210212203417-add-pri..20210416204705-change-default-visibilty
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model DbSeed {
   id        String   @id
@@ -71,9 +71,9 @@
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  opSecurityClearance   OpSecurityClearance? @relation(fields: [opSecurityClearanceId])
+  opSecurityClearance   OpSecurityClearance? @relation(fields: [opSecurityClearanceId], references: [id])
   opSecurityClearanceId String?
   @@unique([language, description])
 }
@@ -91,9 +91,9 @@
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  opLookingJob   OpLookingJob? @relation(fields: [opLookingJobId])
+  opLookingJob   OpLookingJob? @relation(fields: [opLookingJobId], references: [id])
   opLookingJobId String?
   @@unique([language, description])
 }
@@ -111,9 +111,9 @@
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  opTenures  OpTenure? @relation(fields: [opTenureId])
+  opTenures  OpTenure? @relation(fields: [opTenureId], references: [id])
   opTenureId String?
   @@unique([language, name])
 }
@@ -131,9 +131,9 @@
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  opCareerMobility   OpCareerMobility? @relation(fields: [opCareerMobilityId])
+  opCareerMobility   OpCareerMobility? @relation(fields: [opCareerMobilityId], references: [id])
   opCareerMobilityId String?
   @@unique([language, description])
 }
@@ -151,9 +151,9 @@
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  opTalentMatrixResult   OpTalentMatrixResult? @relation(fields: [opTalentMatrixResultId])
+  opTalentMatrixResult   OpTalentMatrixResult? @relation(fields: [opTalentMatrixResultId], references: [id])
   opTalentMatrixResultId String?
   @@unique([language, description])
 }
@@ -171,9 +171,9 @@
   updatedAt          DateTime          @updatedAt
   language           Language
   streetName         String
   province           String
-  opOfficeLocation   OpOfficeLocation? @relation(fields: [opOfficeLocationId])
+  opOfficeLocation   OpOfficeLocation? @relation(fields: [opOfficeLocationId], references: [id])
   opOfficeLocationId String?
 }
 model OpOfficeLocation {
@@ -204,9 +204,9 @@
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  opSkill   OpSkill? @relation(fields: [opSkillId])
+  opSkill   OpSkill? @relation(fields: [opSkillId], references: [id])
   opSkillId String?
   @@unique([language, name])
 }
@@ -215,9 +215,9 @@
   createdAt          DateTime            @default(now())
   updatedAt          DateTime            @updatedAt
   categoryId         String?
   translations       OpTransSkill[]
-  category           OpCategory?         @relation(fields: [categoryId])
+  category           OpCategory?         @relation(fields: [categoryId], references: [id])
   mentorshipSkills   MentorshipSkill[]
   skills             Skill[]
   developmentalGoals DevelopmentalGoal[]
 }
@@ -228,9 +228,9 @@
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  opCategory   OpCategory? @relation(fields: [opCategoryId])
+  opCategory   OpCategory? @relation(fields: [opCategoryId], references: [id])
   opCategoryId String?
   @@unique([language, name])
 }
@@ -248,9 +248,9 @@
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  opCompetency   OpCompetency? @relation(fields: [opCompetencyId])
+  opCompetency   OpCompetency? @relation(fields: [opCompetencyId], references: [id])
   opCompetencyId String?
   @@unique([language, name])
 }
@@ -268,10 +268,10 @@
   createdAt    DateTime     @default(now())
   updatedAt    DateTime     @updatedAt
   userId       String
   competencyId String
-  user         User         @relation(fields: [userId])
-  competency   OpCompetency @relation(fields: [competencyId])
+  user         User         @relation(fields: [userId], references: [id])
+  competency   OpCompetency @relation(fields: [competencyId], references: [id])
   @@unique([userId, competencyId])
 }
@@ -280,9 +280,9 @@
   createdAt  DateTime  @default(now())
   updatedAt  DateTime  @updatedAt
   language   Language
   name       String
-  opSchool   OpSchool? @relation(fields: [opSchoolId])
+  opSchool   OpSchool? @relation(fields: [opSchoolId], references: [id])
   opSchoolId String?
 }
 model OpSchool {
@@ -300,9 +300,9 @@
   createdAt   DateTime   @default(now())
   updatedAt   DateTime   @updatedAt
   language    Language
   description String
-  opDiploma   OpDiploma? @relation(fields: [opDiplomaId])
+  opDiploma   OpDiploma? @relation(fields: [opDiplomaId], references: [id])
   opDiplomaId String?
 }
 model OpDiploma {
@@ -320,9 +320,9 @@
   language  String
   city      String
   province  String
-  opRelocationLocation   OpRelocationLocation? @relation(fields: [opRelocationLocationId])
+  opRelocationLocation   OpRelocationLocation? @relation(fields: [opRelocationLocationId], references: [id])
   opRelocationLocationId String?
   @@unique([language, city, province])
 }
@@ -340,9 +340,9 @@
   updatedAt        DateTime        @updatedAt
   language         Language
   jobTitle         String?
   branch           String?
-  employmentInfo   EmploymentInfo? @relation(fields: [employmentInfoId])
+  employmentInfo   EmploymentInfo? @relation(fields: [employmentInfoId], references: [id])
   employmentInfoId String?
 }
 model EmploymentInfo {
@@ -356,21 +356,21 @@
 model VisibleCard {
   id                    String               @id @default(uuid())
   createdAt             DateTime             @default(now())
   updatedAt             DateTime             @updatedAt
-  info                  CardVisibilityStatus @default(PRIVATE)
+  info                  CardVisibilityStatus @default(PUBLIC)
   talentManagement      CardVisibilityStatus @default(PRIVATE)
   officialLanguage      CardVisibilityStatus @default(PRIVATE)
-  skills                CardVisibilityStatus @default(PRIVATE)
-  competencies          CardVisibilityStatus @default(PRIVATE)
-  developmentalGoals    CardVisibilityStatus @default(PRIVATE)
-  qualifiedPools        CardVisibilityStatus @default(PRIVATE)
-  description           CardVisibilityStatus @default(PRIVATE)
-  education             CardVisibilityStatus @default(PRIVATE)
-  experience            CardVisibilityStatus @default(PRIVATE)
+  skills                CardVisibilityStatus @default(PUBLIC)
+  competencies          CardVisibilityStatus @default(PUBLIC)
+  developmentalGoals    CardVisibilityStatus @default(PUBLIC)
+  qualifiedPools        CardVisibilityStatus @default(PUBLIC)
+  description           CardVisibilityStatus @default(PUBLIC)
+  education             CardVisibilityStatus @default(PUBLIC)
+  experience            CardVisibilityStatus @default(PUBLIC)
   careerInterests       CardVisibilityStatus @default(PRIVATE)
-  mentorshipSkills      CardVisibilityStatus @default(PRIVATE)
-  exFeeder              CardVisibilityStatus @default(PRIVATE)
+  mentorshipSkills      CardVisibilityStatus @default(PUBLIC)
+  exFeeder              CardVisibilityStatus @default(PUBLIC)
   employmentEquityGroup CardVisibilityStatus @default(PRIVATE)
   users                 User[]
 }
@@ -379,10 +379,10 @@
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   userId    String
   skillId   String
-  user      User     @relation(fields: [userId])
-  skill     OpSkill  @relation(fields: [skillId])
+  user      User     @relation(fields: [userId], references: [id])
+  skill     OpSkill  @relation(fields: [skillId], references: [id])
   @@unique([userId, skillId])
 }
@@ -391,10 +391,10 @@
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   userId    String
   skillId   String
-  user      User     @relation(fields: [userId])
-  skill     OpSkill  @relation(fields: [skillId])
+  user      User     @relation(fields: [userId], references: [id])
+  skill     OpSkill  @relation(fields: [skillId], references: [id])
   @@unique([userId, skillId])
 }
@@ -404,11 +404,11 @@
   updatedAt    DateTime      @updatedAt
   userId       String
   skillId      String?
   competencyId String?
-  user         User          @relation(fields: [userId])
-  skill        OpSkill?      @relation(fields: [skillId])
-  competency   OpCompetency? @relation(fields: [competencyId])
+  user         User          @relation(fields: [userId], references: [id])
+  skill        OpSkill?      @relation(fields: [skillId], references: [id])
+  competency   OpCompetency? @relation(fields: [competencyId], references: [id])
   @@unique([userId, skillId])
   @@unique([userId, competencyId])
 }
@@ -421,9 +421,9 @@
   classificationId       String
   jobTitle               String
   selectionProcessNumber String
   jobPosterLink          String
-  user                   User             @relation(fields: [userId])
+  user                   User             @relation(fields: [userId], references: [id])
   classification         OpClassification @relation("qualifiedPools", fields: [classificationId], references: [id])
 }
 model SecondLangProf {
@@ -434,9 +434,9 @@
   date               DateTime?
   unknownExpiredDate Boolean?         @default(false)
   proficiency        Proficiency
   level              ProficiencyLevel
-  user               User             @relation(fields: [userId])
+  user               User             @relation(fields: [userId], references: [id])
   @@unique([userId, proficiency])
 }
@@ -445,17 +445,17 @@
   createdAt        DateTime           @default(now())
   updatedAt        DateTime           @updatedAt
   userId           String
   organizationTier OrganizationTier[]
-  user             User               @relation(fields: [userId])
+  user             User               @relation(fields: [userId], references: [id])
 }
 model OrganizationTier {
   id             String              @id @default(uuid())
   createdAt      DateTime            @default(now())
   updatedAt      DateTime            @updatedAt
   tier           Int
-  organization   Organization?       @relation(fields: [organizationId])
+  organization   Organization?       @relation(fields: [organizationId], references: [id])
   translations   TransOrganization[]
   organizationId String?
 }
@@ -464,9 +464,9 @@
   createdAt          DateTime          @default(now())
   updatedAt          DateTime          @updatedAt
   language           Language
   description        String
-  organizationTier   OrganizationTier? @relation(fields: [organizationTierId])
+  organizationTier   OrganizationTier? @relation(fields: [organizationTierId], references: [id])
   organizationTierId String?
 }
 model Education {
@@ -480,11 +480,11 @@
   startDate       DateTime?
   ongoingDate     Boolean          @default(false)
   description     String?
   attachmentLinks AttachmentLink[]
-  user            User             @relation(fields: [userId])
-  school          OpSchool?        @relation(fields: [schoolId])
-  diploma         OpDiploma?       @relation(fields: [diplomaId])
+  user            User             @relation(fields: [userId], references: [id])
+  school          OpSchool?        @relation(fields: [schoolId], references: [id])
+  diploma         OpDiploma?       @relation(fields: [diplomaId], references: [id])
   @@unique([userId, schoolId, diplomaId, startDate])
 }
@@ -495,9 +495,9 @@
   language     Language
   description  String?
   jobTitle     String
   organization String
-  experience   Experience? @relation(fields: [experienceId])
+  experience   Experience? @relation(fields: [experienceId], references: [id])
   experienceId String?
 }
 model Experience {
@@ -510,19 +510,19 @@
   endDate         DateTime?
   ongoingDate     Boolean           @default(false)
   projects        String[]
   attachmentLinks AttachmentLink[]
-  user            User              @relation(fields: [userId])
+  user            User              @relation(fields: [userId], references: [id])
 }
 model RelocationLocation {
   id                   String               @id @default(uuid())
   createdAt            DateTime             @default(now())
   updatedAt            DateTime             @updatedAt
   relocationLocationId String
-  relocationLocation   OpRelocationLocation @relation(fields: [relocationLocationId])
+  relocationLocation   OpRelocationLocation @relation(fields: [relocationLocationId], references: [id])
   userId               String
-  user                 User                 @relation(fields: [userId])
+  user                 User                 @relation(fields: [userId], references: [id])
   @@unique([userId, relocationLocationId])
 }
@@ -553,9 +553,9 @@
   language  Language
   nameId    String
   url       String
-  name             OpAttachmentLinkName @relation(fields: [nameId])
+  name             OpAttachmentLinkName @relation(fields: [nameId], references: [id])
   AttachmentLink   AttachmentLink?      @relation(fields: [attachmentLinkId], references: [id])
   attachmentLinkId String?
 }
@@ -623,18 +623,18 @@
   interestedInRemote            Boolean?
   status                        UserStatus              @default(ACTIVE)
   signupStep                    Int                     @default(1)
   teams                         String[]
-  groupLevel                    OpClassification?       @relation(fields: [groupLevelId], name: "groupLevels")
-  actingLevel                   OpClassification?       @relation(fields: [actingLevelId], name: "actingLevels")
-  securityClearance             OpSecurityClearance?    @relation(fields: [securityClearanceId])
-  lookingJob                    OpLookingJob?           @relation(fields: [lookingJobId])
-  tenure                        OpTenure?               @relation(fields: [tenureId])
-  careerMobility                OpCareerMobility?       @relation(fields: [careerMobilityId])
-  employmentInfo                EmploymentInfo?         @relation(fields: [employmentInfoId])
-  talentMatrixResult            OpTalentMatrixResult?   @relation(fields: [talentMatrixResultId])
-  officeLocation                OpOfficeLocation?       @relation(fields: [officeLocationId])
-  visibleCards                  VisibleCard             @relation(fields: [visibleCardId])
+  groupLevel                    OpClassification?       @relation(fields: [groupLevelId], name: "groupLevels", references: [id])
+  actingLevel                   OpClassification?       @relation(fields: [actingLevelId], name: "actingLevels", references: [id])
+  securityClearance             OpSecurityClearance?    @relation(fields: [securityClearanceId], references: [id])
+  lookingJob                    OpLookingJob?           @relation(fields: [lookingJobId], references: [id])
+  tenure                        OpTenure?               @relation(fields: [tenureId], references: [id])
+  careerMobility                OpCareerMobility?       @relation(fields: [careerMobilityId], references: [id])
+  employmentInfo                EmploymentInfo?         @relation(fields: [employmentInfoId], references: [id])
+  talentMatrixResult            OpTalentMatrixResult?   @relation(fields: [talentMatrixResultId], references: [id])
+  officeLocation                OpOfficeLocation?       @relation(fields: [officeLocationId], references: [id])
+  visibleCards                  VisibleCard             @relation(fields: [visibleCardId], references: [id])
   mentorshipSkills              MentorshipSkill[]
   skills                        Skill[]
   developmentalGoals            DevelopmentalGoal[]
   developmentalGoalsAttachments AttachmentLink[]
@@ -647,7 +647,7 @@
   relocationLocations           RelocationLocation[]
   employmentEquityGroups        EmploymentEquityGroup[]
   bugsReported                  Bug[]
   connections                   User[]                  @relation("UserToUser")
-  user                          User?                   @relation("UserToUser", fields: [userId])
+  user                          User?                   @relation("UserToUser", fields: [userId], references: [id])
   userId                        String?
 }
```


