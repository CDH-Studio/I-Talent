# Migration `20200810152146-optional-interested-in-remote`

This migration has been generated at 8/10/2020, 11:21:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ALTER COLUMN "interestedInRemote" DROP NOT NULL,
ALTER COLUMN "interestedInRemote" DROP DEFAULT;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200730152245-update-default-signupstep..20200810152146-optional-interested-in-remote
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
@@ -493,9 +493,9 @@
   linkedin             String?
   github               String?
   gcconnex             String?
   exFeeder             Boolean               @default(false)
-  interestedInRemote   Boolean               @default(false)
+  interestedInRemote   Boolean?
   status               UserStatus            @default(ACTIVE)
   signupStep           Int                   @default(1)
   projects             String[]
   teams                String[]
```


