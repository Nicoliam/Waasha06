-- Add idempotencyKey for cash ledger (hardening: settlement and cash booking idempotency) — valid MySQL 8.0.46
ALTER TABLE `cash_ledger_entries` ADD COLUMN `idempotency_key` VARCHAR(191) NULL;
CREATE UNIQUE INDEX `cash_ledger_entries_idempotency_key_key` ON `cash_ledger_entries`(`idempotency_key`);
CREATE INDEX `cash_ledger_entries_idempotency_key_idx` ON `cash_ledger_entries`(`idempotency_key`);
