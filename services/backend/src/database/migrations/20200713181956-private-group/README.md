# Migration `20200713181956-private-group`

This migration has been generated at 7/13/2020, 6:19:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "CardVisibilityStatus_new" AS ENUM ('PRIVATE', 'PUBLIC', 'GROUP');
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "careerInterests" DROP DEFAULT,
                        ALTER COLUMN "careerInterests" TYPE "CardVisibilityStatus_new" USING ("careerInterests"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "careerInterests" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "competencies" DROP DEFAULT,
                        ALTER COLUMN "competencies" TYPE "CardVisibilityStatus_new" USING ("competencies"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "competencies" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "developmentalGoals" DROP DEFAULT,
                        ALTER COLUMN "developmentalGoals" TYPE "CardVisibilityStatus_new" USING ("developmentalGoals"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "developmentalGoals" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "education" DROP DEFAULT,
                        ALTER COLUMN "education" TYPE "CardVisibilityStatus_new" USING ("education"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "education" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "exFeeder" DROP DEFAULT,
                        ALTER COLUMN "exFeeder" TYPE "CardVisibilityStatus_new" USING ("exFeeder"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "exFeeder" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "experience" DROP DEFAULT,
                        ALTER COLUMN "experience" TYPE "CardVisibilityStatus_new" USING ("experience"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "experience" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "info" DROP DEFAULT,
                        ALTER COLUMN "info" TYPE "CardVisibilityStatus_new" USING ("info"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "info" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "manager" DROP DEFAULT,
                        ALTER COLUMN "manager" TYPE "CardVisibilityStatus_new" USING ("manager"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "manager" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "mentorshipSkills" DROP DEFAULT,
                        ALTER COLUMN "mentorshipSkills" TYPE "CardVisibilityStatus_new" USING ("mentorshipSkills"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "mentorshipSkills" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "officialLanguage" DROP DEFAULT,
                        ALTER COLUMN "officialLanguage" TYPE "CardVisibilityStatus_new" USING ("officialLanguage"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "officialLanguage" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "projects" DROP DEFAULT,
                        ALTER COLUMN "projects" TYPE "CardVisibilityStatus_new" USING ("projects"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "projects" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "skills" DROP DEFAULT,
                        ALTER COLUMN "skills" TYPE "CardVisibilityStatus_new" USING ("skills"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "skills" SET DEFAULT 'PRIVATE';
ALTER TABLE "public"."VisibleCard" ALTER COLUMN "talentManagement" DROP DEFAULT,
                        ALTER COLUMN "talentManagement" TYPE "CardVisibilityStatus_new" USING ("talentManagement"::text::"CardVisibilityStatus_new"),
                        ALTER COLUMN "talentManagement" SET DEFAULT 'PRIVATE';
ALTER TYPE "CardVisibilityStatus" RENAME TO "CardVisibilityStatus_old";
ALTER TYPE "CardVisibilityStatus_new" RENAME TO "CardVisibilityStatus";
DROP TYPE "CardVisibilityStatus_old"

ALTER TABLE "public"."VisibleCard" ALTER COLUMN "careerInterests" SET DEFAULT E'PRIVATE',
ALTER COLUMN "competencies" SET DEFAULT E'PRIVATE',
ALTER COLUMN "developmentalGoals" SET DEFAULT E'PRIVATE',
ALTER COLUMN "education" SET DEFAULT E'PRIVATE',
ALTER COLUMN "exFeeder" SET DEFAULT E'PRIVATE',
ALTER COLUMN "experience" SET DEFAULT E'PRIVATE',
ALTER COLUMN "info" SET DEFAULT E'PRIVATE',
ALTER COLUMN "manager" SET DEFAULT E'PRIVATE',
ALTER COLUMN "mentorshipSkills" SET DEFAULT E'PRIVATE',
ALTER COLUMN "officialLanguage" SET DEFAULT E'PRIVATE',
ALTER COLUMN "projects" SET DEFAULT E'PRIVATE',
ALTER COLUMN "skills" SET DEFAULT E'PRIVATE',
ALTER COLUMN "talentManagement" SET DEFAULT E'PRIVATE';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200709114724-experience-desc-optional..20200713181956-private-group
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
@@ -41,9 +41,9 @@
 enum CardVisibilityStatus {
   PRIVATE
   PUBLIC
-  FRIENDS
+  GROUP
 }
 model OpTransSecurityClearance {
   id          String   @default(uuid()) @id
@@ -315,21 +315,21 @@
 model VisibleCard {
   id                 String               @default(uuid()) @id
   createdAt          DateTime             @default(now())
   updatedAt          DateTime             @updatedAt
-  info               CardVisibilityStatus @default(PUBLIC)
-  manager            CardVisibilityStatus @default(PUBLIC)
-  talentManagement   CardVisibilityStatus @default(PUBLIC)
-  officialLanguage   CardVisibilityStatus @default(PUBLIC)
-  skills             CardVisibilityStatus @default(PUBLIC)
-  competencies       CardVisibilityStatus @default(PUBLIC)
-  developmentalGoals CardVisibilityStatus @default(PUBLIC)
-  education          CardVisibilityStatus @default(PUBLIC)
-  experience         CardVisibilityStatus @default(PUBLIC)
-  projects           CardVisibilityStatus @default(PUBLIC)
-  careerInterests    CardVisibilityStatus @default(PUBLIC)
-  mentorshipSkills   CardVisibilityStatus @default(PUBLIC)
-  exFeeder           CardVisibilityStatus @default(PUBLIC)
+  info               CardVisibilityStatus @default(PRIVATE)
+  manager            CardVisibilityStatus @default(PRIVATE)
+  talentManagement   CardVisibilityStatus @default(PRIVATE)
+  officialLanguage   CardVisibilityStatus @default(PRIVATE)
+  skills             CardVisibilityStatus @default(PRIVATE)
+  competencies       CardVisibilityStatus @default(PRIVATE)
+  developmentalGoals CardVisibilityStatus @default(PRIVATE)
+  education          CardVisibilityStatus @default(PRIVATE)
+  experience         CardVisibilityStatus @default(PRIVATE)
+  projects           CardVisibilityStatus @default(PRIVATE)
+  careerInterests    CardVisibilityStatus @default(PRIVATE)
+  mentorshipSkills   CardVisibilityStatus @default(PRIVATE)
+  exFeeder           CardVisibilityStatus @default(PRIVATE)
   users              User[]
 }
 model MentorshipSkill {
@@ -518,8 +518,8 @@
   organizations        Organization[]
   educations           Education[]
   experiences          Experience[]
   relocationLocations  RelocationLocation[]
-  friends              User[]
+  privateGroup         User[]
   user                 User?                 @relation("UserToUser", fields: [userId])
   userId               String?
 }
```


