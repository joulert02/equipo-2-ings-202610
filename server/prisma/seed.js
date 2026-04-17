import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Configuración de usuario de desarrollo desde .env */
const DEV_PHONE = process.env.SEED_USER_PHONE || "3001234567";
const DEV_PASSWORD = process.env.SEED_USER_PASSWORD || "dev123456";

async function main() {
  const passwordHash = await bcrypt.hash(DEV_PASSWORD, 10);

  await prisma.user.upsert({
    where: { phone: DEV_PHONE },
    update: {
      name: "Usuario Test",
      passwordHash,
    },
    create: {
      id: 1,
      name: "Usuario Test",
      phone: DEV_PHONE,
      passwordHash,
    },
  });
  console.log(`Seed OK — usuario de prueba: tel ${DEV_PHONE}, contraseña en .env`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
