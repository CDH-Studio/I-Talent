# Migration `20200820143832-simplify-relocation-locations`

This migration has been generated at 8/20/2020, 10:38:32 AM.
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
migration 20200810152146-optional-interested-in-remote..20200820143832-simplify-relocation-locations
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
@@ -164,9 +164,8 @@
   streetNumber        Int
   city                String
   country             String
   translations        OpTransOfficeLocation[]
-  relocationLocations RelocationLocation[]
   users               User[]
 }
 model OpClassification {
@@ -254,8 +253,10 @@
   @@unique([userId, competencyId])
 }
+
+
 model OpTransSchool {
   id         String    @default(uuid()) @id
   createdAt  DateTime  @default(now())
   updatedAt  DateTime  @updatedAt
@@ -292,8 +293,28 @@
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
@@ -321,8 +342,9 @@
   officialLanguage   CardVisibilityStatus @default(PRIVATE)
   skills             CardVisibilityStatus @default(PRIVATE)
   competencies       CardVisibilityStatus @default(PRIVATE)
   developmentalGoals CardVisibilityStatus @default(PRIVATE)
+  description        CardVisibilityStatus @default(PRIVATE)
   education          CardVisibilityStatus @default(PRIVATE)
   experience         CardVisibilityStatus @default(PRIVATE)
   projects           CardVisibilityStatus @default(PRIVATE)
   careerInterests    CardVisibilityStatus @default(PRIVATE)
@@ -412,19 +434,20 @@
   organizationTierId String?
 }
 model Education {
-  id        String     @default(uuid()) @id
-  createdAt DateTime   @default(now())
-  updatedAt DateTime   @updatedAt
-  userId    String
-  schoolId  String?
-  diplomaId String?
-  endDate   DateTime?
-  startDate DateTime
-  user      User       @relation(fields: [userId])
-  school    OpSchool?  @relation(fields: [schoolId])
-  diploma   OpDiploma? @relation(fields: [diplomaId])
+  id          String     @default(uuid()) @id
+  createdAt   DateTime   @default(now())
+  updatedAt   DateTime   @updatedAt
+  userId      String
+  schoolId    String?
+  diplomaId   String?
+  endDate     DateTime?
+  startDate   DateTime
+  description String?
+  user        User       @relation(fields: [userId])
+  school      OpSchool?  @relation(fields: [schoolId])
+  diploma     OpDiploma? @relation(fields: [diplomaId])
   @@unique([userId, schoolId, diplomaId, startDate])
 }
@@ -451,17 +474,17 @@
   user         User              @relation(fields: [userId])
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
 model User {
   id                   String                @default(uuid()) @id
@@ -484,8 +507,9 @@
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


