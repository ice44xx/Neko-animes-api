import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTypesAnimes() {
  const typesAnimesToCreate = [
    {
      id: 1,
      name: 'seriado',
    },
    {
      id: 2,
      name: 'filme',
    },
  ];

  for (const typesAnimesData of typesAnimesToCreate) {
    const existingTypesAnimes = await prisma.typesAnimes.findUnique({
      where: { name: typesAnimesData.name },
    });

    if (!existingTypesAnimes) {
      try {
        await prisma.typesAnimes.create({
          data: {
            name: typesAnimesData.name,
          },
        });
      } catch (error) {}
    }
  }
}

createTypesAnimes()
  .then(() => {
    console.log('Tipos gerados com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar os tipos:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
