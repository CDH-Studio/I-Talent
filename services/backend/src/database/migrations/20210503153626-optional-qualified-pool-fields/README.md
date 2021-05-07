# Migration `20210503153626-optional-qualified-pool-fields`

This migration has been generated at 5/3/2021, 11:36:27 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "QualifiedPool" ALTER COLUMN "selectionProcessNumber" DROP NOT NULL,
ALTER COLUMN "jobPosterLink" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210416212422-change-default-visibility..20210503153626-optional-qualified-pool-fields
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
@@ -419,10 +419,10 @@
   updatedAt              DateTime         @updatedAt
   userId                 String
   classificationId       String
   jobTitle               String
-  selectionProcessNumber String
-  jobPosterLink          String
+  selectionProcessNumber String?
+  jobPosterLink          String?
   user                   User             @relation(fields: [userId])
   classification         OpClassification @relation("qualifiedPools", fields: [classificationId], references: [id])
 }
```


