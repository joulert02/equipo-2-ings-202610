import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Contraseña del usuario de desarrollo (tel. 3001234567). Documentada en README. */
const DEV_PASSWORD = "dev123456";

async function main() {
  const passwordHash = await bcrypt.hash(DEV_PASSWORD, 10);

  await prisma.user.upsert({
    where: { phone: "3001234567" },
    update: {
      name: "Usuario Test",
      passwordHash,
    },
    create: {
      id: 1,
      name: "Usuario Test",
      phone: "3001234567",
      passwordHash,
    },
  });
  console.log("Seed OK — usuario de prueba: tel 3001234567, contraseña en README");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
