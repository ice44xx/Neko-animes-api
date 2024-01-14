import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createEpisodes() {
  const episodesToCreate = [
    {
      id: 1,
      name: 'Ou não ser 2B E-1',
      url: 'https://do0od.com/e/hgdceen7xj83',
      episodeOrder: 1,
      seasonId: 4,
    },
    {
      id: 2,
      name: 'Escapando da cidade E-2',
      url: 'https://do0od.com/e/tahwsqbhfkl1',
      episodeOrder: 2,
      seasonId: 4,
    },
    {
      id: 3,
      name: 'Tempo de descanso E-3',
      url: 'https://do0od.com/e/2u0crgtlg545',
      episodeOrder: 3,
      seasonId: 4,
    },
    {
      id: 4,
      name: 'Montanha alta E-4',
      url: 'https://do0od.com/e/23oe4z02kkqs',
      episodeOrder: 4,
      seasonId: 4,
    },
    {
      id: 5,
      name: 'Desvairado E-5',
      url: 'https://do0od.com/e/oi4z2k8o31sk',
      episodeOrder: 5,
      seasonId: 4,
    },
    {
      id: 6,
      name: 'Loba solitária E-6',
      url: 'https://do0od.com/e/211lfvsl0025',
      episodeOrder: 6,
      seasonId: 4,
    },
    {
      id: 7,
      name: 'Ações questionáveis E-7',
      url: 'https://do0od.com/e/hh3ieeai7h34',
      episodeOrder: 7,
      seasonId: 4,
    },
    {
      id: 8,
      name: 'Aji wo Kutta? E-8',
      url: 'https://do0od.com/e/1xhqw9pj0oti',
      episodeOrder: 8,
      seasonId: 4,
    },
    {
      id: 9,
      name: 'Gula por conhecimento E-9',
      url: 'https://do0od.com/e/kgha7qwjlzf0',
      episodeOrder: 9,
      seasonId: 4,
    },
    {
      id: 10,
      name: 'Excesso de zelo E-10',
      url: 'https://do0od.com/e/du6je0e4ueng',
      episodeOrder: 10,
      seasonId: 4,
    },
    {
      id: 11,
      name: 'Batalha inebriante E-11',
      url: 'https://do0od.com/e/4h6mcsl55t5n',
      episodeOrder: 11,
      seasonId: 4,
    },
    {
      id: 12,
      name: 'Flores para máquinas E-12',
      url: 'https://do0od.com/e/z252d1bauziq',
      episodeOrder: 12,
      seasonId: 4,
    },
    {
      id: 13,
      name: 'Músculos trabalhados E-1',
      url: 'https://do0od.com/e/7m4ex93ksdi5',
      episodeOrder: 1,
      seasonId: 3,
    },
    {
      id: 14,
      name: 'Labirinto esquisito E-2',
      url: 'https://do0od.com/e/3966knhivkg6',
      episodeOrder: 2,
      seasonId: 3,
    },
    {
      id: 15,
      name: 'É melhor não irritar E-3',
      url: 'https://do0od.com/e/mepscnbfxtjk',
      episodeOrder: 3,
      seasonId: 3,
    },
    {
      id: 16,
      name: 'O mago forte E-4',
      url: 'https://do0od.com/e/mtyay0h99va1',
      episodeOrder: 4,
      seasonId: 3,
    },
    {
      id: 17,
      name: 'O colega desprezado E-5',
      url: 'https://doodstream.com/e/6bpn5045kyhk',
      episodeOrder: 5,
      seasonId: 3,
    },
    {
      id: 18,
      name: 'O mago de ferro E-6',
      url: 'https://do0od.com/e/r18iflsbyqhj',
      episodeOrder: 6,
      seasonId: 3,
    },
    {
      id: 19,
      name: 'Carta misteriosa E-6.5',
      url: 'https://do0od.com/e/ppzi57n7e3g6',
      episodeOrder: 7,
      seasonId: 3,
    },
    {
      id: 20,
      name: 'Mago marionetista E-7',
      url: 'https://do0od.com/e/8b9orpoebej3',
      episodeOrder: 8,
      seasonId: 3,
    },
    {
      id: 21,
      name: 'Magos lobos E-8',
      url: 'https://do0od.com/e/ra5nxdn9o4qr',
      episodeOrder: 9,
      seasonId: 3,
    },
    {
      id: 22,
      name: 'Mago da aceleração E-9',
      url: 'https://do0od.com/e/36u36zi2h534',
      episodeOrder: 10,
      seasonId: 3,
    },
    {
      id: 23,
      name: 'Visionário divino E-10',
      url: 'https://do0od.com/e/fgmd4dqqnhlj',
      episodeOrder: 11,
      seasonId: 3,
    },
    {
      id: 24,
      name: 'Lei do mais forte E-11',
      url: 'https://do0od.com/e/9izc2kmpshem',
      episodeOrder: 12,
      seasonId: 3,
    },
    {
      id: 25,
      name: 'O espelho mágico E-12',
      url: 'https://do0od.com/e/r3v4og3ehx4a',
      episodeOrder: 13,
      seasonId: 3,
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
