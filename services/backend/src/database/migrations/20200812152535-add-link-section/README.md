# Migration `20200812152535-add-link-section`

This migration has been generated at 8/12/2020, 11:25:35 AM.
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
migration 20200810152146-optional-interested-in-remote..20200812152535-add-link-section
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
@@ -412,19 +413,21 @@
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
@@ -440,16 +443,17 @@
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
@@ -462,8 +466,53 @@
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
@@ -484,8 +533,9 @@
   email                String?
   telephone            String?
   cellphone            String?
   manager              String?
+  description          String?
   firstLanguage        Language?
   secondLanguage       Language?
   preferredLanguage    Language              @default(ENGLISH)
   actingStartDate      DateTime?
@@ -517,8 +567,8 @@
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


