# Migration `20200921222051-optional-education-dates`

This migration has been generated at 9/21/2020, 6:20:51 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Education" ADD COLUMN "ongoingDate" boolean   NOT NULL DEFAULT false,
ALTER COLUMN "startDate" DROP NOT NULL

ALTER TABLE "public"."Experience" ADD COLUMN "ongoingDate" boolean   NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200911141617-developmental-goal-attachments..20200921222051-optional-education-dates
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
@@ -449,9 +449,10 @@
   userId          String
   schoolId        String?
   diplomaId       String?
   endDate         DateTime?
-  startDate       DateTime
+  startDate       DateTime?
+  ongoingDate     Boolean          @default(false)
   description     String?
   attachmentLinks AttachmentLink[]
   user            User             @relation(fields: [userId])
   school          OpSchool?        @relation(fields: [schoolId])
@@ -479,8 +480,9 @@
   translations    TransExperience[]
   userId          String
   startDate       DateTime
   endDate         DateTime?
+  ongoingDate     Boolean           @default(false)
   projects        String[]
   attachmentLinks AttachmentLink[]
   user            User              @relation(fields: [userId])
 }
```


