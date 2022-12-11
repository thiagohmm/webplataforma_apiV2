/*
  Warnings:

  - You are about to drop the column `active_plaforma` on the `plataforma` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `plataforma` DROP COLUMN `active_plaforma`,
    ADD COLUMN `active_plataforma` TINYINT NULL DEFAULT 1;
