# Migration `20200730152245-update-default-signupstep`

This migration has been generated at 7/30/2020, 3:22:45 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ALTER COLUMN "signupStep" SET DEFAULT 1;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200715152732-remove-managervisiblecard..20200730152245-update-default-signupstep
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
@@ -495,9 +495,9 @@
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


