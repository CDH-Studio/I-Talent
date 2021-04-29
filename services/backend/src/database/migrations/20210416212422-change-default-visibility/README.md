# Migration `20210416212422-change-default-visibility`

This migration has been generated at 4/16/2021, 5:24:22 PM.
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
migration 20210212203417-add-pri..20210416212422-change-default-visibility
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
```


