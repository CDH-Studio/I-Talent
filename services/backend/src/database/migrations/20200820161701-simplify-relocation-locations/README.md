# Migration `20200820161701-simplify-relocation-locations`

This migration has been generated at 8/20/2020, 12:17:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."RelocationLocation.userId_locationId_unique"

ALTER TABLE "public"."RelocationLocation" DROP CONSTRAINT "RelocationLocation_locationId_fkey"

CREATE TABLE "public"."OpTransRelocationLocation" (
"id" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"language" text  NOT NULL ,
"city" text  NOT NULL ,
"province" text  NOT NULL ,
"opRelocationLocationId" text   ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."OpRelocationLocation" (
"id" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."RelocationLocation" DROP COLUMN "locationId",
ADD COLUMN "relocationLocationId" text  NOT NULL ;

CREATE UNIQUE INDEX "OpTransRelocationLocation.language_city_province_unique" ON "public"."OpTransRelocationLocation"("language","city","province")

CREATE UNIQUE INDEX "RelocationLocation.userId_relocationLocationId_unique" ON "public"."RelocationLocation"("userId","relocationLocationId")

ALTER TABLE "public"."OpTransRelocationLocation" ADD FOREIGN KEY ("opRelocationLocationId")REFERENCES "public"."OpRelocationLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."RelocationLocation" ADD FOREIGN KEY ("relocationLocationId")REFERENCES "public"."OpRelocationLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200820133639-add-employment-equity-group..20200820161701-simplify-relocation-locations
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
@@ -172,9 +172,8 @@
   streetNumber        Int
   city                String
   country             String
   translations        OpTransOfficeLocation[]
-  relocationLocations RelocationLocation[]
   users               User[]
 }
 model OpClassification {
@@ -262,8 +261,10 @@
   @@unique([userId, competencyId])
 }
+
+
 model OpTransSchool {
   id         String    @default(uuid()) @id
   createdAt  DateTime  @default(now())
   updatedAt  DateTime  @updatedAt
@@ -300,8 +301,28 @@
   translations OpTransDiploma[]
   educations   Education[]
 }
+model OpTransRelocationLocation {
+  id                      String     @default(uuid()) @id
+  createdAt               DateTime   @default(now())
+  updatedAt               DateTime   @updatedAt
+  language                String
+  city                    String
+  province                String
+
+  @@unique([language, city, province])
+  opRelocationLocation    OpRelocationLocation?  @relation(fields: [opRelocationLocationId])
+  opRelocationLocationId  String?
+}
+
+model OpRelocationLocation {
+  id            String                      @default(uuid()) @id
+  createdAt     DateTime                    @default(now())
+  updatedAt     DateTime                    @updatedAt
+  translations  OpTransRelocationLocation[]
+}
+
 model TransEmploymentInfo {
   id               String          @default(uuid()) @id
   createdAt        DateTime        @default(now())
   updatedAt        DateTime        @updatedAt
@@ -465,17 +486,17 @@
   user            User              @relation(fields: [userId])
 }
 model RelocationLocation {
-  id         String           @default(uuid()) @id
-  createdAt  DateTime         @default(now())
-  updatedAt  DateTime         @updatedAt
-  userId     String
-  locationId String
-  user       User             @relation(fields: [userId])
-  location   OpOfficeLocation @relation(fields: [locationId])
+  id                      String                @default(uuid()) @id
+  createdAt               DateTime              @default(now())
+  updatedAt               DateTime              @updatedAt
+  relocationLocationId    String
+  relocationLocation      OpRelocationLocation  @relation(fields: [relocationLocationId])
+  userId                  String
+  user                    User                  @relation(fields: [userId])
-  @@unique([userId, locationId])
+  @@unique([userId, relocationLocationId ])
 }
 model OpTransAttachmentLinkName {
   id        String   @default(uuid()) @id
```


