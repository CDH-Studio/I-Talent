# Migration `20210510160332-remove-date-official-lang`

This migration has been generated at 5/10/2021, 12:03:32 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."SecondLangStatus" AS ENUM ('EXPIRED', 'VALID', 'UNKNOWN')

ALTER TABLE "SecondLangProf" DROP COLUMN "date",
DROP COLUMN "unknownExpiredDate",
ADD COLUMN     "status" "SecondLangStatus" DEFAULT E'UNKNOWN'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210507144114-remove-acting-date..20210510160332-remove-date-official-lang
--- datamodel.dml
+++ datamodel.dml
@@ -3,17 +3,23 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model DbSeed {
   id        String   @id
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
 }
+enum SecondLangStatus {
+  EXPIRED
+  VALID
+  UNKNOWN
+}
+
 enum Language {
   FRENCH
   ENGLISH
 }
@@ -426,17 +432,16 @@
   classification         OpClassification @relation("qualifiedPools", fields: [classificationId], references: [id])
 }
 model SecondLangProf {
-  id                 String           @id @default(uuid())
-  createdAt          DateTime         @default(now())
-  updatedAt          DateTime         @updatedAt
-  userId             String
-  date               DateTime?
-  unknownExpiredDate Boolean?         @default(false)
-  proficiency        Proficiency
-  level              ProficiencyLevel
-  user               User             @relation(fields: [userId], references: [id])
+  id          String            @id @default(uuid())
+  createdAt   DateTime          @default(now())
+  updatedAt   DateTime          @updatedAt
+  userId      String
+  status      SecondLangStatus? @default(UNKNOWN)
+  proficiency Proficiency
+  level       ProficiencyLevel
+  user        User              @relation(fields: [userId], references: [id])
   @@unique([userId, proficiency])
 }
```


