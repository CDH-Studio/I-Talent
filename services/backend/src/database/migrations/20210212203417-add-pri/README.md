# Migration `20210212203417-add-pri`

This migration has been generated at 2/12/2021, 3:34:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ADD COLUMN     "pri" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210106062151-remove-org-array..20210212203417-add-pri
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
@@ -607,8 +607,9 @@
   avatarColor                   String?
   email                         String?
   telephone                     String?
   cellphone                     String?
+  pri                           String?
   manager                       String?
   description                   String?
   firstLanguage                 Language?
   secondLanguage                Language?
```


