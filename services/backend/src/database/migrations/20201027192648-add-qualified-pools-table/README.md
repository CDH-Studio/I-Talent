# Migration `20201027192648-add-qualified-pools-table`

This migration has been generated at 10/27/2020, 3:26:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."VisibleCard" ADD COLUMN "qualifiedPools" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE'

CREATE TABLE "public"."QualifiedPool" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"classificationId" text   ,
"jobTitle" text   ,
"selectionProcessNumber" text   ,
"jobPosterLink" text   ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."QualifiedPool" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."QualifiedPool" ADD FOREIGN KEY ("classificationId")REFERENCES "public"."OpClassification"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201019154547-init..20201027192648-add-qualified-pools-table
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
@@ -53,109 +53,109 @@
   MINORITY
 }
 model OpTransSecurityClearance {
-  id          String   @default(uuid()) @id
+  id          String   @id @default(uuid())
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  @@unique([language, description])
   opSecurityClearance   OpSecurityClearance? @relation(fields: [opSecurityClearanceId])
   opSecurityClearanceId String?
+  @@unique([language, description])
 }
 model OpSecurityClearance {
-  id           String                     @default(uuid()) @id
+  id           String                     @id @default(uuid())
   createdAt    DateTime                   @default(now())
   updatedAt    DateTime                   @updatedAt
   translations OpTransSecurityClearance[]
   users        User[]
 }
 model OpTransLookingJob {
-  id          String   @default(uuid()) @id
+  id          String   @id @default(uuid())
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  @@unique([language, description])
   opLookingJob   OpLookingJob? @relation(fields: [opLookingJobId])
   opLookingJobId String?
+  @@unique([language, description])
 }
 model OpLookingJob {
-  id           String              @default(uuid()) @id
+  id           String              @id @default(uuid())
   createdAt    DateTime            @default(now())
   updatedAt    DateTime            @updatedAt
   translations OpTransLookingJob[]
   users        User[]
 }
 model OpTransTenure {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  @@unique([language, name])
   opTenures  OpTenure? @relation(fields: [opTenureId])
   opTenureId String?
+  @@unique([language, name])
 }
 model OpTenure {
-  id           String          @default(uuid()) @id
+  id           String          @id @default(uuid())
   createdAt    DateTime        @default(now())
   updatedAt    DateTime        @updatedAt
   translations OpTransTenure[]
   users        User[]
 }
 model OpTransCareerMobility {
-  id          String   @default(uuid()) @id
+  id          String   @id @default(uuid())
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  @@unique([language, description])
   opCareerMobility   OpCareerMobility? @relation(fields: [opCareerMobilityId])
   opCareerMobilityId String?
+  @@unique([language, description])
 }
 model OpCareerMobility {
-  id           String                  @default(uuid()) @id
+  id           String                  @id @default(uuid())
   createdAt    DateTime                @default(now())
   updatedAt    DateTime                @updatedAt
   translations OpTransCareerMobility[]
   users        User[]
 }
 model OpTransTalentMatrixResult {
-  id          String   @default(uuid()) @id
+  id          String   @id @default(uuid())
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  @@unique([language, description])
   opTalentMatrixResult   OpTalentMatrixResult? @relation(fields: [opTalentMatrixResultId])
   opTalentMatrixResultId String?
+  @@unique([language, description])
 }
 model OpTalentMatrixResult {
-  id           String                      @default(uuid()) @id
+  id           String                      @id @default(uuid())
   createdAt    DateTime                    @default(now())
   updatedAt    DateTime                    @updatedAt
   translations OpTransTalentMatrixResult[]
   users        User[]
 }
 model OpTransOfficeLocation {
-  id                 String            @default(uuid()) @id
+  id                 String            @id @default(uuid())
   createdAt          DateTime          @default(now())
   updatedAt          DateTime          @updatedAt
   language           Language
   streetName         String
@@ -164,9 +164,9 @@
   opOfficeLocationId String?
 }
 model OpOfficeLocation {
-  id           String                  @default(uuid()) @id
+  id           String                  @id @default(uuid())
   createdAt    DateTime                @default(now())
   updatedAt    DateTime                @updatedAt
   postalCode   String
   streetNumber Int
@@ -176,30 +176,31 @@
   users        User[]
 }
 model OpClassification {
-  id               String   @default(uuid()) @id
-  createdAt        DateTime @default(now())
-  updatedAt        DateTime @updatedAt
-  name             String   @unique
-  actingLevelUsers User[]   @relation("actingLevels")
-  groupLevelUsers  User[]   @relation("groupLevels")
+  id               String          @id @default(uuid())
+  createdAt        DateTime        @default(now())
+  updatedAt        DateTime        @updatedAt
+  name             String          @unique
+  actingLevelUsers User[]          @relation("actingLevels")
+  groupLevelUsers  User[]          @relation("groupLevels")
+  qualifiedPools   QualifiedPool[] @relation("classifications")
 }
 model OpTransSkill {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  @@unique([language, name])
   opSkill   OpSkill? @relation(fields: [opSkillId])
   opSkillId String?
+  @@unique([language, name])
 }
 model OpSkill {
-  id                 String              @default(uuid()) @id
+  id                 String              @id @default(uuid())
   createdAt          DateTime            @default(now())
   updatedAt          DateTime            @updatedAt
   categoryId         String?
   translations       OpTransSkill[]
@@ -209,50 +210,50 @@
   developmentalGoals DevelopmentalGoal[]
 }
 model OpTransCategory {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  @@unique([language, name])
   opCategory   OpCategory? @relation(fields: [opCategoryId])
   opCategoryId String?
+  @@unique([language, name])
 }
 model OpCategory {
-  id           String            @default(uuid()) @id
+  id           String            @id @default(uuid())
   createdAt    DateTime          @default(now())
   updatedAt    DateTime          @updatedAt
   translations OpTransCategory[]
   opSkills     OpSkill[]
 }
 model OpTransCompetency {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  @@unique([language, name])
   opCompetency   OpCompetency? @relation(fields: [opCompetencyId])
   opCompetencyId String?
+  @@unique([language, name])
 }
 model OpCompetency {
-  id                 String              @default(uuid()) @id
+  id                 String              @id @default(uuid())
   createdAt          DateTime            @default(now())
   updatedAt          DateTime            @updatedAt
   translations       OpTransCompetency[]
   developmentalGoals DevelopmentalGoal[]
   competencies       Competency[]
 }
 model Competency {
-  id           String       @default(uuid()) @id
+  id           String       @id @default(uuid())
   createdAt    DateTime     @default(now())
   updatedAt    DateTime     @updatedAt
   userId       String
   competencyId String
@@ -262,9 +263,9 @@
   @@unique([userId, competencyId])
 }
 model OpTransSchool {
-  id         String    @default(uuid()) @id
+  id         String    @id @default(uuid())
   createdAt  DateTime  @default(now())
   updatedAt  DateTime  @updatedAt
   language   Language
   name       String
@@ -272,9 +273,9 @@
   opSchoolId String?
 }
 model OpSchool {
-  id           String          @default(uuid()) @id
+  id           String          @id @default(uuid())
   createdAt    DateTime        @default(now())
   updatedAt    DateTime        @updatedAt
   abbrProvince String
   abbrCountry  String
@@ -282,9 +283,9 @@
   educations   Education[]
 }
 model OpTransDiploma {
-  id          String     @default(uuid()) @id
+  id          String     @id @default(uuid())
   createdAt   DateTime   @default(now())
   updatedAt   DateTime   @updatedAt
   language    Language
   description String
@@ -292,38 +293,38 @@
   opDiplomaId String?
 }
 model OpDiploma {
-  id           String           @default(uuid()) @id
+  id           String           @id @default(uuid())
   createdAt    DateTime         @default(now())
   updatedAt    DateTime         @updatedAt
   translations OpTransDiploma[]
   educations   Education[]
 }
 model OpTransRelocationLocation {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  String
   city      String
   province  String
-  @@unique([language, city, province])
   opRelocationLocation   OpRelocationLocation? @relation(fields: [opRelocationLocationId])
   opRelocationLocationId String?
+  @@unique([language, city, province])
 }
 model OpRelocationLocation {
-  id                 String                      @default(uuid()) @id
+  id                 String                      @id @default(uuid())
   createdAt          DateTime                    @default(now())
   updatedAt          DateTime                    @updatedAt
   translations       OpTransRelocationLocation[]
   RelocationLocation RelocationLocation[]
 }
 model TransEmploymentInfo {
-  id               String          @default(uuid()) @id
+  id               String          @id @default(uuid())
   createdAt        DateTime        @default(now())
   updatedAt        DateTime        @updatedAt
   language         Language
   jobTitle         String?
@@ -332,25 +333,26 @@
   employmentInfoId String?
 }
 model EmploymentInfo {
-  id           String                @default(uuid()) @id
+  id           String                @id @default(uuid())
   createdAt    DateTime              @default(now())
   updatedAt    DateTime              @updatedAt
   translations TransEmploymentInfo[]
   users        User[]
 }
 model VisibleCard {
-  id                    String               @default(uuid()) @id
+  id                    String               @id @default(uuid())
   createdAt             DateTime             @default(now())
   updatedAt             DateTime             @updatedAt
   info                  CardVisibilityStatus @default(PRIVATE)
   talentManagement      CardVisibilityStatus @default(PRIVATE)
   officialLanguage      CardVisibilityStatus @default(PRIVATE)
   skills                CardVisibilityStatus @default(PRIVATE)
   competencies          CardVisibilityStatus @default(PRIVATE)
   developmentalGoals    CardVisibilityStatus @default(PRIVATE)
+  qualifiedPools        CardVisibilityStatus @default(PRIVATE)
   description           CardVisibilityStatus @default(PRIVATE)
   education             CardVisibilityStatus @default(PRIVATE)
   experience            CardVisibilityStatus @default(PRIVATE)
   careerInterests       CardVisibilityStatus @default(PRIVATE)
@@ -360,9 +362,9 @@
   users                 User[]
 }
 model MentorshipSkill {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   userId    String
   skillId   String
@@ -372,9 +374,9 @@
   @@unique([userId, skillId])
 }
 model Skill {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   userId    String
   skillId   String
@@ -384,9 +386,9 @@
   @@unique([userId, skillId])
 }
 model DevelopmentalGoal {
-  id           String        @default(uuid()) @id
+  id           String        @id @default(uuid())
   createdAt    DateTime      @default(now())
   updatedAt    DateTime      @updatedAt
   userId       String
   skillId      String?
@@ -398,10 +400,23 @@
   @@unique([userId, skillId])
   @@unique([userId, competencyId])
 }
+model QualifiedPool {
+  id                     String            @id @default(uuid())
+  createdAt              DateTime          @default(now())
+  updatedAt              DateTime          @updatedAt
+  userId                 String
+  classificationId       String?
+  jobTitle               String?
+  selectionProcessNumber String?
+  jobPosterLink          String?
+  user                   User              @relation(fields: [userId])
+  classification         OpClassification? @relation("classifications", fields: [classificationId], references: [id])
+}
+
 model SecondLangProf {
-  id                 String           @default(uuid()) @id
+  id                 String           @id @default(uuid())
   createdAt          DateTime         @default(now())
   updatedAt          DateTime         @updatedAt
   userId             String
   date               DateTime?
@@ -413,18 +428,18 @@
   @@unique([userId, proficiency])
 }
 model Organization {
-  id               String             @default(uuid()) @id
+  id               String             @id @default(uuid())
   createdAt        DateTime           @default(now())
   updatedAt        DateTime           @updatedAt
   userId           String
   organizationTier OrganizationTier[]
   user             User               @relation(fields: [userId])
 }
 model OrganizationTier {
-  id             String              @default(uuid()) @id
+  id             String              @id @default(uuid())
   createdAt      DateTime            @default(now())
   updatedAt      DateTime            @updatedAt
   tier           Int
   organization   Organization?       @relation(fields: [organizationId])
@@ -432,9 +447,9 @@
   organizationId String?
 }
 model TransOrganization {
-  id                 String            @default(uuid()) @id
+  id                 String            @id @default(uuid())
   createdAt          DateTime          @default(now())
   updatedAt          DateTime          @updatedAt
   language           Language
   description        String
@@ -442,9 +457,9 @@
   organizationTierId String?
 }
 model Education {
-  id              String           @default(uuid()) @id
+  id              String           @id @default(uuid())
   createdAt       DateTime         @default(now())
   updatedAt       DateTime         @updatedAt
   userId          String
   schoolId        String?
@@ -461,9 +476,9 @@
   @@unique([userId, schoolId, diplomaId, startDate])
 }
 model TransExperience {
-  id           String      @default(uuid()) @id
+  id           String      @id @default(uuid())
   createdAt    DateTime    @default(now())
   updatedAt    DateTime    @updatedAt
   language     Language
   description  String?
@@ -473,9 +488,9 @@
   experienceId String?
 }
 model Experience {
-  id              String            @default(uuid()) @id
+  id              String            @id @default(uuid())
   createdAt       DateTime          @default(now())
   updatedAt       DateTime          @updatedAt
   translations    TransExperience[]
   userId          String
@@ -487,9 +502,9 @@
   user            User              @relation(fields: [userId])
 }
 model RelocationLocation {
-  id                   String               @default(uuid()) @id
+  id                   String               @id @default(uuid())
   createdAt            DateTime             @default(now())
   updatedAt            DateTime             @updatedAt
   relocationLocationId String
   relocationLocation   OpRelocationLocation @relation(fields: [relocationLocationId])
@@ -499,9 +514,9 @@
   @@unique([userId, relocationLocationId])
 }
 model OpTransAttachmentLinkName {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
@@ -510,18 +525,18 @@
   opAttachmentLinkNameId String?
 }
 model OpAttachmentLinkName {
-  id                  String                      @default(uuid()) @id
+  id                  String                      @id @default(uuid())
   createdAt           DateTime                    @default(now())
   updatedAt           DateTime                    @updatedAt
   type                String
   translations        OpTransAttachmentLinkName[]
   TransAttachmentLink TransAttachmentLink[]
 }
 model TransAttachmentLink {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   nameId    String
@@ -532,9 +547,9 @@
   attachmentLinkId String?
 }
 model AttachmentLink {
-  id           String                @default(uuid()) @id
+  id           String                @id @default(uuid())
   createdAt    DateTime              @default(now())
   updatedAt    DateTime              @updatedAt
   translations TransAttachmentLink[]
@@ -546,9 +561,9 @@
   userId       String?
 }
 model User {
-  id                            String                  @default(uuid()) @id
+  id                            String                  @id @default(uuid())
   createdAt                     DateTime                @default(now())
   updatedAt                     DateTime                @updatedAt
   groupLevelId                  String?
   actingLevelId                 String?
@@ -595,8 +610,9 @@
   mentorshipSkills              MentorshipSkill[]
   skills                        Skill[]
   developmentalGoals            DevelopmentalGoal[]
   developmentalGoalsAttachments AttachmentLink[]
+  qualifiedPools                QualifiedPool[]
   competencies                  Competency[]
   secondLangProfs               SecondLangProf[]
   organizations                 Organization[]
   educations                    Education[]
```


