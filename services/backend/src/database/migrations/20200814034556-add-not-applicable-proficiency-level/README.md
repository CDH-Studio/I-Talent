# Migration `20200814034556-add-not-applicable-proficiency-level`

This migration has been generated at 8/13/2020, 11:45:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "ProficiencyLevel" ADD VALUE 'NA'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200813192343-add-unknown-expired-date-sec-lang-prof-col..20200814034556-add-not-applicable-proficiency-level
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
@@ -36,8 +36,9 @@
   B
   C
   E
   X
+  NA
 }
 enum CardVisibilityStatus {
   PRIVATE
```


