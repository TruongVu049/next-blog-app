-- CreateTable
CREATE TABLE `PostComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `content` VARCHAR(191) NOT NULL,
    `id_post` INTEGER NOT NULL,
    `id_parent` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostComment` ADD CONSTRAINT `PostComment_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
