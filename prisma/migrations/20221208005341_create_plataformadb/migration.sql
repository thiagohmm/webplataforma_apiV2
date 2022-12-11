-- AlterTable
ALTER TABLE `plataforma` MODIFY `active_plaforma` TINYINT NULL DEFAULT 1,
    MODIFY `inf_plataforma` VARCHAR(191) NULL DEFAULT '',
    MODIFY `private_plataforma` TINYINT NULL DEFAULT 0;
