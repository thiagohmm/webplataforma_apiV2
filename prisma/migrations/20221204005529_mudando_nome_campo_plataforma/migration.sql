/*
  Warnings:

  - You are about to drop the column `convidado_plataforma` on the `plataforma` table. All the data in the column will be lost.
  - Added the required column `private_plataforma` to the `plataforma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plataforma` DROP COLUMN `convidado_plataforma`,
    ADD COLUMN `private_plataforma` TINYINT NOT NULL;
