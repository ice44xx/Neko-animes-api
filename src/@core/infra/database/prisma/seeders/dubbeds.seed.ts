import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createDubbeds() {
  const dubbedsToCreate = [
    {
      id: 1,
      name: 'dub',
    },
    {
      id: 2,
      name: 'leg',
    },
  ];

  const dubbedsInLowerCase = dubbedsToCreate.map((dubbedData) => {
    return {
      ...dubbedData,
      name: dubbedData.name.toLowerCase(),
    };
  });

  for (const dubbedData of dubbedsInLowerCase) {
    const existingDubbed = await prisma.dubbeds.findUnique({
      where: { id: dubbedData.id },
    });

    if (!existingDubbed) {
      await prisma.dubbeds.create({
        data: dubbedData,
      });
    }
  }
}

createDubbeds()
  .then(() => {
    console.log('Dubbeds gerados com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar os dubbeds:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
