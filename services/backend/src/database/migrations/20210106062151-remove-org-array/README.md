# Migration `20210106062151-remove-org-array`

This migration has been generated at 1/6/2021, 1:21:51 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Organization_userId_unique" ON "Organization"("userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201112060647-add-qualified-pools-table..20210106062151-remove-org-array
--- datamodel.dml
+++ datamodel.dml
@@ -1,12 +1,11 @@
 generator client {
   provider = "prisma-client-js"
-  output   = "./client"
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model DbSeed {
   id        String   @id
@@ -640,9 +639,9 @@
   developmentalGoalsAttachments AttachmentLink[]
   qualifiedPools                QualifiedPool[]
   competencies                  Competency[]
   secondLangProfs               SecondLangProf[]
-  organizations                 Organization[]
+  organizations                 Organization?
   educations                    Education[]
   experiences                   Experience[]
   relocationLocations           RelocationLocation[]
   employmentEquityGroups        EmploymentEquityGroup[]
```


