import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { phone: "3001234567" },
    update: {},
    create: {
      id: 1,
      name: "Usuario Test",
      phone: "3001234567",
    },
  });
  console.log("Seed OK — usuario de prueba creado con id=1");

  await prisma.user.upsert({
    where: { phone: "3002222222" },
    update: {},
    create: { id: 2, name: "Usuario Ejecutor", phone: "3002222222" },
  });

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());