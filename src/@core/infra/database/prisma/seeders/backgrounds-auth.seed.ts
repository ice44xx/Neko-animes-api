import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBackgroundsAuth() {
  const backgroundsAuthToAdd = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169360/Register%20e%20Login/3_v3asp4.webp',
      order: 1,
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169365/Register%20e%20Login/6_iojowm.webp',
      order: 2,
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169362/Register%20e%20Login/5_suzowx.webp',
      order: 3,
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169362/Register%20e%20Login/5_suzowx.webp',
      order: 4,
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169360/Register%20e%20Login/3_v3asp4.webp',
      order: 5,
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169365/Register%20e%20Login/1_wnbs7w.webp',
      order: 6,
    },
  ];

  for (const backgroundData of backgroundsAuthToAdd) {
    const existingBackground = await prisma.backgroundsAuth.findUnique({
      where: { id: backgroundData.id },
    });

    if (!existingBackground) {
      await prisma.backgroundsAuth.create({
        data: backgroundData,
      });
    }
  }
}

createBackgroundsAuth()
  .then(() => {
    console.log('Backgrounds de login e registro gerados com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar backgrounds:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
