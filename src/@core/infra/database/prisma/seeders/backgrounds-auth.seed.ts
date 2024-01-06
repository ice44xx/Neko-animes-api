import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBackgroundsAuth() {
  const backgroundsAuthToAdd = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704237205/Register%20e%20Login/register_four_smuagf.jpg',
      order: 1,
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704237204/Register%20e%20Login/register_two_jfpq0b.webp',
      order: 2,
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704237204/Register%20e%20Login/register_five_kp6qkj.jpg',
      order: 3,
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704237204/Register%20e%20Login/register_one_fbijsm.webp',
      order: 4,
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704237204/Register%20e%20Login/register_zwtrzq.webp',
      order: 5,
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704237204/Register%20e%20Login/register_third_pauqtx.webp',
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
