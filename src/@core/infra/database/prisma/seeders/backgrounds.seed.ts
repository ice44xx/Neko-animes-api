import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBackgrounds() {
  const backgroundsToAdd = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169155/Planos%20de%20fundo/one_pice_hoxcoa.webp',
      order: 1,
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169160/Planos%20de%20fundo/Apotec%C3%A1ria_qssbta.webp',
      order: 2,
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706169155/Planos%20de%20fundo/solo_lv_evxybn.webp',
      order: 3,
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706237889/Planos%20de%20fundo/Sem_T%C3%ADtulo-1-Recuperado_jwx4zf.webp',
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
