-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `passwd_user` VARCHAR(191) NOT NULL,
    `user_user` VARCHAR(191) NOT NULL,
    `email_user` VARCHAR(191) NOT NULL,
    `role_user` TINYINT NULL DEFAULT 0,
    `ativo_user` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_user_key`(`email_user`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` VARCHAR(191) NOT NULL,
    `hashedToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RefreshToken_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projetos` (
    `id_projeto` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_projeto` VARCHAR(191) NOT NULL,
    `private_projeto` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_projeto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plataforma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_plataforma` VARCHAR(191) NOT NULL,
    `alias_plataforma` VARCHAR(191) NOT NULL,
    `active_plaforma` TINYINT NOT NULL,
    `inf_plataforma` VARCHAR(191) NOT NULL DEFAULT '',
    `host_projt_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipamentos` (
    `id_equip` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_equip` VARCHAR(191) NOT NULL,
    `tipo_equip` VARCHAR(191) NOT NULL DEFAULT '',
    `local_equip` VARCHAR(191) NOT NULL DEFAULT '',
    `inf_equip` VARCHAR(191) NOT NULL DEFAULT '',
    `url_equip` VARCHAR(191) NOT NULL DEFAULT '',
    `equip_plat_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_equip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `node` (
    `id_node` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_node` VARCHAR(191) NOT NULL,
    `ssh_node` VARCHAR(191) NOT NULL,
    `vnc_node` VARCHAR(191) NOT NULL,
    `rdp_node` VARCHAR(191) NOT NULL,
    `router_node` VARCHAR(191) NOT NULL,
    `host_plat_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id_node`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plataforma` ADD CONSTRAINT `plataforma_host_projt_id_fkey` FOREIGN KEY (`host_projt_id`) REFERENCES `projetos`(`id_projeto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipamentos` ADD CONSTRAINT `equipamentos_equip_plat_id_fkey` FOREIGN KEY (`equip_plat_id`) REFERENCES `plataforma`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `node` ADD CONSTRAINT `node_host_plat_id_fkey` FOREIGN KEY (`host_plat_id`) REFERENCES `plataforma`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
