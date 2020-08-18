# Migration `20200817143414-simplify-relocation-locations`

This migration has been generated at 8/17/2020, 10:34:14 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."RelocationLocation" DROP CONSTRAINT "RelocationLocation_locationId_fkey"

ALTER TABLE "public"."RelocationLocation" DROP CONSTRAINT "RelocationLocation_userId_fkey"

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
"userId" text   ,
PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "OpTransRelocationLocation.language_city_province_unique" ON "public"."OpTransRelocationLocation"("language","city","province")

ALTER TABLE "public"."OpTransRelocationLocation" ADD FOREIGN KEY ("opRelocationLocationId")REFERENCES "public"."OpRelocationLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpRelocationLocation" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

DROP TABLE "public"."RelocationLocation";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200810152146-optional-interested-in-remote..20200817143414-simplify-relocation-locations
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
@@ -292,8 +291,28 @@
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
@@ -321,8 +340,9 @@
   officialLanguage   CardVisibilityStatus @default(PRIVATE)
   skills             CardVisibilityStatus @default(PRIVATE)
   competencies       CardVisibilityStatus @default(PRIVATE)
   developmentalGoals CardVisibilityStatus @default(PRIVATE)
+  description        CardVisibilityStatus @default(PRIVATE)
   education          CardVisibilityStatus @default(PRIVATE)
   experience         CardVisibilityStatus @default(PRIVATE)
   projects           CardVisibilityStatus @default(PRIVATE)
   careerInterests    CardVisibilityStatus @default(PRIVATE)
@@ -412,19 +432,20 @@
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
@@ -450,20 +471,8 @@
   endDate      DateTime?
   user         User              @relation(fields: [userId])
 }
-model RelocationLocation {
-  id         String           @default(uuid()) @id
-  createdAt  DateTime         @default(now())
-  updatedAt  DateTime         @updatedAt
-  userId     String
-  locationId String
-  user       User             @relation(fields: [userId])
-  location   OpOfficeLocation @relation(fields: [locationId])
-
-  @@unique([userId, locationId])
-}
-
 model User {
   id                   String                @default(uuid()) @id
   createdAt            DateTime              @default(now())
   updatedAt            DateTime              @updatedAt
@@ -484,8 +493,9 @@
   email                String?
   telephone            String?
   cellphone            String?
   manager              String?
+  description          String?
   firstLanguage        Language?
   secondLanguage       Language?
   preferredLanguage    Language              @default(ENGLISH)
   actingStartDate      DateTime?
@@ -516,9 +526,9 @@
   secondLangProfs      SecondLangProf[]
   organizations        Organization[]
   educations           Education[]
   experiences          Experience[]
-  relocationLocations  RelocationLocation[]
+  relocationLocations  OpRelocationLocation[]
   connections          User[]
   user                 User?                 @relation("UserToUser", fields: [userId])
   userId               String?
 }
```


