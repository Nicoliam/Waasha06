-- AlterTable
ALTER TABLE `business_units` ADD COLUMN `accept_cash` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `businesses` ADD COLUMN `accept_cash` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `payments` ADD COLUMN `commission_amount` DECIMAL(12, 2) NULL,
    ADD COLUMN `commission_rate` DECIMAL(5, 2) NULL;

-- AlterTable
ALTER TABLE `provider_profiles` ADD COLUMN `accept_cash` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `is_student` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `student_verification_status` ENUM('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED', 'SUSPENDED') NOT NULL DEFAULT 'UNVERIFIED';

-- CreateTable
CREATE TABLE `provider_cash_accounts` (
    `id` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `outstanding_commission` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `total_cash_gross` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `total_cash_commission` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `total_settled` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `provider_cash_accounts_provider_id_key`(`provider_id`),
    INDEX `provider_cash_accounts_provider_id_idx`(`provider_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cash_ledger_entries` (
    `id` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `booking_id` VARCHAR(191) NULL,
    `gross_amount` DECIMAL(12, 2) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `commission_rate` DECIMAL(5, 2) NOT NULL,
    `commission_amount` DECIMAL(12, 2) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'ZAR',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metadata` JSON NULL,

    UNIQUE INDEX `cash_ledger_entries_booking_id_key`(`booking_id`),
    INDEX `cash_ledger_entries_provider_id_idx`(`provider_id`),
    INDEX `cash_ledger_entries_booking_id_idx`(`booking_id`),
    INDEX `cash_ledger_entries_type_idx`(`type`),
    INDEX `cash_ledger_entries_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `business_units_accept_cash_idx` ON `business_units`(`accept_cash`);

-- CreateIndex
CREATE INDEX `businesses_accept_cash_idx` ON `businesses`(`accept_cash`);

-- CreateIndex
CREATE INDEX `provider_profiles_accept_cash_idx` ON `provider_profiles`(`accept_cash`);

-- CreateIndex
CREATE INDEX `provider_profiles_is_student_idx` ON `provider_profiles`(`is_student`);

-- AddForeignKey
ALTER TABLE `provider_cash_accounts` ADD CONSTRAINT `provider_cash_accounts_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `provider_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cash_ledger_entries` ADD CONSTRAINT `cash_ledger_entries_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `provider_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cash_ledger_entries` ADD CONSTRAINT `cash_ledger_entries_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
