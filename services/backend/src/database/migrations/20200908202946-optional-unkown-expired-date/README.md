# Migration `20200908202946-optional-unkown-expired-date`

This migration has been generated at 9/8/2020, 4:29:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."SecondLangProf" ALTER COLUMN "unknownExpiredDate" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200821203314-add-project-to-experince..20200908202946-optional-unkown-expired-date
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
@@ -404,9 +404,9 @@
   createdAt          DateTime         @default(now())
   updatedAt          DateTime         @updatedAt
   userId             String
   date               DateTime?
-  unknownExpiredDate Boolean          @default(false)
+  unknownExpiredDate Boolean?         @default(false)
   proficiency        Proficiency
   level              ProficiencyLevel
   user               User             @relation(fields: [userId])
```


