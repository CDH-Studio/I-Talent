# Migration `20200715152732-remove-managervisiblecard`

This migration has been generated at 7/15/2020, 3:27:33 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."VisibleCard" DROP COLUMN "manager";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200713185642-connections..20200715152732-remove-managervisiblecard
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
@@ -316,9 +316,8 @@
   id                 String               @default(uuid()) @id
   createdAt          DateTime             @default(now())
   updatedAt          DateTime             @updatedAt
   info               CardVisibilityStatus @default(PRIVATE)
-  manager            CardVisibilityStatus @default(PRIVATE)
   talentManagement   CardVisibilityStatus @default(PRIVATE)
   officialLanguage   CardVisibilityStatus @default(PRIVATE)
   skills             CardVisibilityStatus @default(PRIVATE)
   competencies       CardVisibilityStatus @default(PRIVATE)
```


