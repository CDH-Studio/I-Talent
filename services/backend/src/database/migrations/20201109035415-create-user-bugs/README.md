# Migration `20201109035415-create-user-bugs`

This migration has been generated at 11/8/2020, 10:54:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."BugsStatus" AS ENUM ('UNRESOLVED', 'RESOLVED')

CREATE TYPE "public"."BugsLocation" AS ENUM ('HOME', 'PROFILE', 'SEARCH', 'FORMS')

CREATE TABLE "public"."Bugs" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"description" text   NOT NULL ,
"status" "BugsStatus"  NOT NULL DEFAULT E'UNRESOLVED',
"location" "BugsLocation"  NOT NULL ,
"appVersion" text   ,
"githubIssue" integer   ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Bugs" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201019154547-init..20201109035415-create-user-bugs
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
@@ -52,8 +52,20 @@
   DISABILITY
   MINORITY
 }
+enum BugsStatus {
+  UNRESOLVED
+  RESOLVED
+}
+
+enum BugsLocation {
+  HOME
+  PROFILE
+  SEARCH
+  FORMS
+}
+
 model OpTransSecurityClearance {
   id          String   @default(uuid()) @id
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
@@ -545,8 +557,22 @@
   User         User?       @relation(fields: [userId], references: [id])
   userId       String?
 }
+model Bugs {
+  id          String        @default(uuid()) @id
+  createdAt   DateTime      @default(now())
+  updatedAt   DateTime      @updatedAt
+
+  description String
+  status      BugsStatus    @default(UNRESOLVED)
+  location    BugsLocation
+  appVersion  String?
+  githubIssue Int?
+  user        User          @relation(fields: [userId], references: [id])
+  userId      String
+}
+
 model User {
   id                            String                  @default(uuid()) @id
   createdAt                     DateTime                @default(now())
   updatedAt                     DateTime                @updatedAt
@@ -602,8 +628,9 @@
   educations                    Education[]
   experiences                   Experience[]
   relocationLocations           RelocationLocation[]
   employmentEquityGroups        EmploymentEquityGroup[]
+  bugsReported                  Bugs[]
   connections                   User[]                  @relation("UserToUser")
   user                          User?                   @relation("UserToUser", fields: [userId])
   userId                        String?
 }
```


