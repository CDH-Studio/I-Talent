# Migration `20200819173159-add-link-section`

This migration has been generated at 8/19/2020, 1:31:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."OpTransAttachmentLinkName" (
"id" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"language" "Language" NOT NULL ,
"name" text  NOT NULL ,
"opAttachmentLinkNameId" text   ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."OpAttachmentLinkName" (
"id" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"type" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."TransAttachmentLink" (
"id" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"language" "Language" NOT NULL ,
"nameId" text  NOT NULL ,
"url" text  NOT NULL ,
"attachmentLinkId" text   ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."AttachmentLink" (
"id" text  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
"experienceId" text   ,
"educationId" text   ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."OpTransAttachmentLinkName" ADD FOREIGN KEY ("opAttachmentLinkNameId")REFERENCES "public"."OpAttachmentLinkName"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransAttachmentLink" ADD FOREIGN KEY ("nameId")REFERENCES "public"."OpAttachmentLinkName"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."TransAttachmentLink" ADD FOREIGN KEY ("attachmentLinkId")REFERENCES "public"."AttachmentLink"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."AttachmentLink" ADD FOREIGN KEY ("experienceId")REFERENCES "public"."Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."AttachmentLink" ADD FOREIGN KEY ("educationId")REFERENCES "public"."Education"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200814034556-add-not-applicable-proficiency-level..20200819173159-add-link-section
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
@@ -415,20 +415,21 @@
   organizationTierId String?
 }
 model Education {
-  id          String     @default(uuid()) @id
-  createdAt   DateTime   @default(now())
-  updatedAt   DateTime   @updatedAt
-  userId      String
-  schoolId    String?
-  diplomaId   String?
-  endDate     DateTime?
-  startDate   DateTime
-  description String?
-  user        User       @relation(fields: [userId])
-  school      OpSchool?  @relation(fields: [schoolId])
-  diploma     OpDiploma? @relation(fields: [diplomaId])
+  id              String           @default(uuid()) @id
+  createdAt       DateTime         @default(now())
+  updatedAt       DateTime         @updatedAt
+  userId          String
+  schoolId        String?
+  diplomaId       String?
+  endDate         DateTime?
+  startDate       DateTime
+  description     String?
+  attachmentLinks AttachmentLink[]
+  user            User             @relation(fields: [userId])
+  school          OpSchool?        @relation(fields: [schoolId])
+  diploma         OpDiploma?       @relation(fields: [diplomaId])
   @@unique([userId, schoolId, diplomaId, startDate])
 }
@@ -444,16 +445,17 @@
   experienceId String?
 }
 model Experience {
-  id           String            @default(uuid()) @id
-  createdAt    DateTime          @default(now())
-  updatedAt    DateTime          @updatedAt
-  translations TransExperience[]
-  userId       String
-  startDate    DateTime
-  endDate      DateTime?
-  user         User              @relation(fields: [userId])
+  id              String            @default(uuid()) @id
+  createdAt       DateTime          @default(now())
+  updatedAt       DateTime          @updatedAt
+  translations    TransExperience[]
+  userId          String
+  startDate       DateTime
+  endDate         DateTime?
+  attachmentLinks AttachmentLink[]
+  user            User              @relation(fields: [userId])
 }
 model RelocationLocation {
   id         String           @default(uuid()) @id
@@ -466,8 +468,53 @@
   @@unique([userId, locationId])
 }
+model OpTransAttachmentLinkName {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  Language
+  name      String
+
+  OpAttachmentLinkName   OpAttachmentLinkName? @relation(fields: [opAttachmentLinkNameId], references: [id])
+  opAttachmentLinkNameId String?
+}
+
+model OpAttachmentLinkName {
+  id                  String                      @default(uuid()) @id
+  createdAt           DateTime                    @default(now())
+  updatedAt           DateTime                    @updatedAt
+  type                String
+  translations        OpTransAttachmentLinkName[]
+  TransAttachmentLink TransAttachmentLink[]
+}
+
+model TransAttachmentLink {
+  id        String   @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  language  Language
+  nameId    String
+  url       String
+
+  name             OpAttachmentLinkName @relation(fields: [nameId])
+  AttachmentLink   AttachmentLink?      @relation(fields: [attachmentLinkId], references: [id])
+  attachmentLinkId String?
+}
+
+model AttachmentLink {
+  id           String                @default(uuid()) @id
+  createdAt    DateTime              @default(now())
+  updatedAt    DateTime              @updatedAt
+  translations TransAttachmentLink[]
+
+  Experience   Experience? @relation(fields: [experienceId], references: [id])
+  experienceId String?
+  Education    Education?  @relation(fields: [educationId], references: [id])
+  educationId  String?
+}
+
 model User {
   id                   String                @default(uuid()) @id
   createdAt            DateTime              @default(now())
   updatedAt            DateTime              @updatedAt
@@ -522,8 +569,8 @@
   organizations        Organization[]
   educations           Education[]
   experiences          Experience[]
   relocationLocations  RelocationLocation[]
-  connections          User[]
+  connections          User[]                @relation("UserToUser")
   user                 User?                 @relation("UserToUser", fields: [userId])
   userId               String?
 }
```


