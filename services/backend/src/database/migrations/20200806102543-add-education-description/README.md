# Migration `20200806102543-add-education-description`

This migration has been generated at 8/6/2020, 10:25:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Education" ADD COLUMN "description" text   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200731103922-add-description-card..20200806102543-add-education-description
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
@@ -413,19 +413,20 @@
   organizationTierId String?
 }
 model Education {
-  id        String     @default(uuid()) @id
-  createdAt DateTime   @default(now())
-  updatedAt DateTime   @updatedAt
-  userId    String
-  schoolId  String?
-  diplomaId String?
-  endDate   DateTime?
-  startDate DateTime
-  user      User       @relation(fields: [userId])
-  school    OpSchool?  @relation(fields: [schoolId])
-  diploma   OpDiploma? @relation(fields: [diplomaId])
+  id          String     @default(uuid()) @id
+  createdAt   DateTime   @default(now())
+  updatedAt   DateTime   @updatedAt
+  userId      String
+  schoolId    String?
+  diplomaId   String?
+  endDate     DateTime?
+  startDate   DateTime
+  description String?
+  user        User       @relation(fields: [userId])
+  school      OpSchool?  @relation(fields: [schoolId])
+  diploma     OpDiploma? @relation(fields: [diplomaId])
   @@unique([userId, schoolId, diplomaId, startDate])
 }
@@ -497,9 +498,9 @@
   gcconnex             String?
   exFeeder             Boolean               @default(false)
   interestedInRemote   Boolean               @default(false)
   status               UserStatus            @default(ACTIVE)
-  signupStep           Int                   @default(0)
+  signupStep           Int                   @default(1)
   projects             String[]
   teams                String[]
   groupLevel           OpClassification?     @relation(fields: [groupLevelId], name: "groupLevels")
   actingLevel          OpClassification?     @relation(fields: [actingLevelId], name: "actingLevels")
```


