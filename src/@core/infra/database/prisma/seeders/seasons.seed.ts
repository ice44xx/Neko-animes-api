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
    {
      name: 'Temporada 1 Spy x Family',
      order: 1,
      animeId: 5,
    },
    {
      name: 'Temporada 1 Overlord',
      order: 1,
      animeId: 7,
    },
    {
      name: 'Temporada 2 Overlord',
      order: 2,
      animeId: 7,
    },
    {
      name: 'Temporada 3 Overlord',
      order: 3,
      animeId: 7,
    },
    {
      name: 'Temporada 1 Chainsaw man',
      order: 1,
      animeId: 4,
    },
    {
      name: 'One Piece Film: Strong World',
      order: 1,
      animeId: 13,
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
