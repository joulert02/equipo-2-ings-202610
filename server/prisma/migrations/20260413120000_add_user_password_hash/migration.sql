-- AlterTable: add column nullable, backfill existing users, then NOT NULL
ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT;

-- Hash bcrypt de la contraseña de desarrollo (removido por seguridad, se maneja vía seed)
-- UPDATE "User" ... (datos quemados eliminados)

ALTER TABLE "User" ALTER COLUMN "passwordHash" SET NOT NULL;
