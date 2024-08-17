/*
  Warnings:

  - You are about to drop the `BaiViet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BinhLuan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DanhMuc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BaiViet` DROP FOREIGN KEY `BaiViet_id_danhmuc_fkey`;

-- DropForeignKey
ALTER TABLE `BaiViet` DROP FOREIGN KEY `BaiViet_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `BinhLuan` DROP FOREIGN KEY `BinhLuan_id_baiviet_fkey`;

-- DropTable
DROP TABLE `BaiViet`;

-- DropTable
DROP TABLE `BinhLuan`;

-- DropTable
DROP TABLE `DanhMuc`;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `view` INTEGER NOT NULL DEFAULT 0,
    `like` INTEGER NOT NULL DEFAULT 0,
    `slug` VARCHAR(191) NOT NULL,
    `id_category` INTEGER NULL,
    `id_user` VARCHAR(191) NULL,

    UNIQUE INDEX `Post_slug_key`(`slug`),
    FULLTEXT INDEX `Post_content_idx`(`content`),
    FULLTEXT INDEX `Post_content_title_idx`(`content`, `title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
