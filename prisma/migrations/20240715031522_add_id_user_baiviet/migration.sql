-- AlterTable
ALTER TABLE `BaiViet` ADD COLUMN `id_user` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `BaiViet` ADD CONSTRAINT `BaiViet_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
