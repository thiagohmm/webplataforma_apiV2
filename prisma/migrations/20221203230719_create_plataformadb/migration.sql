/*
  Warnings:

  - Added the required column `convidado_plataforma` to the `plataforma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plataforma` ADD COLUMN `convidado_plataforma` TINYINT NOT NULL;
