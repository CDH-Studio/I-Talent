# Migration `20200709114724-experience-desc-optional`

This migration has been generated at 7/9/2020, 11:47:24 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."TransExperience" ALTER COLUMN "description" DROP NOT NULL;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200703104211-init..20200709114724-experience-desc-optional
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
@@ -433,9 +433,9 @@
   id           String      @default(uuid()) @id
   createdAt    DateTime    @default(now())
   updatedAt    DateTime    @updatedAt
   language     Language
-  description  String
+  description  String?
   jobTitle     String
   organization String
   experience   Experience? @relation(fields: [experienceId])
   experienceId String?
```


