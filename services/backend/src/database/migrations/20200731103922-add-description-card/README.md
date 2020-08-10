# Migration `20200731103922-add-description-card`

This migration has been generated at 7/31/2020, 10:39:22 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "description" text   ;

ALTER TABLE "public"."VisibleCard" ADD COLUMN "description" "CardVisibilityStatus" NOT NULL DEFAULT E'PRIVATE';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200715152732-remove-managervisiblecard..20200731103922-add-description-card
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
@@ -321,8 +321,9 @@
   officialLanguage   CardVisibilityStatus @default(PRIVATE)
   skills             CardVisibilityStatus @default(PRIVATE)
   competencies       CardVisibilityStatus @default(PRIVATE)
   developmentalGoals CardVisibilityStatus @default(PRIVATE)
+  description        CardVisibilityStatus @default(PRIVATE)
   education          CardVisibilityStatus @default(PRIVATE)
   experience         CardVisibilityStatus @default(PRIVATE)
   projects           CardVisibilityStatus @default(PRIVATE)
   careerInterests    CardVisibilityStatus @default(PRIVATE)
@@ -484,8 +485,9 @@
   email                String?
   telephone            String?
   cellphone            String?
   manager              String?
+  description          String?
   firstLanguage        Language?
   secondLanguage       Language?
   preferredLanguage    Language              @default(ENGLISH)
   actingStartDate      DateTime?
```


