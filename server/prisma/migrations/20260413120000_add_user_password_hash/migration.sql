-- AlterTable: add column nullable, backfill existing users, then NOT NULL
ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT;

-- Hash bcrypt de la contraseña de desarrollo dev123456 (misma que seed/README)
UPDATE "User" SET "passwordHash" = '$2a$10$QVkhkOJkWRhGNlYMSMdE1.hkT.xoG50tg8067IRW8Ldv9JcFxo2IW' WHERE "passwordHash" IS NULL;

ALTER TABLE "User" ALTER COLUMN "passwordHash" SET NOT NULL;
