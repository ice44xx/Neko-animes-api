import { PrismaClient } from '@prisma/client';
import { createTypesAnimes } from './types.seed';
import { createDubbeds } from './dubbeds.seed';
import { createCategories } from './categories.seed';
import { createSeasons } from './seasons.seed';

const prisma = new PrismaClient();

export async function createAnimes() {
  await createTypesAnimes();
  await createDubbeds();
  await createCategories();

  const animesToCreate = [
    {
      id: 1,
      name: 'Jujutsu no kaisen',
      synopsis:
        'Sofrimento, arrependimento, vergonha: os sentimentos negativos dos humanos tornam-se Maldições, causando terríveis acidentes que podem levar até mesmo à morte. E pra piorar, Maldições só podem ser exorcizadas por outras Maldições.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/jujutsu_aboouc_ehronz.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/jujutsu_bjtr4u.webp',
      feature: true,
      year: '2023',
      status: 'Em lançamento',
      categoryNames: ['terror', 'aventura'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'seinen',
    },
    {
      id: 2,
      name: 'Konosuba',
      synopsis:
        'Após um acidente de trânsito, a breve e desapontadora vida de Kazuma Sato deveria ter acabado, mas ele acorda e vê uma belíssima garota diante dele. Ela diz ser Aqua, uma deusa, e lhe pergunta se ele gostaria de ir para outro mundo, levando consigo apenas uma coisa deste mundo.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/KonoSuba_erzgrt_ubbfcj.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/kono_fzph0b.webp',
      feature: true,
      year: '2019',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'comédia'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 3,
      name: 'Dr.STONE',
      synopsis:
        'Maomao levava uma vida tranquila ao lado de seu pai, um boticário renomado. No entanto, sua vida muda da noite pro dia quando ela é vendida como uma simples serva no palácio do imperador.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133089/Thumbnails/Dr._Stone_c5ljk4_rgc0yc.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/drstone_bhm1xs.webp',
      feature: true,
      year: '2021',
      status: 'Em lançamento',
      categoryNames: ['sci-fi', 'drama'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 4,
      name: 'Chainsaw Man',
      synopsis:
        'Denji é um adolescente que mora com Pochita, o Demônio da Motosserra. Por conta das dívidas que herdou de seu pai, ele vive na miséria, exterminando outros demônios com Pochita para pagar as contas. Até que, um dia, Denji é traído e morre.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/Chainsaw_man_tndear_md6klt.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/chainsaw_ngu1qd.webp',
      feature: true,
      year: '2022',
      status: 'Em lançamento',
      categoryNames: ['ação', 'terror'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 5,
      name: 'SPY x FAMILY',
      synopsis:
        'Há décadas, as nações de Ostania e Westalis promovem uma guerra fria sem fim. Para investigar os movimentos do presidente de um importante partido político, Westalis mobiliza Twilight, seu melhor agente, a montar uma família falsa e se infiltrar nos eventos sociais promovidos pela escola do filho do político. ',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132962/Thumbnails/SpyxFamily_udjb16_r2h2io.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387481/Thumbnails/backgrounds/spy_m9luro.webp',
      feature: true,
      year: '2022',
      status: 'Em lançamento',
      categoryNames: ['comédia', 'drama'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 6,
      name: 'Oshi No Ko',
      synopsis:
        'Gorou Honda, um ginecologista de um hospital na zona rural do Japão, que é um grande fã da idol Ai Hoshino. Ele fica perplexo quando a artista pausa a carreira, e mais ainda quando ela aparece em seu local de trabalho, grávida.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132960/Thumbnails/Oshi_No_Ko_tkcp3i_bvnbri.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/oshi_xfgqgh.webp',
      feature: true,
      year: '2023',
      status: 'Em lançamento',
      categoryNames: ['drama', 'aventura'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 7,
      name: 'Overlord',
      synopsis:
        'Quando um MMORPG bastante popular anuncia que será desligado permanentemente, um jogador veterano se recusa a deslogar: Momonga. À medida que NPCs começam a desenvolver personalidades e mentes próprias, ele decide usar suas habilidades para se tornar o novo chefão do jogo.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132961/Thumbnails/Overlord_3_Temporada_faj9qm_fy4ksy.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/overlord_qxe9jz.webp',
      feature: true,
      year: '2015',
      status: 'Em lançamento',
      categoryNames: ['ação', 'fantasia'],
      types: 'seriado',
      dubbeds: 'dub',
      classificationName: 'shounen',
    },
    {
      id: 8,
      name: 'Boku No Hero',
      synopsis:
        'Por toda a sua vida, Izuku sonhou ser um heroi — um objetivo ambicioso para qualquer um, mas especialmente desafiador para um garoto sem superpoderes. Isso mesmo: em um mundo onde 80% da população tem algum tipo de Dom especial.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132960/Thumbnails/My_Hero_a_ct9h64_dbxlf6.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/boku_jdq1u2.webp',
      feature: true,
      year: '2016',
      status: 'Em lançamento',
      categoryNames: ['ação', 'fantasia'],
      types: 'seriado',
      dubbeds: 'dub',
      classificationName: 'shounen',
    },
    {
      id: 9,
      name: 'Mashle',
      synopsis:
        'Em um mundo onde todos são capazes de usar magia, há uma floresta densa e escura, onde um jovem treina sem parar. Seu nome é Mash Burnedead, e ele guarda um segredo: ele não sabe usar magia. ',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132959/Thumbnails/Mashle_illcy6_l2ladk.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/mashle_tvpc17.webp',
      feature: true,
      year: '2023',
      status: 'Completo',
      categoryNames: ['ação', 'fantasia'],
      types: 'seriado',
      dubbeds: 'dub',
      classificationName: 'shounen',
    },
    {
      id: 10,
      name: 'Kaguya-Sama LOVE IS WAR',
      synopsis:
        'Todos os jovens de elite com futuros brilhantes acabam indo parar na Academia Shuchiin. E ambos os líderes do conselho estudantil, Kaguya Shinomiya e Miyuki Shirogane, estão apaixonados um pelo outro.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132957/Thumbnails/Kaguya-sama_zipp7i_cpl30v.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/kaguya_i0y0sr.webp',
      feature: true,
      year: '2019',
      status: 'Em lançamento',
      categoryNames: ['comédia', 'romance'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'seinen',
    },
    {
      id: 11,
      name: 'NieR:Automata Ver1.1a',
      synopsis:
        'O ano é 5012. Uma súbita invasão de aliens e seus Seres Vivos Mecânicos quase exterminam a humanidade por completo. Os poucos sobreviventes se refugiam na Lua, organizando um contra-ataque para retomar o planeta, mas chegam a um impasse por conta da capacidade infinita de multiplicação dos Seres Vivos Mecânicos.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132960/Thumbnails/NieR_Automata_psnrkw_jq3glx.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705193098/Thumbnails/backgrounds/nier-automata_ldgnm0.webp',
      feature: true,
      year: '2023',
      status: 'Completo',
      categoryNames: ['ação', 'drama', 'sci-fi'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'seinen',
    },
    {
      id: 12,
      name: 'One Piece Red',
      synopsis:
        'Com a Marinha assistindo de perto, o local se enche de fãs de Uta – incluindo piratas animados e os Chapéus de Palha liderados por Luffy, que vieram para curtir sua performance – todos aguardam ansiosamente a voz que o mundo inteiro estava esperando.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811790/Thumbnails/one_piece_red_r0mcmk.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/one_piece_red_c6rvrv.webp',
      feature: false,
      year: '2022',
      status: 'Completo',
      categoryNames: ['ação', 'aventura', 'comédia'],
      types: 'filme',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 13,
      name: 'One Piece Strong World',
      synopsis:
        'East Blue em crise? A notícia atinge os Piratas do Chapéu de Palha ao longo de sua jornada. Com suas cidades natais enfrentando um aperto, Luffy e seus amigos colocam suas aventuras em espera e decidem voltar para East Blue.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811791/Thumbnails/one_piece_strong_world_ij50do.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/one_piece_strong_loi0cj.webp',
      feature: false,
      year: '2009',
      status: 'Completo',
      categoryNames: ['ação', 'aventura', 'comédia'],
      types: 'filme',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 14,
      name: 'Suzume',
      synopsis:
        'Uma garota de 17 anos chamada Suzume descobre uma porta misteriosa nas montanhas, e logo outras começam a aparecer por todo o Japão. Quando abertas, elas trazem desastre e destruição, e apenas Suzume pode fechá-las novamente.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811790/Thumbnails/suzume_o1m6ie.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/suzume_mzbcjp.webp',
      feature: false,
      year: '2023',
      status: 'Completo',
      categoryNames: ['drama', 'aventura'],
      types: 'filme',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 15,
      name: 'Jujutsu Kaisen 0',
      synopsis:
        'O jovem Yuta Okkotsu ganha o controle de um espírito extremamente poderoso, então um grupo de feiticeiros o matriculam na Tokyo Prefectural Jujutsu High School, para ajudá-lo a controlar esse poder e também para ficar de olho nele.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811790/Thumbnails/jujutsu_0_jlrlqd.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/jujutsu_0_uyouqx.webp',
      feature: false,
      year: '2022',
      status: 'Completo',
      categoryNames: ['ação', 'aventura', 'terror'],
      types: 'filme',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 16,
      name: 'Seishun Buta',
      synopsis:
        'A vida do estudante Sakuta Azusagawa tem uma reviravolta inesperada quando ele conhece a atriz adolescente Mai Sakurajima, vestida como uma coelhinha erótica e vagando por uma biblioteca sem ser notada por mais ninguém além de Sakuta.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811791/Thumbnails/seishan_buta_bqpo8w.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/seishaun_buta_hwrq5r.webp',
      feature: false,
      year: '2019',
      status: 'Completo',
      categoryNames: ['comédia', 'drama', 'romance'],
      types: 'filme',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 17,
      name: 'Sword Art Online: Ordinal Scale',
      synopsis:
        'Em um futuro próximo, uma batalha de máquinas altamente desenvolvidas está se delineando. O ano é 2026 e Augma, um novo dispositivo, acaba de ser criado para competir com o NerveGear e o Amusphere, seu sucessor.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811791/Thumbnails/sword_art_online_ordinal_scale_mc6jcf.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816917/Thumbnails/backgrounds/sword_xkbd6m.webp',
      feature: false,
      year: '2017',
      status: 'Completo',
      categoryNames: ['ação', 'fantasia'],
      types: 'filme',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 18,
      name: 'Ooyukiumi no Kaina',
      synopsis:
        'Kaina  é um garoto que vive em Tenmaku e acaba conhecendo Liliha, a princesa de um pequeno país do Grande Oceano de Neve. Os dois criam um laço, que precisará superar as diversidades e conflitos entre as duas raças.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811790/Thumbnails/ooyukiumi_no_kaina_lypbbw.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/ooyukiumi_qxtwla.webp',
      feature: false,
      year: '2023',
      status: 'Completo',
      categoryNames: ['fantasia', 'drama'],
      types: 'filme',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 19,
      name: 'Tensei Shitara Slime Datta Ken',
      synopsis:
        'Em Raja, um pequeno país localizado a oeste de Tempest. Rimuru e seus companheiros se envolvem em uma longa conspiração que gira em torno do misterioso poder da rainha.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705811791/Thumbnails/tensei_shitara_o3emos.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705816916/Thumbnails/backgrounds/datta_ken_fhu4vx.webp',
      feature: false,
      year: '2023',
      status: 'Completo',
      categoryNames: ['fantasia', 'isekai', 'ecchi'],
      types: 'filme',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 20,
      name: 'Undead Unluck',
      synopsis:
        'Fuuko Izumo, afligida por causar má sorte a quem toca nela, decide se suicidar. No momento crítico, um estranho chamado Andy, que também deseja a morte, a toca, mas ele é imortal. Juntos, buscam uma morte digna, porém uma organização misteriosa quer explorar suas habilidades.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705977539/Thumbnails/Undead_Unluck_jkp9hw.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705977136/Thumbnails/backgrounds/Undead_Unluck_hazrxn.webp',
      feature: true,
      year: '2023',
      status: 'Em lançamento',
      categoryNames: ['sobrenatural', 'ação', 'comédia', 'aventura'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 21,
      name: 'Kusuriya no Hitorigoto',
      synopsis:
        'Maomao levava uma vida tranquila ao lado de seu pai, um boticário renomado. No entanto, sua vida muda da noite pro dia quando ela é vendida como uma simples serva no palácio do imperador. ',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705977224/Thumbnails/apotecaria_psm8t7.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705977239/Thumbnails/backgrounds/Diario_de_uma_apotec%C3%A1ria_r6atgu.webp',
      feature: true,
      year: '2023',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'drama', 'suspense', 'romance'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 22,
      name: 'Doctor Elise: The Royal Lady with the Lamp',
      synopsis:
        'Compensando pelos pecados de sua vida passada como a imperatriz malvada Elise, Aoi Takamoto agora dedica sua vida a salvar pessoas como uma médica. No entanto, um acidente fatal interrompe sua nova vida e, de repente, ela volta à sua vida anterior, 10 anos antes de sua morte!',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705984354/Thumbnails/Doctor_Elise_harkd1.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990927/Thumbnails/backgrounds/Doctor_Elise_ipxako.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'isekai', 'romance'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 23,
      name: 'Akuyaku Reijou Level 99: Watashi wa Ura-Boss desu ga Maou dewa Arimasen',
      synopsis:
        'Essa estudante universitária só quer uma vida tranquila. Então, quando renasce como Yumiella, a vilã oculta de um jogo otome, ela não fica muito empolgada… Ainda ansiando por paz, ela abandona suas tarefas malignas para viver uma vida mais discreta e tranquila.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705977084/Thumbnails/Villainess_lv_99_amct5k.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990924/Thumbnails/backgrounds/Akuyaku_Reijou_Level_99_vodvjt.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'isekai', 'romance'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 24,
      name: 'A Sign of Affection',
      synopsis:
        'Yuki, uma estudante universitária surda, certo dia está passando por dificuldades quando um veterano de sua escola, Itsuomi, decide ajudá-la.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705976818/Thumbnails/A_singn_of_affection_lp2hkg.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990924/Thumbnails/backgrounds/Yubisaki_to_Renren_ka9ua5.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['romance', 'drama', 'slice of life'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 25,
      name: 'Fluffy Paradise',
      synopsis:
        'Morta por excesso de trabalho aos 27 anos... Midori sequer teve tempo de lamentar sua morte quando um deus apareceu diante dela e a avisou que reencarnaria em outro mundo e precisaria lhe dizer se ela acha que humanos mereciam seguir vivendo.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705976983/Thumbnails/Fluffy_Paradise._cpmdvh.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705977056/Thumbnails/backgrounds/Fluffy_Paradise_fyu1fl.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'isekai', 'slice of life'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 26,
      name: 'Yamada kun to Lv999 no Koi wo Suru',
      synopsis:
        'Akane Kinoshita pegou seu namorado tendo um caso com uma garota de um jogo online e ficou completamente arrasada. Ela tenta desestressar matando uns bichos no jogo, e acaba desabafando sobre seu caso com Yamada, um jogador de sua guilda ',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132964/Thumbnails/Yamada-Kun_irbwbh_ikvg6y.webp',
      background: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706326155/Thumbnails/backgrounds/yamada_kun_999_bgj4k5.webp',
      feature: false,
      year: '2023',
      status: 'Completo',
      categoryNames: ['romance', 'comédia'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 27,
      name: 'Loop 7-kaime no Akuyaku Reijou wa, Moto Tekikoku de Jiyuu Kimama na Hanayome Seikatsu wo Mankitsu suru',
      synopsis:
        'Rishe Irmgard Weitzner, filha de um duque, morreu aos 20 anos e retornou a um momento cinco anos antes, quando seu noivado foi desfeito. Ela já viveu esse loop temporal seis vezes, e viveu esses cinco anos diferentes todas as vezes. Agora, em sua sétima chance, ela está determinada a viver até a terceira ridade e passá-la relaxando.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705984355/Thumbnails/Loop_7-kaime_no_Akuyaku_Reijou_wa_Moto_Tekikoku_de_Jiyuu_Kimama_na_Hanayome_Seikatsu_wo_Mankitsu_suru_ibw6pq.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990928/Thumbnails/backgrounds/Loop_7-kaime_no_Akuyaku_Reijou_wa_Moto_Tekikoku_de_Jiyuu_Kimama_na_Hanayome_Seikatsu_wo_Mankitsu_suru_y6uogz.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'romance', 'aventura'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 28,
      name: 'Suki na Ko ga Megane wo Wasureta',
      synopsis: 'Uma comédia romântica muito agradável sobre um garoto que só tem olhos para a garota que sempre esquece seus óculos!',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132962/Thumbnails/Suki_na_Ko_ga_Megane_wo_Wasureta_b06kf5_cas0jz.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705977044/Thumbnails/backgrounds/Suki_na_Ko_ga_Megane_wo_Wasureta_zhzqgx.webp',
      feature: false,
      year: '2023',
      status: 'Completo',
      categoryNames: ['romance', 'comédia', 'drama'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 29,
      name: 'Kyuujitsu no Warumono-san',
      synopsis:
        'Em busca de aliviar sua alma cansada de tantos dias intensos de trabalho, ele decide visitar o zoológico para ver pandas e ir numa loja de conveniência para saborear um sorvete. Acompanhe como esse vilão aproveita ao máximo seus dias de folga, em uma comédia que vai alegrar sua alma!',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705984355/Thumbnails/Kyuujitsu_no_Warumono-san_ewhmaf.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990926/Thumbnails/backgrounds/Kyuujitsu_no_Warumono-san_fgkqyl.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'isekai', 'comédia'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'kodomo',
    },
    {
      id: 30,
      name: 'Watashi no Shiawase na Kekkon',
      synopsis:
        'Miyo Saimori, filha infeliz de um casamento sem amor, tornou-se uma serva após a chegada da amante de seu pai e sua filha, Kaya. Seu destino era um casamento arranjado com Kiyoka Kudou, um capitão militar temido. Contrariando expectativas, Kiyoka se revela surpreendentemente bondoso, transformando as perspectivas dolorosas de Miyo em um futuro promissor.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132963/Thumbnails/Watashi_no_Shiawase_na_Kekkon_ehkinj_vmxqgz.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1706351942/Thumbnails/backgrounds/Watashi_no_Shiawase_na_Kekkon_kkwsul.webp',
      feature: false,
      year: '2023',
      status: 'Completo',
      categoryNames: ['fantasia', 'romance', 'drama'],
      types: 'seriado',
      dubbeds: 'dub',
      classificationName: 'shoujo',
    },
    {
      id: 31,
      name: 'Watashi no Shiawase na Kekkon',
      synopsis:
        'Miyo Saimori, filha infeliz de um casamento sem amor, tornou-se uma serva após a chegada da amante de seu pai e sua filha, Kaya. Seu destino era um casamento arranjado com Kiyoka Kudou, um capitão militar temido. Contrariando expectativas, Kiyoka se revela surpreendentemente bondoso, transformando as perspectivas dolorosas de Miyo em um futuro promissor.',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132963/Thumbnails/Watashi_no_Shiawase_na_Kekkon_ehkinj_vmxqgz.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1706351942/Thumbnails/backgrounds/Watashi_no_Shiawase_na_Kekkon_kkwsul.webp',
      feature: false,
      year: '2023',
      status: 'Completo',
      categoryNames: ['fantasia', 'romance', 'drama'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 32,
      name: 'Momochi-san Chi no Ayakashi Ouji',
      synopsis:
        'A órfã Himari Momochi herda uma propriedade ancestral no seu 16º aniversário. A Casa Momochi, na barreira entre os reinos humano e espiritual, exige que ela seja a guardiã entre os dois mundos. No entanto, ao se mudar, descobre três belos rapazes já na casa, um deles ocupando o papel que era dela!',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705984356/Thumbnails/Momochi-san_Chi_no_Ayakashi_Ooji_pifhvb.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990928/Thumbnails/backgrounds/Momochi-san_Chi_no_Ayakashi_Ooji_wxdhct.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'romance', 'drama'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 33,
      name: 'The Foolish Angel Dances with the Devil',
      synopsis:
        'Masatora Akutsu, um demônio que está em uma missão de recrutamento numa escola humana, está atrás de aliados para o Inferno na luta contra os anjos celestiais. Mas quando ele se senta ao lado da cativante Lily Amane, ele terá uma surpresa celestial incrivelmente hilária!',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705984352/Thumbnails/The_Foolish_Angel_Dances_with_the_Devil_ohfo4m.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990930/Thumbnails/backgrounds/Oroka_na_Tenshi_wa_Akuma_to_Odoru_jourdu.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['comédia', 'romance', 'sobrenatural', 'escolar'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shoujo',
    },
    {
      id: 34,
      name: 'Sokushi Cheat ga Saikyou sugite, Isekai no Yatsura ga Marude Aite ni Naranai n desu ga',
      synopsis:
        'Yogiri Takatou acorda em um mundo caótico durante uma viagem escolar. Sua turma foi transportada, e ele e uma colega são abandonados como isca para um dragão. Apesar de não se importar em morrer, decide proteger sua companheira. Com um poder secreto de invocar a Morte Instantânea, enfrenta monstros humildes de Nível 1000.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705984351/Thumbnails/Sokushi_Cheat_ga_Saikyou_sugite_zrzsj6.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990923/Thumbnails/backgrounds/Sokushi_Cheat_ga_Saikyou_sugite_c2xxn6.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['ação', 'isekai', 'aventura'],
      types: 'seriado',
      dubbeds: 'leg',
      classificationName: 'shounen',
    },
    {
      id: 35,
      name: 'Saikyou Tank no Meikyuu Kouryaku Tairyoku 9999 no Rare Skill-mochi Tank, Yuusha Party wo Tsuihou sareru',
      synopsis:
        'Rud, um shielder de defesa no nível 9999, integra a Equipe do Herói em incursões labirínticas. Sua missão: descobrir um tesouro oculto capaz de realizar qualquer desejo, visando a cura da amada irmã mais nova.',
      thumbnailUrl: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1705984351/Thumbnails/Saikyou_Tank_no_Meikyuu_Kouryaku_rdgbq8.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1705990923/Thumbnails/backgrounds/Saikyou_Tank_no_Meikyuu_Kouryaku_xvqyvg.webp',
      feature: false,
      year: '2024',
      status: 'Em lançamento',
      categoryNames: ['fantasia', 'ação', 'aventura'],
      types: 'seriado',
      dubbeds: 'leg',
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
      const categoryConnects = animeData.categoryNames.map((categoryName) => ({
        name: categoryName,
      }));

      try {
        await prisma.animes.create({
          data: {
            name: animeData.name,
            synopsis: animeData.synopsis,
            thumbnailUrl: animeData.thumbnailUrl,
            background: animeData.background,
            feature: animeData.feature,
            year: animeData.year,
            status: animeData.status,
            types: {
              connect: {
                name: animeData.types,
              },
            },
            dubbeds: {
              connect: {
                name: animeData.dubbeds,
              },
            },
            classifications: {
              connect: {
                name: animeData.classificationName,
              },
            },
            categories: {
              connect: categoryConnects,
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
