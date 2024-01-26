import { PrismaClient } from '@prisma/client';
import { createEpisodes } from './episodes.seed';

const prisma = new PrismaClient();

export async function createSeasons() {
  
  await createEpisodes()
  
  const seasonsToCreate = [
    {
      id: 1,
      name: 'Temporada 1 Jujutsu no Kaisen',
      order: 1,
      animeId: 1,
    },
    {
      id: 2,
      name: 'Temporada 2 Jujutsu no Kaisen',
      order: 2,
      animeId: 1,
    },
    {
      id: 3,
      name: 'Temporada 1 Mashle',
      order: 1,
      animeId: 9,
    },
    {
      id: 4,
      name: 'Temporada 1 Nier',
      order: 1,
      animeId: 11,
    },
    {
      id: 5,
      name: 'Temporada 1 Spy x Family',
      order: 1,
      animeId: 5,
    },
    {
      id: 6,
      name: 'Temporada 1 Overlord',
      order: 1,
      animeId: 7,
    },
    {
      id: 7,
      name: 'Temporada 2 Overlord',
      order: 2,
      animeId: 7,
    },
    {
      id: 8,
      name: 'Temporada 3 Overlord',
      order: 3,
      animeId: 7,
    },
    {
      id: 9,
      name: 'Temporada 1 Chainsaw man',
      order: 1,
      animeId: 4,
    },
    {
      id: 10,
      name: 'One Piece Film: Strong World',
      order: 1,
      animeId: 13,
    },
  ];

  for (const seasonData of seasonsToCreate) {
    const existingAnime = await prisma.animes.findUnique({
      where: { id: seasonData.animeId },
    });

    const existingSeason = await prisma.seasons.findUnique({
      where: { id: seasonData.id },
    });

    if (existingAnime) {
      if (!existingSeason) {
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
