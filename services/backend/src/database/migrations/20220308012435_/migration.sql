-- DropForeignKey
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_userId_fkey";

-- DropForeignKey
ALTER TABLE "Competency" DROP CONSTRAINT "Competency_competencyId_fkey";

-- DropForeignKey
ALTER TABLE "Competency" DROP CONSTRAINT "Competency_userId_fkey";

-- DropForeignKey
ALTER TABLE "DevelopmentalGoal" DROP CONSTRAINT "DevelopmentalGoal_userId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_userId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- DropForeignKey
ALTER TABLE "MentorshipSkill" DROP CONSTRAINT "MentorshipSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "MentorshipSkill" DROP CONSTRAINT "MentorshipSkill_userId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_userId_fkey";

-- DropForeignKey
ALTER TABLE "QualifiedPool" DROP CONSTRAINT "QualifiedPool_classificationId_fkey";

-- DropForeignKey
ALTER TABLE "QualifiedPool" DROP CONSTRAINT "QualifiedPool_userId_fkey";

-- DropForeignKey
ALTER TABLE "RelocationLocation" DROP CONSTRAINT "RelocationLocation_relocationLocationId_fkey";

-- DropForeignKey
ALTER TABLE "RelocationLocation" DROP CONSTRAINT "RelocationLocation_userId_fkey";

-- DropForeignKey
ALTER TABLE "SecondLangProf" DROP CONSTRAINT "SecondLangProf_userId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_userId_fkey";

-- DropForeignKey
ALTER TABLE "TransAttachmentLink" DROP CONSTRAINT "TransAttachmentLink_nameId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_visibleCardId_fkey";

-- AddForeignKey
ALTER TABLE "Competency" ADD CONSTRAINT "Competency_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "OpCompetency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competency" ADD CONSTRAINT "Competency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipSkill" ADD CONSTRAINT "MentorshipSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "OpSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipSkill" ADD CONSTRAINT "MentorshipSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "OpSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevelopmentalGoal" ADD CONSTRAINT "DevelopmentalGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualifiedPool" ADD CONSTRAINT "QualifiedPool_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "OpClassification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualifiedPool" ADD CONSTRAINT "QualifiedPool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondLangProf" ADD CONSTRAINT "SecondLangProf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelocationLocation" ADD CONSTRAINT "RelocationLocation_relocationLocationId_fkey" FOREIGN KEY ("relocationLocationId") REFERENCES "OpRelocationLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelocationLocation" ADD CONSTRAINT "RelocationLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransAttachmentLink" ADD CONSTRAINT "TransAttachmentLink_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "OpAttachmentLinkName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_visibleCardId_fkey" FOREIGN KEY ("visibleCardId") REFERENCES "VisibleCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Competency.userId_competencyId_unique" RENAME TO "Competency_userId_competencyId_key";

-- RenameIndex
ALTER INDEX "DevelopmentalGoal.userId_competencyId_unique" RENAME TO "DevelopmentalGoal_userId_competencyId_key";

-- RenameIndex
ALTER INDEX "DevelopmentalGoal.userId_skillId_unique" RENAME TO "DevelopmentalGoal_userId_skillId_key";

-- RenameIndex
ALTER INDEX "Education.userId_schoolId_diplomaId_startDate_unique" RENAME TO "Education_userId_schoolId_diplomaId_startDate_key";

-- RenameIndex
ALTER INDEX "MentorshipSkill.userId_skillId_unique" RENAME TO "MentorshipSkill_userId_skillId_key";

-- RenameIndex
ALTER INDEX "OpClassification.name_unique" RENAME TO "OpClassification_name_key";

-- RenameIndex
ALTER INDEX "OpTransCareerMobility.language_description_unique" RENAME TO "OpTransCareerMobility_language_description_key";

-- RenameIndex
ALTER INDEX "OpTransCategory.language_name_unique" RENAME TO "OpTransCategory_language_name_key";

-- RenameIndex
ALTER INDEX "OpTransCompetency.language_name_unique" RENAME TO "OpTransCompetency_language_name_key";

-- RenameIndex
ALTER INDEX "OpTransLookingJob.language_description_unique" RENAME TO "OpTransLookingJob_language_description_key";

-- RenameIndex
ALTER INDEX "OpTransRelocationLocation.language_city_province_unique" RENAME TO "OpTransRelocationLocation_language_city_province_key";

-- RenameIndex
ALTER INDEX "OpTransSecurityClearance.language_description_unique" RENAME TO "OpTransSecurityClearance_language_description_key";

-- RenameIndex
ALTER INDEX "OpTransSkill.language_name_unique" RENAME TO "OpTransSkill_language_name_key";

-- RenameIndex
ALTER INDEX "OpTransTalentMatrixResult.language_description_unique" RENAME TO "OpTransTalentMatrixResult_language_description_key";

-- RenameIndex
ALTER INDEX "OpTransTenure.language_name_unique" RENAME TO "OpTransTenure_language_name_key";

-- RenameIndex
ALTER INDEX "Organization_userId_unique" RENAME TO "Organization_userId_key";

-- RenameIndex
ALTER INDEX "RelocationLocation.userId_relocationLocationId_unique" RENAME TO "RelocationLocation_userId_relocationLocationId_key";

-- RenameIndex
ALTER INDEX "SecondLangProf.userId_proficiency_unique" RENAME TO "SecondLangProf_userId_proficiency_key";

-- RenameIndex
ALTER INDEX "Skill.userId_skillId_unique" RENAME TO "Skill_userId_skillId_key";
