# Migration `20200813192343-add-unknown-expired-date-sec-lang-prof-col`

This migration has been generated at 8/13/2020, 3:23:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."SecondLangProf" ADD COLUMN "unknownExpiredDate" boolean  NOT NULL DEFAULT false;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200810152146-optional-interested-in-remote..20200813192343-add-unknown-expired-date-sec-lang-prof-col
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
@@ -321,8 +321,9 @@
   officialLanguage   CardVisibilityStatus @default(PRIVATE)
   skills             CardVisibilityStatus @default(PRIVATE)
   competencies       CardVisibilityStatus @default(PRIVATE)
   developmentalGoals CardVisibilityStatus @default(PRIVATE)
+  description        CardVisibilityStatus @default(PRIVATE)
   education          CardVisibilityStatus @default(PRIVATE)
   experience         CardVisibilityStatus @default(PRIVATE)
   projects           CardVisibilityStatus @default(PRIVATE)
   careerInterests    CardVisibilityStatus @default(PRIVATE)
@@ -370,16 +371,17 @@
   @@unique([userId, competencyId])
 }
 model SecondLangProf {
-  id          String           @default(uuid()) @id
-  createdAt   DateTime         @default(now())
-  updatedAt   DateTime         @updatedAt
-  userId      String
-  date        DateTime?
-  proficiency Proficiency
-  level       ProficiencyLevel
-  user        User             @relation(fields: [userId])
+  id                    String            @default(uuid()) @id
+  createdAt             DateTime          @default(now())
+  updatedAt             DateTime          @updatedAt
+  userId                String
+  date                  DateTime?
+  unknownExpiredDate    Boolean           @default(false)
+  proficiency           Proficiency
+  level                 ProficiencyLevel
+  user                  User              @relation(fields: [userId])
   @@unique([userId, proficiency])
 }
@@ -412,19 +414,20 @@
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
@@ -484,8 +487,9 @@
   email                String?
   telephone            String?
   cellphone            String?
   manager              String?
+  description          String?
   firstLanguage        Language?
   secondLanguage       Language?
   preferredLanguage    Language              @default(ENGLISH)
   actingStartDate      DateTime?
```


