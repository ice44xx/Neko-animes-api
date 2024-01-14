import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createSeasons() {
  const seasonsToCreate = [
    {
      name: 'Temporada 1 Jujutsu no Kaisen',
      order: 1,
      animeId: 1,
    },
    {
      name: 'Temporada 2 Jujutsu no Kaisen',
      order: 2,
      animeId: 1,
    },
    {
      name: 'Temporada 1 Mashle',
      order: 1,
      animeId: 9,
    },
    {
      name: 'Temporada 1 Nier',
      order: 1,
      animeId: 11,
    },
  ];

  for (const seasonData of seasonsToCreate) {
    const existingAnime = await prisma.animes.findUnique({
      where: { id: seasonData.animeId },
    });

    const existingSeason = await prisma.seasons.findMany({
      where: { name: seasonData.name },
    });

    if (existingAnime) {
      if (existingSeason.length === 0) {
        await prisma.seasons.create({
          data: {
            name: seasonData.name,
            order: seasonData.order,
            animeId: seasonData.animeId,
          },
        });
      }
    }
  }
}

createSeasons()
  .then(() => {
    console.log('Temporadas geradas com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar as temporadas:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
