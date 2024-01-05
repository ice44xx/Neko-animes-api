import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createEpisodes() {
  const episodesToCreate = [
    {
      id: 1,
      name: 'Piloto E-1',
      url: 'https://www.mp4upload.com/esmtykul4m7w',
      episodeOrder: 1,
      seasonId: 1,
    },
    {
      id: 2,
      name: 'Por mim mesmo E-2',
      url: 'https://www.mp4upload.com/im1hxki075gh',
      episodeOrder: 2,
      seasonId: 1,
    },
    {
      id: 3,
      name: 'Garota de aço E-3',
      url: 'https://www.mp4upload.com/0ajh7letbc45',
      episodeOrder: 3,
      seasonId: 1,
    },
    {
      id: 4,
      name: 'Morte ao feto E-4',
      url: 'https://www.mp4upload.com/0if7p72uxu6i',
      episodeOrder: 4,
      seasonId: 1,
    },
    {
      id: 5,
      name: 'Morte ao feto E-5  -2-',
      url: 'https://www.mp4upload.com/b3wptcux39wz',
      episodeOrder: 5,
      seasonId: 1,
    },
    {
      id: 6,
      name: 'Depois da chuva E-6',
      url: 'https://www.mp4upload.com/d5p06o6b9zcw',
      episodeOrder: 6,
      seasonId: 1,
    },
    {
      id: 7,
      name: 'Ataque E-7',
      url: 'https://www.mp4upload.com/zsdbmtfi1roc',
      episodeOrder: 7,
      seasonId: 1,
    },
    {
      id: 8,
      name: 'Tédio E-8',
      url: 'https://www.mp4upload.com/1f04e5phj1at',
      episodeOrder: 8,
      seasonId: 1,
    },
    {
      id: 9,
      name: 'Peixes Pequenos E-9',
      url: 'https://www.mp4upload.com/c69v63o8403c',
      episodeOrder: 9,
      seasonId: 1,
    },
    {
      id: 10,
      name: 'Transfiguração Inerte E-10',
      url: 'https://www.mp4upload.com/n80crher144w',
      episodeOrder: 10,
      seasonId: 1,
    },
    {
      id: 11,
      name: 'Mente Fechada E-11',
      url: 'https://www.mp4upload.com/0b440iuykml0',
      episodeOrder: 11,
      seasonId: 1,
    },
    {
      id: 12,
      name: 'Para você, em algum dia E-12',
      url: 'https://www.mp4upload.com/i0xysj2x5enj',
      episodeOrder: 12,
      seasonId: 1,
    },
    {
      id: 13,
      name: 'Inventário Oculto E-25',
      url: 'https://www.mp4upload.com/ks86iwzr34wy',
      episodeOrder: 1,
      seasonId: 2,
    },
    {
      id: 14,
      name: 'Inventário Oculto 2 E-26',
      url: 'https://www.mp4upload.com/lt67ngqe4t1m',
      episodeOrder: 2,
      seasonId: 2,
    },
  ];

  for (const episodesData of episodesToCreate) {
    const existingSeason = await prisma.seasons.findUnique({
      where: { id: episodesData.seasonId },
    });

    const existingEpisodes = await prisma.episodes.findMany({
      where: { name: episodesData.name },
    });

    if (existingSeason) {
      if (existingEpisodes.length === 0) {
        await prisma.episodes.create({
          data: {
            name: episodesData.name,
            url: episodesData.url,
            episodeOrder: episodesData.episodeOrder,
            seasons: {
              connect: {
                id: episodesData.seasonId,
              },
            },
          },
        });
      }
    }
  }
}

createEpisodes()
  .then(() => {
    console.log('Episódios gerados com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar os episódios:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
