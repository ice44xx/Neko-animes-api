import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBackgrounds() {
  await prisma.backgrounds.create({
    data: {
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690131720/Planos%20de%20fundo/cyber.webp',
      order: 1,
    },
  });

  await prisma.backgrounds.create({
    data: {
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690131720/Planos%20de%20fundo/demon.webp',
      order: 2,
    },
  });

  await prisma.backgrounds.create({
    data: {
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690131616/Planos%20de%20fundo/hashi.webp',
      order: 3,
    },
  });

  await prisma.backgrounds.create({
    data: {
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690131615/Planos%20de%20fundo/jujutsu.webp',
      order: 4,
    },
  });

  console.log('Backgrounds geradas.');
}

createBackgrounds()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
