import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTypesAnimes() {
  const typesAnimesToCreate = [
    {
      id: 1,
      name: 'Seriado',
    },
    {
      id: 2,
      name: 'Filme',
    },
  ];

  const typesAnimesInLowerCase = typesAnimesToCreate.map((animesTypeData) => {
    return {
      ...animesTypeData,
      name: animesTypeData.name.toLowerCase(),
    };
  });

  for (const typesAnimesData of typesAnimesInLowerCase) {
    const existingTypesAnimes = await prisma.typesAnimes.findUnique({
      where: { id: typesAnimesData.id },
    });

    if (!existingTypesAnimes) {
      await prisma.typesAnimes.create({
        data: typesAnimesData,
      });
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
