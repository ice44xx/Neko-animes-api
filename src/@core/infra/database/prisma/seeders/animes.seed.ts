// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAnimes() {
  const animesToCreate = [
    {
      id: 1,
      name: 'Jujutsu no kaisen',
      synopsis:
        'Sofrimento, arrependimento, vergonha: os sentimentos negativos dos humanos tornam-se Maldições, causando terríveis acidentes que podem levar até mesmo à morte. E pra piorar, Maldições só podem ser exorcizadas por outras Maldições.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/jujutsu_aboouc_ehronz.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/jujutsu_bjtr4u.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['terror', 'aventura'],
      type: 'seriado',
      dubbed: 'leg',
      classificationName: 'seinen',
    },
    {
      id: 2,
      name: 'Konosuba',
      synopsis:
        'Após um acidente de trânsito, a breve e desapontadora vida de Kazuma Sato deveria ter acabado, mas ele acorda e vê uma belíssima garota diante dele. Ela diz ser Aqua, uma deusa, e lhe pergunta se ele gostaria de ir para outro mundo, levando consigo apenas uma coisa deste mundo.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/KonoSuba_erzgrt_ubbfcj.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/kono_fzph0b.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'comédia'],
      type: 'seriado',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 3,
      name: 'Dr.STONE',
      synopsis:
        'Maomao levava uma vida tranquila ao lado de seu pai, um boticário renomado. No entanto, sua vida muda da noite pro dia quando ela é vendida como uma simples serva no palácio do imperador.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133089/Thumbnails/Dr._Stone_c5ljk4_rgc0yc.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/drstone_bhm1xs.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['sci-fi', 'drama'],
      type: 'seriado',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 4,
      name: 'Chainsaw Man',
      synopsis:
        'Denji é um adolescente que mora com Pochita, o Demônio da Motosserra. Por conta das dívidas que herdou de seu pai, ele vive na miséria, exterminando outros demônios com Pochita para pagar as contas. Até que, um dia, Denji é traído e morre.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/Chainsaw_man_tndear_md6klt.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/chainsaw_ngu1qd.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['ação', 'terror'],
      type: 'seriado',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 5,
      name: 'SPY x FAMILY',
      synopsis:
        'Há décadas, as nações de Ostania e Westalis promovem uma guerra fria sem fim. Para investigar os movimentos do presidente de um importante partido político, Westalis mobiliza Twilight, seu melhor agente, a montar uma família falsa e se infiltrar nos eventos sociais promovidos pela escola do filho do político. ',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132962/Thumbnails/SpyxFamily_udjb16_r2h2io.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387481/Thumbnails/backgrounds/spy_m9luro.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['comédia', 'drama'],
      type: 'seriado',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 6,
      name: 'Oshi No Ko',
      synopsis:
        'Gorou Honda, um ginecologista de um hospital na zona rural do Japão, que é um grande fã da idol Ai Hoshino. Ele fica perplexo quando a artista pausa a carreira, e mais ainda quando ela aparece em seu local de trabalho, grávida.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132960/Thumbnails/Oshi_No_Ko_tkcp3i_bvnbri.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/oshi_xfgqgh.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['drama', 'aventura'],
      type: 'seriado',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 7,
      name: 'Overlord',
      synopsis:
        'Quando um MMORPG bastante popular anuncia que será desligado permanentemente, um jogador veterano se recusa a deslogar: Momonga. À medida que NPCs começam a desenvolver personalidades e mentes próprias, ele decide usar suas habilidades para se tornar o novo chefão do jogo.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132961/Thumbnails/Overlord_3_Temporada_faj9qm_fy4ksy.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/overlord_qxe9jz.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['ação', 'fantasia'],
      type: 'seriado',
      dubbed: 'dub',
      classificationName: 'shounen',
    },
    {
      id: 8,
      name: 'Boku No Hero',
      synopsis:
        'Por toda a sua vida, Izuku sonhou ser um heroi — um objetivo ambicioso para qualquer um, mas especialmente desafiador para um garoto sem superpoderes. Isso mesmo: em um mundo onde 80% da população tem algum tipo de Dom especial.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132960/Thumbnails/My_Hero_a_ct9h64_dbxlf6.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/boku_jdq1u2.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['ação', 'fantasia'],
      type: 'seriado',
      dubbed: 'dub',
      classificationName: 'shounen',
    },
    {
      id: 9,
      name: 'Mashle',
      synopsis:
        'Em um mundo onde todos são capazes de usar magia, há uma floresta densa e escura, onde um jovem treina sem parar. Seu nome é Mash Burnedead, e ele guarda um segredo: ele não sabe usar magia. ',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132959/Thumbnails/Mashle_illcy6_l2ladk.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/mashle_tvpc17.webp',
      feature: true,
      status: 'Completo',
      categoryNames: ['ação', 'fantasia'],
      type: 'seriado',
      dubbed: 'dub',
      classificationName: 'shounen',
    },
    {
      id: 10,
      name: 'Kaguya-Sama LOVE IS WAR',
      synopsis:
        'Todos os jovens de elite com futuros brilhantes acabam indo parar na Academia Shuchiin. E ambos os líderes do conselho estudantil, Kaguya Shinomiya e Miyuki Shirogane, estão apaixonados um pelo outro.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132957/Thumbnails/Kaguya-sama_zipp7i_cpl30v.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/kaguya_i0y0sr.webp',
      feature: true,
      status: 'Em lançamento',
      categoryNames: ['comédia', 'romance'],
      type: 'seriado',
      dubbed: 'leg',
      classificationName: 'seinen',
    },
    {
      id: 11,
      name: 'NieR:Automata Ver1.1a',
      synopsis:
        'O ano é 5012. Uma súbita invasão de aliens e seus Seres Vivos Mecânicos quase exterminam a humanidade por completo. Os poucos sobreviventes se refugiam na Lua, organizando um contra-ataque para retomar o planeta, mas chegam a um impasse por conta da capacidade infinita de multiplicação dos Seres Vivos Mecânicos.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132960/Thumbnails/NieR_Automata_psnrkw_jq3glx.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705193098/Thumbnails/backgrounds/nier-automata_ldgnm0.webp',
      feature: true,
      status: 'Completo',
      categoryNames: ['ação', 'drama', 'sci-fi'],
      type: 'seriado',
      dubbed: 'leg',
      classificationName: 'seinen',
    },
    {
      id: 12,
      name: 'One Piece Red',
      synopsis:
        'Com a Marinha assistindo de perto, o local se enche de fãs de Uta – incluindo piratas animados e os Chapéus de Palha liderados por Luffy, que vieram para curtir sua performance – todos aguardam ansiosamente a voz que o mundo inteiro estava esperando.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811790/Thumbnails/one_piece_red_r0mcmk.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/one_piece_red_c6rvrv.webp',
      feature: false,
      status: 'Completo',
      categoryNames: ['ação', 'aventura', 'comédia'],
      type: 'filme',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 13,
      name: 'One Piece Strong World',
      synopsis:
        'East Blue em crise? A notícia atinge os Piratas do Chapéu de Palha ao longo de sua jornada. Com suas cidades natais enfrentando um aperto, Luffy e seus amigos colocam suas aventuras em espera e decidem voltar para East Blue.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811791/Thumbnails/one_piece_strong_world_ij50do.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/one_piece_strong_loi0cj.webp',
      feature: false,
      status: 'Completo',
      categoryNames: ['ação', 'aventura', 'comédia'],
      type: 'filme',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 14,
      name: 'Suzume',
      synopsis:
        'Uma garota de 17 anos chamada Suzume descobre uma porta misteriosa nas montanhas, e logo outras começam a aparecer por todo o Japão. Quando abertas, elas trazem desastre e destruição, e apenas Suzume pode fechá-las novamente.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811790/Thumbnails/suzume_o1m6ie.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/suzume_mzbcjp.webp',
      feature: false,
      status: 'Completo',
      categoryNames: ['drama', 'aventura'],
      type: 'filme',
      dubbed: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 15,
      name: 'Jujutsu Kaisen 0',
      synopsis:
        'O jovem Yuta Okkotsu ganha o controle de um espírito extremamente poderoso, então um grupo de feiticeiros o matriculam na Tokyo Prefectural Jujutsu High School, para ajudá-lo a controlar esse poder e também para ficar de olho nele.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811790/Thumbnails/jujutsu_0_jlrlqd.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/jujutsu_0_uyouqx.webp',
      feature: false,
      status: 'Completo',
      categoryNames: ['ação', 'aventura', 'terror'],
      type: 'filme',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 16,
      name: 'Seishun Buta',
      synopsis:
        'A vida do estudante Sakuta Azusagawa tem uma reviravolta inesperada quando ele conhece a atriz adolescente Mai Sakurajima, vestida como uma coelhinha erótica e vagando por uma biblioteca sem ser notada por mais ninguém além de Sakuta.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811791/Thumbnails/seishan_buta_bqpo8w.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/seishaun_buta_hwrq5r.webp',
      feature: false,
      status: 'Completo',
      categoryNames: ['comédia', 'drama', 'romance'],
      type: 'filme',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 17,
      name: 'Sword Art Online: Ordinal Scale',
      synopsis:
        'Em um futuro próximo, uma batalha de máquinas altamente desenvolvidas está se delineando. O ano é 2026 e Augma, um novo dispositivo, acaba de ser criado para competir com o NerveGear e o Amusphere, seu sucessor.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811791/Thumbnails/sword_art_online_ordinal_scale_mc6jcf.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816917/Thumbnails/backgrounds/sword_xkbd6m.webp',
      feature: false,
      status: 'Completo',
      categoryNames: ['ação', 'fantasia'],
      type: 'filme',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 18,
      name: 'Ooyukiumi no Kaina',
      synopsis:
        'Kaina  é um garoto que vive em Tenmaku e acaba conhecendo Liliha, a princesa de um pequeno país do Grande Oceano de Neve. Os dois criam um laço, que precisará superar as diversidades e conflitos entre as duas raças.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811790/Thumbnails/ooyukiumi_no_kaina_lypbbw.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/ooyukiumi_qxtwla.webp',
      feature: false,
      status: 'Completo',
      categoryNames: ['fantasia', 'drama'],
      type: 'filme',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 19,
      name: 'Tensei Shitara Slime Datta Ken',
      synopsis:
        'Em Raja, um pequeno país localizado a oeste de Tempest. Rimuru e seus companheiros se envolvem em uma longa conspiração que gira em torno do misterioso poder da rainha.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811791/Thumbnails/tensei_shitara_o3emos.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/datta_ken_fhu4vx.webp',
      feature: false,
      status: 'Completo',
      categoryNames: ['fantasia', 'isekai', 'ecchi'],
      type: 'filme',
      dubbed: 'leg',
      classificationName: 'shounen',
    },
  ];

  for (const animeData of animesToCreate) {
    const existingAnime = await prisma.animes.findUnique({
      where: {
        id: animeData.id,
      },
    });

    if (!existingAnime) {
      const categories = animeData.categoryNames.map((categoryName) => ({
        where: { name: categoryName },
        create: { name: categoryName },
      }));
      try {
        await prisma.animes.create({
          data: {
            name: animeData.name,
            synopsis: animeData.synopsis,
            thumbnailUrl: animeData.thumbnailUrl,
            background: animeData.background,
            feature: animeData.feature,
            status: animeData.status,
            types: {
              connect: {
                name: animeData.type,
              },
            },
            dubbeds: {
              connect: {
                name: animeData.dubbed,
              },
            },
            classifications: {
              connect: {
                name: animeData.classificationName,
              },
            },
            categories: {
              connectOrCreate: categories,
            },
          },
        });
      } catch (error) {}
    }
  }
}

createAnimes()
  .then(() => {
    console.log('Animes gerados com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar os animes:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
