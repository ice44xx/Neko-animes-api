import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBackgrounds() {
  const backgroundsToAdd = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690131720/Planos%20de%20fundo/cyber.webp',
      order: 1,
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690131720/Planos%20de%20fundo/demon.webp',
      order: 2,
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690131616/Planos%20de%20fundo/hashi.webp',
      order: 3,
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690131615/Planos%20de%20fundo/jujutsu.webp',
      order: 4,
    },
  ];

  for (const backgroundData of backgroundsToAdd) {
    const existingBackground = await prisma.backgrounds.findUnique({
      where: { id: backgroundData.id },
    });

    if (!existingBackground) {
      await prisma.backgrounds.create({
        data: backgroundData,
      });
    }
  }
}

createBackgrounds()
  .then(() => {
    console.log('Backgrounds gerados com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar backgrounds:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
