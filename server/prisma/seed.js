import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Configuración de usuario de desarrollo desde .env */
const DEV_PHONE = process.env.SEED_USER_PHONE || "3001234567";
const DEV_PASSWORD = process.env.SEED_USER_PASSWORD || "dev123456";

async function main() {
  const passwordHash = await bcrypt.hash(DEV_PASSWORD, 10);
  const rozomanHash = await bcrypt.hash("Rozoman123", 10);

  const user1 = await prisma.user.upsert({
    where: { phone: DEV_PHONE },
    update: { name: "Usuario Test", passwordHash },
    create: { id: 1, name: "Usuario Test", phone: DEV_PHONE, passwordHash },
  });

  const user2 = await prisma.user.upsert({
    where: { phone: "3002222222" },
    update: { name: "Rozoman", passwordHash: rozomanHash },
    create: { name: "Rozoman", phone: "3002222222", passwordHash: rozomanHash },
  });

  // Clear existing favors to avoid duplicates on re-seed
  await prisma.favor.deleteMany({});

  const now = new Date();
  const future = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  await prisma.favor.createMany({
    data: [
      // AVAILABLE — user1 requests, no executor
      {
        title: "Llevar paquete a correos",
        description: "Necesito que lleven un paquete pequeño a la oficina de correos del centro.",
        location: "Centro, Bucaramanga",
        reward: 15000,
        status: "AVAILABLE",
        deadline: future,
        requesterId: user1.id,
      },
      // AVAILABLE — user2 requests, no executor
      {
        title: "Comprar medicamentos",
        description: "Comprar ibuprofeno y vitamina C en la farmacia más cercana.",
        location: "Cabecera, Bucaramanga",
        reward: 10000,
        status: "AVAILABLE",
        deadline: future,
        requesterId: user2.id,
      },
      // ACCEPTED — user1 requests, user2 executes
      {
        title: "Pasear al perro",
        description: "Pasear a mi golden retriever por el parque durante 30 minutos.",
        location: "Parque Santander, Bucaramanga",
        reward: 20000,
        status: "ACCEPTED",
        deadline: future,
        requesterId: user1.id,
        executorId: user2.id,
      },
      // ACCEPTED — user2 requests, user1 executes
      {
        title: "Recoger domicilio",
        description: "Recoger un domicilio de comida en el restaurante y traerlo al edificio.",
        location: "Zona Rosa, Bucaramanga",
        reward: 8000,
        status: "ACCEPTED",
        deadline: future,
        requesterId: user2.id,
        executorId: user1.id,
      },
      // COMPLETED — user1 requests, user2 executes
      {
        title: "Imprimir documentos",
        description: "Imprimir 10 hojas a color en el centro de copiado.",
        location: "UPB, Bucaramanga",
        reward: 5000,
        status: "COMPLETED",
        deadline: future,
        requesterId: user1.id,
        executorId: user2.id,
      },
      // CLOSED — user2 requests, user1 executes
      {
        title: "Ayuda con tarea de cálculo",
        description: "Explicar integrales por partes, sesión de 1 hora.",
        location: "Biblioteca UPB",
        reward: 30000,
        status: "CLOSED",
        deadline: future,
        requesterId: user2.id,
        executorId: user1.id,
      },
      // CANCELLED — user1 requests, no executor
      {
        title: "Mover muebles",
        description: "Ayuda para mover un sofá de la sala al cuarto.",
        location: "Floridablanca, Santander",
        reward: 25000,
        status: "CANCELLED",
        deadline: future,
        requesterId: user1.id,
      },
    ],
  });

  console.log(`Seed OK — usuarios: ${DEV_PHONE} / 3002222222, 7 favores creados (uno por estado)`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
