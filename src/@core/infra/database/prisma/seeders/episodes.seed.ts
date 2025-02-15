import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createEpisodes() {
  const episodesToCreate = [
    //Nier
    {
      id: 1,
      name: 'Episódio 1',
      url: 'https://mega.nz/embed/0qlQGChC#IL6-X3hvgJqGwf-Cu903x4hJQ5LwZfieuCK-mP2cUMo',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889283/Nier/Temporada%201/1_ukdb7h_u1b8u1.webp',
      episodeOrder: 1,
      seasonId: 4,
    },
    {
      id: 2,
      name: 'Episódio 2',
      url: 'https://mega.nz/embed/E6thwYjS#MQpaoxuUFdkcZNORGkUYWh17qfj3t02WQUbeDYamMlM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889276/Nier/Temporada%201/2_rek9ic_tvj4q8.webp',
      episodeOrder: 2,
      seasonId: 4,
    },
    {
      id: 3,
      name: 'Episódio 3',
      url: 'https://mega.nz/embed/oqMUgZ6K#ReEcAv2MgKi8bCzj1lHBsttr9wGeljvrY68vkq-CFwo',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889276/Nier/Temporada%201/3_evx1yi_n22nlw.webp',
      episodeOrder: 3,
      seasonId: 4,
    },
    {
      id: 4,
      name: 'Episódio 4',
      url: 'https://mega.nz/embed/5ysilTqR#-ZAKM8wuqjrueTf4webcb9JwtC0scoSkHos-d23jxoc',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889276/Nier/Temporada%201/4_pkqxav_mndz0o.webp',
      episodeOrder: 4,
      seasonId: 4,
    },
    {
      id: 5,
      name: 'Episódio 5',
      url: 'https://mega.nz/embed/96N0lYwZ#Z0gkpCfCKXrghUFosjtUd4_hXf2hzNKUG-63SUV07xI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889277/Nier/Temporada%201/5_vgexvk_vm8r6t.webp',
      episodeOrder: 5,
      seasonId: 4,
    },
    {
      id: 6,
      name: 'Episódio 6',
      url: 'https://mega.nz/embed/t7sXQSLb#dFlH4o5uTh2hAdIu5_Sgx4GPh3s95Ce_wBRtgKutWdE',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889278/Nier/Temporada%201/6_bcgxng_ta4gug.webp',
      episodeOrder: 6,
      seasonId: 4,
    },
    {
      id: 7,
      name: 'Episódio 7',
      url: 'https://mega.nz/embed/8uUhkDRZ#BStPmki5wznKpPugJ3a2Gw9xZef7f2-N9_g9sxssIyM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889278/Nier/Temporada%201/7_djcgxh_lwtrvm.webp',
      episodeOrder: 7,
      seasonId: 4,
    },
    {
      id: 8,
      name: 'Episódio 8',
      url: 'https://mega.nz/embed/djMkGIzI#xUl0JtNJwzQP6E9cBGPYgJA2PKsuJ6I7cZW-k1WzWUM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889279/Nier/Temporada%201/8_e7vhhi_ku220w.webp',
      episodeOrder: 8,
      seasonId: 4,
    },
    {
      id: 9,
      name: 'Episódio 9',
      url: 'https://mega.nz/embed/Z69n1byY#0YhKFWRxlCxixxFJbe77GaVY7wJbyjh-QdmcC15mZ2c',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889280/Nier/Temporada%201/9_msl9ku_p6n1ym.webp',
      episodeOrder: 9,
      seasonId: 4,
    },
    {
      id: 10,
      name: 'Episódio 10',
      url: 'https://mega.nz/embed/IjM2FLhA#7YY33TjO5w2f8gJb-bnXFcPO12FrbgKeNT_dDDO5itI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889281/Nier/Temporada%201/10_au5wum_cvdj19.webp',
      episodeOrder: 10,
      seasonId: 4,
    },
    {
      id: 11,
      name: 'Episódio 11',
      url: 'https://mega.nz/embed/ljEDUJoI#JnJtWTEuEdy7_Z6GRoi3cpWlVM-HUnaBuVP3slx16Mw',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889281/Nier/Temporada%201/11_k5mlza_b6flo1.webp',
      episodeOrder: 11,
      seasonId: 4,
    },
    {
      id: 12,
      name: 'Episódio 12',
      url: 'https://mega.nz/embed/Av0nXQCY#e9AnZQYk2SkxD0Y_qEzmbKd0GvkQdZnQ95ygG0i2Vwk',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889282/Nier/Temporada%201/12_ou1qaz_xpjd5s.webp',
      episodeOrder: 12,
      seasonId: 4,
    },
    //Mashle
    {
      id: 13,
      name: 'Episódio 1',
      url: 'https://mega.nz/embed/5780GD7J#QSn1UZxVWul4o1DlgvhU0Utle6wdzCBKiKT_E5gwU8o',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885365/Mashle/1_sinjsz.webp',
      episodeOrder: 1,
      seasonId: 3,
    },
    {
      id: 14,
      name: 'Episódio 2',
      url: 'https://mega.nz/embed/o2lBRC4b#hApwxxMS9LHvZuaXBA-akMahAfg9Vl95rzdzlWPb93Y',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885366/Mashle/2_v5hbfv.webp',
      episodeOrder: 2,
      seasonId: 3,
    },
    {
      id: 15,
      name: 'Episódio 3',
      url: 'https://mega.nz/embed/U6c2yJqR#NRUenpbV3S6Esy9BzXd347EW4r7eAPcuD5qzdOcN9nk',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885366/Mashle/3_epvge3.webp',
      episodeOrder: 3,
      seasonId: 3,
    },
    {
      id: 16,
      name: 'Episódio 4',
      url: 'https://mega.nz/embed/I6kV3QzR#ROmUgJIII8JA18_u3wIbHlWIJ1W8ZHuGJgM9HyzF8Cg',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885369/Mashle/4_myfl4f.webp',
      episodeOrder: 4,
      seasonId: 3,
    },
    {
      id: 17,
      name: 'Episódio 5',
      url: 'https://mega.nz/embed/lic32CrR#-Qq3G393DctrEt1FyhFrEuEnPHUqs2-dkekDga3JHWE',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885367/Mashle/5_ecff3v.webp',
      episodeOrder: 5,
      seasonId: 3,
    },
    {
      id: 18,
      name: 'Episódio 6',
      url: 'https://mega.nz/embed/Q30kkbyC#wWiEUjSyOYOwVmUu-S-d48L4E88cS_psWKXFRW7xnt0',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885370/Mashle/6_b8lqet.webp',
      episodeOrder: 6,
      seasonId: 3,
    },
    {
      id: 19,
      name: 'Episódio 6.5',
      url: 'https://mega.nz/embed/RzNjVY6T#bOhNyXHghjLle3_SQ1YMy9_tK_CehrwJk_adBu7I0ok',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885368/Mashle/6.5_etwdu0.webp',
      episodeOrder: 7,
      seasonId: 3,
    },
    {
      id: 20,
      name: 'Episódio 7',
      url: 'https://mega.nz/embed/8mlF1SyA#bgnUqluSrjaf2AtowW8KUBw2p0ZjM4WGO0Z-CTkLXMs',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885370/Mashle/7_scqjwk.webp',
      episodeOrder: 8,
      seasonId: 3,
    },
    {
      id: 21,
      name: 'Episódio 8',
      url: 'https://mega.nz/embed/ZnFhzRgY#xRu_XjzT8TUSsmK28Y8aY29uBnuJQURAvsbKu29pPmM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885371/Mashle/8_tzirn9.webp',
      episodeOrder: 9,
      seasonId: 3,
    },
    {
      id: 22,
      name: 'Episódio 9',
      url: 'https://mega.nz/embed/5mU0XAzB#MJbTsKDM7ZVHxymVxwDSBKGvhpGdzWptfgVcC2u-UdI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885372/Mashle/9_e9wlhb.webp',
      episodeOrder: 10,
      seasonId: 3,
    },
    {
      id: 23,
      name: 'Episódio 10',
      url: 'https://mega.nz/embed/JutgXYQQ#cwLFUTLzxnERq_G0VvGipxpiy1ay4YGWpSi3tNdkOUY',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885363/Mashle/10_jahhkq.webp',
      episodeOrder: 11,
      seasonId: 3,
    },
    {
      id: 24,
      name: 'Episódio 11',
      url: 'https://mega.nz/embed/MnUCWCzT#x6PMhMasafWKKGYXpAtZAt7Xyt-9P6CXhXDTsHUVjs8',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885364/Mashle/11_c37d2b.webp',
      episodeOrder: 12,
      seasonId: 3,
    },
    {
      id: 25,
      name: 'Episódio 12',
      url: 'https://mega.nz/embed/N6N12SoI#-SzPAp3odk14EKfsTa8mbS5KxWee8INpbITHi8zGdW4',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885364/Mashle/12_ekqsxf.webp',
      episodeOrder: 13,
      seasonId: 3,
    },
    //Spy x Family
    {
      id: 28,
      name: 'Episódio 1',
      url: 'https://mega.nz/embed/9DNBjbAC#1PTzbO79iSrY5btqlr2LA2RTjA5C95jhKH_kgNIskPs',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885513/Spy/1_mq4m3c.webp',
      episodeOrder: 1,
      seasonId: 5,
    },
    {
      id: 29,
      name: 'Episódio 2',
      url: 'https://mega.nz/embed/pGUR2D5K#YeMTXla6jPAmRbkeLW7Z7DTp-oGPpv3RJsHGIlb8kRM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885513/Spy/2_ultvc2.webp',
      episodeOrder: 2,
      seasonId: 5,
    },
    {
      id: 30,
      name: 'Episódio 3',
      url: 'https://mega.nz/embed/pe8CSK7S#SVAyJtqXix1-t-IQ3D3HPTim-cjmxr7mhJffHI_HDps',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885514/Spy/3_vrlvld.webp',
      episodeOrder: 3,
      seasonId: 5,
    },
    {
      id: 31,
      name: 'Episódio 4',
      url: 'https://mega.nz/embed/5GVkCZJD#NGSf3VXg5HI0XdMSlKmcFKhrHAhMZV4M3ebHe6KrJ84',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885515/Spy/4_juxl7o.webp',
      episodeOrder: 4,
      seasonId: 5,
    },
    {
      id: 32,
      name: 'Episódio 5',
      url: 'https://mega.nz/embed/YXU1ULxB#yUfVk5GPMaegodCLgB77AwyFxw-lk8c6c7C5LYX4UC4',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885516/Spy/5_dsaecn.webp',
      episodeOrder: 5,
      seasonId: 5,
    },
    {
      id: 33,
      name: 'Episódio 6',
      url: 'https://mega.nz/embed/RGsSUIRY#JSlcFU9er-T6_mqKMWPOhdDHPUsOPr1kwQOO-OqIuzs',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885517/Spy/6_p7oxsn.webp',
      episodeOrder: 6,
      seasonId: 5,
    },
    {
      id: 34,
      name: 'Episódio 7',
      url: 'https://mega.nz/embed/4fVBmICY#mMjIzmW3h3ZI5Kb1HdPvwpIQppsoBJu6xKEyefvw5Is',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885518/Spy/7_rufo4n.webp',
      episodeOrder: 7,
      seasonId: 5,
    },
    {
      id: 35,
      name: 'Episódio 8',
      url: 'https://mega.nz/embed/YS8XXJIA#B9vYOi26YoMRpJZ-lfb905yGxlaSFhPkmGNiu0bLOdY',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885518/Spy/7_rufo4n.webp',
      episodeOrder: 8,
      seasonId: 5,
    },
    {
      id: 36,
      name: 'Episódio 9',
      url: 'https://mega.nz/embed/EeczkSja#pYWztGr2VIHs0B-CN9vNghuU6nTdrt504LotFIyR_6M',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885520/Spy/9_koebmk.webp',
      episodeOrder: 9,
      seasonId: 5,
    },
    {
      id: 37,
      name: 'Episódio 10',
      url: 'https://mega.nz/embed/IGlEGZgD#hnePrXPa_MbQ1kIdvTbI4PIHjBik3m7pcASrpTPdwBs',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885521/Spy/10_hhi4hq.webp',
      episodeOrder: 10,
      seasonId: 5,
    },
    {
      id: 38,
      name: 'Episódio 11',
      url: 'https://mega.nz/embed/NKF3nTSI#CdPI_m0vrfjordhyjcJS9RzWuOz925o3l7lJvBzpWaw',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885511/Spy/11_ylgspy.webp',
      episodeOrder: 11,
      seasonId: 5,
    },
    {
      id: 39,
      name: 'Episódio 12',
      url: 'https://mega.nz/embed/4b0B1CIK#I6H97m4-2YZIV52wKMvqAvR8oCqi8eyrP09OvXgGQ2c',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885512/Spy/12_bpywrw.webp',
      episodeOrder: 12,
      seasonId: 5,
    },
    //overlord
    {
      id: 40,
      name: 'Episódio 1',
      url: 'https://mega.nz/embed/9bUhFBqL#rHjXcWbs7cDsOPHR5evpCponMy7GCWdKEalYxS9qFEg',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886873/Overlord/Temporada%201/1_hkcuqv.webp',
      episodeOrder: 1,
      seasonId: 6,
    },
    {
      id: 41,
      name: 'Episódio 2',
      url: 'https://mega.nz/embed/xXdnzIKS#ywh1XSMajrUQ5xWCPI4fzDCc9EgIb47uWx7zj_9gMSs',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886874/Overlord/Temporada%201/2_bao97t.webp',
      episodeOrder: 2,
      seasonId: 6,
    },
    {
      id: 42,
      name: 'Episódio 3',
      url: 'https://mega.nz/embed/EONRwLRC#TzcoMi63WisN0qr8KJRGlMD6o_rbS9ubWaoP5Y2tof8',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886876/Overlord/Temporada%201/3_bg04wc.webp',
      episodeOrder: 3,
      seasonId: 6,
    },
    {
      id: 43,
      name: 'Episódio 4',
      url: 'https://mega.nz/embed/QPEGTSab#iup3Y658WEVI-J0f9862ciAwFiprNHjDAYWWGKFXiCY',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886878/Overlord/Temporada%201/4_dmougp.webp',
      episodeOrder: 4,
      seasonId: 6,
    },
    {
      id: 44,
      name: 'Episódio 5',
      url: 'https://mega.nz/embed/Iel2yQJK#D9jTV3DjUhubQXazaQVpaqA9bDOO-QFTS2SjOZq5oKA',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886880/Overlord/Temporada%201/5_jsqiye.webp',
      episodeOrder: 5,
      seasonId: 6,
    },
    {
      id: 45,
      name: 'Episódio 6',
      url: 'https://mega.nz/embed/lTtiiRpJ#NkHEcWRB7aQi2r6RaJBVI7CX39zUqjraK5fOTJZ0-R4',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886882/Overlord/Temporada%201/6_vyyngq.webp',
      episodeOrder: 6,
      seasonId: 6,
    },
    {
      id: 46,
      name: 'Episódio 7',
      url: 'https://mega.nz/embed/pOUAAA4S#QWypQZSLskWlFEANynw7RZP0KUI7wQe8WT7k0-s66FI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886884/Overlord/Temporada%201/7_rbt7u4.webp',
      episodeOrder: 7,
      seasonId: 6,
    },
    {
      id: 47,
      name: 'Episódio 8',
      url: 'https://mega.nz/embed/oCdXxajK#fdsYH2zziQh9RJq8A1RODnhNUPG0T4VA7uupF5pDolI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886886/Overlord/Temporada%201/8_katucl.webp',
      episodeOrder: 8,
      seasonId: 6,
    },
    {
      id: 48,
      name: 'Episódio 9',
      url: 'https://mega.nz/embed/FLEQFaLD#q7LdFI-A2v9UdxiS8_o9-_dsIyHnebi7waB5g5VLEeM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886888/Overlord/Temporada%201/9_fr5sy0.webp',
      episodeOrder: 9,
      seasonId: 6,
    },
    {
      id: 49,
      name: 'Episódio 10',
      url: 'https://mega.nz/embed/BXFVQYiI#yxZgbuRUmbW8SRyrVOGC51_ahzj-3R6VyGGHEOoj4yA',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886890/Overlord/Temporada%201/10_bn6mgb.webp',
      episodeOrder: 10,
      seasonId: 6,
    },
    {
      id: 50,
      name: 'Episódio 11',
      url: 'https://mega.nz/embed/RSECHYiT#c_y-sDSaN50zYNniT990Xyi6M4GomKDX7ZHLou-qCeI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886869/Overlord/Temporada%201/11_ufplou.webp',
      episodeOrder: 11,
      seasonId: 6,
    },
    {
      id: 51,
      name: 'Episódio 12',
      url: 'https://mega.nz/embed/JbcCQJrT#JkYDllocrlmLItPgBu8y4ULXtFKU_-SzFb5UQlxnVv0',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886871/Overlord/Temporada%201/12_uc75qf.webp',
      episodeOrder: 12,
      seasonId: 6,
    },
    {
      id: 52,
      name: 'Episódio 13',
      url: 'https://mega.nz/embed/AOkVnCaD#HKPYo87XjPmeiQ-Wepgj-y4hrndf8ofZauZrcaXgN3c',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706889782/Overlord/Temporada%201/13_nyjomf.webp',
      episodeOrder: 13,
      seasonId: 6,
    },
    {
      id: 53,
      name: 'Episódio 1',
      url: 'https://mega.nz/embed/gDl1iSQI#_fLtSgNv8f33fyJee2uq0OpMMyeSOPuYN4XqXPznWyA',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887009/Overlord/Temporada%202/1_k59gkr.webp',
      episodeOrder: 1,
      seasonId: 7,
    },
    {
      id: 54,
      name: 'Episódio 2',
      url: 'https://mega.nz/embed/ULsXTQCZ#2FwmNzR45fxJITo-n7JlZPWoXqBX1WoTUO_IjzOJ7Js',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887011/Overlord/Temporada%202/2_ct5inn.webp',
      episodeOrder: 2,
      seasonId: 7,
    },
    {
      id: 55,
      name: 'Episódio 3',
      url: 'https://mega.nz/embed/ND1ERAgS#p8x0rCtmxoKfdSpkXvvZI4c-bRfevkveWRFWsYnY9GE',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887013/Overlord/Temporada%202/3_zupamk.webp',
      episodeOrder: 3,
      seasonId: 7,
    },
    {
      id: 56,
      name: 'Episódio 4',
      url: 'https://mega.nz/embed/4L1WgQbI#Dbe2u-o6MaAfjz5z6ChR6FEEANef4zzYrO__AlIgRo0',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887015/Overlord/Temporada%202/4_lkhhrd.webp',
      episodeOrder: 4,
      seasonId: 7,
    },
    {
      id: 57,
      name: 'Episódio 5',
      url: 'https://mega.nz/embed/xHdQAJbA#WKgpnj2R1BXP1fFcpAPTMKtvbguoWm0d-HkrRTKEnsI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887017/Overlord/Temporada%202/5_p9dbkr.webp',
      episodeOrder: 5,
      seasonId: 7,
    },
    {
      id: 58,
      name: 'Episódio 6',
      url: 'https://mega.nz/embed/8HtyQCaL#8I0X8rwZmoC4v38LQYThxrwtiodonyrgJwBv_V8Ew3o',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887019/Overlord/Temporada%202/6_dseeng.webp',
      episodeOrder: 6,
      seasonId: 7,
    },
    {
      id: 59,
      name: 'Episódio 7',
      url: 'https://mega.nz/embed/lGs1GJiD#McE7htA6IJF2gt3c83U4WHZvxJlYNaQA7XMrTjd1bmo',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887021/Overlord/Temporada%202/7_y7ryfn.webp',
      episodeOrder: 7,
      seasonId: 7,
    },
    {
      id: 60,
      name: 'Episódio 8',
      url: 'https://mega.nz/embed/pL8QUK6b#10604NbUACf3MjEEzi3ZeuIajBsVlYvN9qkXOqe6T88',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887023/Overlord/Temporada%202/8_lesfyu.webp',
      episodeOrder: 8,
      seasonId: 7,
    },
    {
      id: 61,
      name: 'Episódio 9',
      url: 'https://mega.nz/embed/1WUyxIYB#mR5iSkT5wa1J8tMiPrG3gJ2jUdUXPRoLud_1UJ-sVVo',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886999/Overlord/Temporada%202/9_iklvoe.webp',
      episodeOrder: 9,
      seasonId: 7,
    },
    {
      id: 62,
      name: 'Episódio 10',
      url: 'https://mega.nz/embed/8X9zxBpK#DSUK8--68LgthCpmlzxoLKIjzqTQwEZAYgDv8-3Ohgk',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887001/Overlord/Temporada%202/10_xnp4wh.webp',
      episodeOrder: 10,
      seasonId: 7,
    },
    {
      id: 63,
      name: 'Episódio 11',
      url: 'https://mega.nz/embed/xGsBhIpZ#5UlMuzbwNPrClJQWywMFRlFoYA9EB_LuOAfHLD9of6Q',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887003/Overlord/Temporada%202/11_rs9eq5.webp',
      episodeOrder: 11,
      seasonId: 7,
    },
    {
      id: 64,
      name: 'Episódio 12',
      url: 'https://mega.nz/embed/xScRiAZB#stHQ-WnL5IU-tVvBa1iY7pyEeamndVWzeSdQUlwOKYY',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887005/Overlord/Temporada%202/12_jppx0x.webp',
      episodeOrder: 12,
      seasonId: 7,
    },
    {
      id: 65,
      name: 'Episódio 13',
      url: 'https://mega.nz/embed/0LMAUBgD#7kYcvHIR4ne_BlTicvUwPbGdxIAOaJQ8K8LXILy6WuQ',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706887007/Overlord/Temporada%202/13_owmwvu.webp',
      episodeOrder: 13,
      seasonId: 7,
    },
    //Jujutsu
    {
      id: 66,
      name: 'Episódio 1',
      url: 'https://mega.nz/embed/4mNCxTYJ#jz7K1o-cUhTEHG3secllU2dgUdwfuqLrkvUOAun691c',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886198/Jujutsu/Temporada%201/1_ggicvy.webp',
      episodeOrder: 1,
      seasonId: 1,
    },
    {
      id: 67,
      name: 'Episódio 2',
      url: 'https://mega.nz/embed/Vrkg2DQL#A9LLeCEP_E2p4tfIvw_vgi8ULo4LbizIMl_mWQMBpTY',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886200/Jujutsu/Temporada%201/2_kjoom5.webp',
      episodeOrder: 2,
      seasonId: 1,
    },
    {
      id: 68,
      name: 'Episódio 3',
      url: 'https://mega.nz/embed/UvkDmBIb#hjHLY3vyOK25OP17xeD9n7vNfCO7YcFOsiBtuZEFelU',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886201/Jujutsu/Temporada%201/3_nq20ej.webp',
      episodeOrder: 3,
      seasonId: 1,
    },
    {
      id: 69,
      name: 'Episódio 4',
      url: 'https://mega.nz/embed/VucWRJ4C#I3_aR_pmxhbRyTmCJuFf8t9Fb9v0hJWPyail6EC8j4w',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886203/Jujutsu/Temporada%201/4_naf5fa.webp',
      episodeOrder: 4,
      seasonId: 1,
    },
    {
      id: 70,
      name: 'Episódio 5',
      url: 'https://mega.nz/embed/5zUmXI5J#vW4f8TCj1ih87_GO1k7vOZoRV6cqIXndgkpE9j0B7z4',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886204/Jujutsu/Temporada%201/5_tkzboi.webp',
      episodeOrder: 5,
      seasonId: 1,
    },
    {
      id: 71,
      name: 'Episódio 6',
      url: 'https://mega.nz/embed/wi9m0KaD#NRPWx75uA6rdLZ_prHnygbs4mQj3dnzpIZUJwiiSDk4',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886206/Jujutsu/Temporada%201/6_phhceb.webp',
      episodeOrder: 6,
      seasonId: 1,
    },
    {
      id: 72,
      name: 'Episódio 7',
      url: 'https://mega.nz/embed/Yv0iGSAR#rydU290qy9WLjDrIfaV4T9hZFZ0_67tQQvSoLYoBKDw',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886208/Jujutsu/Temporada%201/7_clgxml.webp',
      episodeOrder: 7,
      seasonId: 1,
    },
    {
      id: 73,
      name: 'Episódio 8',
      url: 'https://mega.nz/embed/k2c3jJzD#1hXb5ZzR3UvwjQ0IkEHE_CDYeZhyC8IvbUM5_14xvr4',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886210/Jujutsu/Temporada%201/8_vksbe6.webp',
      episodeOrder: 8,
      seasonId: 1,
    },
    {
      id: 74,
      name: 'Episódio 9',
      url: 'https://mega.nz/embed/43UgjK7J#g0rIxsFagbYg0uoIJTHM-uE13ru00ZBxoaN88Tf8z2g',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886211/Jujutsu/Temporada%201/9_u2byt4.webp',
      episodeOrder: 9,
      seasonId: 1,
    },
    {
      id: 75,
      name: 'Episódio 10',
      url: 'https://mega.nz/embed/c68miIbJ#V32k_GR7d1qImR-g6Ij_pkIr1snc4BPxeChBp7uALQg',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886213/Jujutsu/Temporada%201/10_nevwwt.webp',
      episodeOrder: 10,
      seasonId: 1,
    },
    {
      id: 76,
      name: 'Episódio 11',
      url: 'https://mega.nz/embed/wvESCaDS#nvkuyG-NM8v4BsCC4m-ZGby8pKKmUikRU1NGXfmYleA',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886215/Jujutsu/Temporada%201/11_vofnnf.webp',
      episodeOrder: 11,
      seasonId: 1,
    },
    {
      id: 77,
      name: 'Episódio 12',
      url: 'https://mega.nz/embed/B3NS1LxR#P58D6XAEto92LwAjGLs9-1BUf0VqA0nSWzlBho6l2p0',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886217/Jujutsu/Temporada%201/12_rblccg.webp',
      episodeOrder: 12,
      seasonId: 1,
    },
    {
      id: 78,
      name: 'Episódio 13',
      url: 'https://mega.nz/embed/RnFj0Z5S#RD31X8nDwVikjTJwC86Ufhf_qVHQoxSVA_eBpMx6hkA',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886218/Jujutsu/Temporada%201/13_efgrsm.webp',
      episodeOrder: 13,
      seasonId: 1,
    },
    {
      id: 79,
      name: 'Episódio 14',
      url: 'https://mega.nz/embed/wjV0EZ6Y#eY6iuBpUPFTgSf-9JaC8Q1wyZ5B325loMw4A-l1yTDE',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886221/Jujutsu/Temporada%201/14_rvbg5q.webp',
      episodeOrder: 14,
      seasonId: 1,
    },
    {
      id: 80,
      name: 'Episódio 15',
      url: 'https://mega.nz/embed/lvMXkTAC#XhnkCcUGcp8Rgju-4ADW3eSOJ45XTXQO8wrqCu6rwvs',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886223/Jujutsu/Temporada%201/15_rlcpu4.webp',
      episodeOrder: 15,
      seasonId: 1,
    },
    {
      id: 81,
      name: 'Episódio 16',
      url: 'https://mega.nz/embed/Nn0mEKxK#7GtrRjCkw4wdYSjC6SCPUOwumJvGdLQFtmwl6ZytwvI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886225/Jujutsu/Temporada%201/16_qadj8w.webp',
      episodeOrder: 16,
      seasonId: 1,
    },
    {
      id: 82,
      name: 'Episódio 17',
      url: 'https://mega.nz/embed/NqVzCaTD#_ZyDW0NV4G7HdXozO-TMLbium_4RK2bvVDitfZ2TfRE',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886187/Jujutsu/Temporada%201/17_viklon.webp',
      episodeOrder: 17,
      seasonId: 1,
    },
    {
      id: 83,
      name: 'Episódio 18',
      url: 'https://mega.nz/embed/83ED3DCS#kzn_azAhkbw6ETQgu2uojqGSM14LIzFHv3ZznSmrkxk',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886188/Jujutsu/Temporada%201/18_gpflih.webp',
      episodeOrder: 18,
      seasonId: 1,
    },
    {
      id: 84,
      name: 'Episódio 19',
      url: 'https://mega.nz/embed/w2FVSCLS#F7PZAoIssH1K5T74BbwRoM2tLitghkwCM3Lduj88KNs',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886190/Jujutsu/Temporada%201/19_gnfhzy.webp',
      episodeOrder: 19,
      seasonId: 1,
    },
    {
      id: 85,
      name: 'Episódio 20',
      url: 'https://mega.nz/embed/ZiUGXCpT#jKgb7uUPL52QJrXKH3G6UWpLmLxeV0NDEpitKSpqcCA',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886191/Jujutsu/Temporada%201/20_hjfbpf.webp',
      episodeOrder: 20,
      seasonId: 1,
    },
    {
      id: 86,
      name: 'Episódio 21',
      url: 'https://mega.nz/embed/4yFHjJZB#rSeNfnMIeC_aEo7TeA6P_AzJsPW1g9ZqgxYv68SpE-w',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886193/Jujutsu/Temporada%201/21_w0sd1c.webp',
      episodeOrder: 21,
      seasonId: 1,
    },
    {
      id: 87,
      name: 'Episódio 22',
      url: 'https://mega.nz/embed/I3MGgBba#QzesIKLA72ZsvEyaN5eE-hg_wsShrodAH5FfDIe_gMw',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886194/Jujutsu/Temporada%201/22_rcajct.webp',
      episodeOrder: 22,
      seasonId: 1,
    },
    {
      id: 88,
      name: 'Episódio 23',
      url: 'https://mega.nz/embed/ov0ARbBI#n3CINEpNA8jq4QpQvCNIcDzimg4CwC4Skf5-94AAgzY',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886195/Jujutsu/Temporada%201/23_hl4osb.webp',
      episodeOrder: 23,
      seasonId: 1,
    },
    {
      id: 89,
      name: 'Episódio 24',
      url: 'https://mega.nz/embed/JmkASQiT#F0lppCEie-s_JXCfDd3nYM8FSBFutc8rdd2yQ97V914',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886197/Jujutsu/Temporada%201/24_ytuayo.webp',
      episodeOrder: 24,
      seasonId: 1,
    },
    {
      id: 90,
      name: 'Episódio 1',
      url: 'https://mega.nz/embed/RrlBkKgL#-SM9j_R3_kl6GvcelXHt_UIxO8ORSw7j_eqRdgCbrBQ',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886653/Jujutsu/Temporada%202/1_ig2bbs.webp',
      episodeOrder: 1,
      seasonId: 2,
    },
    {
      id: 91,
      name: 'Episódio 2',
      url: 'https://mega.nz/embed/8jFxjJIL#7VzdCRExHLBjFf0DbK0YoLjFZOVUA1osfnBh_Zknl5Q',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886657/Jujutsu/Temporada%202/2_rnyb0h.webp',
      episodeOrder: 2,
      seasonId: 2,
    },
    {
      id: 92,
      name: 'Episódio 3',
      url: 'https://mega.nz/embed/A71H0TIQ#ZCO_gFVzXkva7yBWjG5-Pv0CjDqq5up0YW9T9g2-ObE',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886659/Jujutsu/Temporada%202/3_vybr0h.webp',
      episodeOrder: 3,
      seasonId: 2,
    },
    {
      id: 93,
      name: 'Episódio 4',
      url: 'https://mega.nz/embed/hucnyZIA#lWDhjFQksQBZTPkljSOqNGX6L2qXNSR_swUj6i74EsQ',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886661/Jujutsu/Temporada%202/4_rearvi.webp',
      episodeOrder: 4,
      seasonId: 2,
    },
    {
      id: 94,
      name: 'Episódio 5',
      url: 'https://mega.nz/embed/1i0jDKKC#MTaRzkpgKlosXcsSVf9EQN2EyCYKgYXZfkn9pqD4dRc',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886663/Jujutsu/Temporada%202/5_qxufum.webp',
      episodeOrder: 5,
      seasonId: 2,
    },
    {
      id: 95,
      name: 'Episódio 6',
      url: 'https://mega.nz/embed/Y3kBwYQJ#rlhTHUjOWzDtzssKjzvBUz5XqjSzITja6BwaASzU1rs',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886665/Jujutsu/Temporada%202/6_waul9n.webp',
      episodeOrder: 6,
      seasonId: 2,
    },
    {
      id: 96,
      name: 'Episódio 7',
      url: 'https://mega.nz/embed/om1i1AwD#uDU2se1rqDSQ5wDZTxOkpzHx076eK0NusaIPe79bv-g',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886627/Jujutsu/Temporada%202/7_qnl5ne.webp',
      episodeOrder: 7,
      seasonId: 2,
    },
    {
      id: 97,
      name: 'Episódio 8',
      url: 'https://mega.nz/embed/My1kkD5R#P-rchjjfk8lKZ6iNvrsHj_zRqzCbdRknmPTsyP7Q5rI',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886628/Jujutsu/Temporada%202/8_nt5rjp.webp',
      episodeOrder: 8,
      seasonId: 2,
    },
    {
      id: 98,
      name: 'Episódio 9',
      url: 'https://mega.nz/embed/Y30XRbhI#_T5LpABqWqDIoYbLqg1x7dp5TjOdgkzbhaDJlw_GWg8',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886630/Jujutsu/Temporada%202/9_ic19ac.webp',
      episodeOrder: 9,
      seasonId: 2,
    },
    {
      id: 99,
      name: 'Episódio 10',
      url: 'https://mega.nz/embed/A283UJiI#z_C1CDEQfTq0wsYWaELHpJwEU02oYrpMtn8yVI_b7wg',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886631/Jujutsu/Temporada%202/10_u6dokn.webp',
      episodeOrder: 10,
      seasonId: 2,
    },
    {
      id: 100,
      name: 'Episódio 11',
      url: 'https://mega.nz/embed/hylGELbR#BR3x30fz5qKjQoHuhh238LDHag4dYuljG1cQl65HBws',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886632/Jujutsu/Temporada%202/11_rwz8kk.webp',
      episodeOrder: 11,
      seasonId: 2,
    },
    {
      id: 101,
      name: 'Episódio 12',
      url: 'https://mega.nz/embed/V2tGWJzR#n3paKWBy25jE07foIdLnJxqwQhaMTGoeFs6Z7WFggUk',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886634/Jujutsu/Temporada%202/12_idjc7l.webp',
      episodeOrder: 12,
      seasonId: 2,
    },
    {
      id: 102,
      name: 'Episódio 13',
      url: 'https://mega.nz/embed/YvMmHawJ#0sEcUA3j6UUqWwADXbvnHnLPKBU6ZOwDae9D2A0_lJM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886636/Jujutsu/Temporada%202/13_bchfvr.webp',
      episodeOrder: 13,
      seasonId: 2,
    },
    {
      id: 103,
      name: 'Episódio 14',
      url: 'https://mega.nz/embed/NudHnZLA#S9hXsiyA9UvmcgYZClT1LQrlOwVsEMMNx95d5J4EFJM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886638/Jujutsu/Temporada%202/14_v2z8fj.webp',
      episodeOrder: 14,
      seasonId: 2,
    },
    {
      id: 104,
      name: 'Episódio 15',
      url: 'https://mega.nz/embed/l3smyKxQ#Gfi9niTlwP-i3rfmRQZF7rZM6_XVjXXriSZQqopGTe0',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886639/Jujutsu/Temporada%202/15_jkuavo.webp',
      episodeOrder: 15,
      seasonId: 2,
    },
    {
      id: 105,
      name: 'Episódio 16',
      url: 'https://mega.nz/embed/8u9ECI4Q#32Q-bMfA1aCnrZ2OIXoptRAQhywrHr74ViVWDRQZ5u4',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886641/Jujutsu/Temporada%202/16_zel3iw.webp',
      episodeOrder: 16,
      seasonId: 2,
    },
    {
      id: 106,
      name: 'Episódio 17',
      url: 'https://mega.nz/embed/EiFCnAba#PtYARPo4k-iyHuaHEed1_XNY7kHyxS9IfiQaXO0sR4E',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886642/Jujutsu/Temporada%202/17_rewj7u.webp',
      episodeOrder: 17,
      seasonId: 2,
    },
    {
      id: 107,
      name: 'Episódio 18',
      url: 'https://mega.nz/embed/0m82wRaL#aKByxkRTSX2xJde6_GyBjOm3HEy4Je2w67_TO_zCkxw',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886644/Jujutsu/Temporada%202/18_vvpbwe.webp',
      episodeOrder: 18,
      seasonId: 2,
    },
    {
      id: 108,
      name: 'Episódio 19',
      url: 'https://mega.nz/embed/RqFjzDZY#a5wPXwT17zGYscYV0i0Y3r6hqTrT0LEBLPHCekDGfLo',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886646/Jujutsu/Temporada%202/19_uvbsm6.webp',
      episodeOrder: 19,
      seasonId: 2,
    },
    {
      id: 109,
      name: 'Episódio 20',
      url: 'https://mega.nz/embed/QuEFgCjJ#ipNNZBL_4whfxAqIZTiHOqMuR2Lu60ik_Gq2zUQQU1E',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886648/Jujutsu/Temporada%202/20_fprxwr.webp',
      episodeOrder: 20,
      seasonId: 2,
    },
    {
      id: 110,
      name: 'Episódio 21',
      url: 'https://mega.nz/embed/I3MnDSAA#ylt2eTaXeVdwgrp7cLI5SY6OHWZk_UXF44N9JhtZ2JY',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886655/Jujutsu/Temporada%202/21_eddjur.webp',
      episodeOrder: 21,
      seasonId: 2,
    },
    {
      id: 111,
      name: 'Episódio 22',
      url: 'https://mega.nz/embed/Um9Q0KSJ#NFUa1oUX1b4RpBqGoSvwyySFFKA22QkEk0rLtSq5GbY',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886651/Jujutsu/Temporada%202/22_a2kpki.webp',
      episodeOrder: 22,
      seasonId: 2,
    },
    {
      id: 112,
      name: 'Episódio 23',
      url: 'https://mega.nz/embed/ZiUGASCJ#I84nTn9cViNz2LL5fL_025D_2MHgm416_7l9lU0n16Y',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706886650/Jujutsu/Temporada%202/23_ayjido.webp',
      episodeOrder: 23,
      seasonId: 2,
    },
    {
      id: 113,
      name: 'Episódio 1',
      url: 'https://mega.nz/embed/lzVmyRIJ#NoIscVMY9vqf-SsdNyDeitMVzQYBBBBpttFTz41odvg',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885950/Chainsaw%20man/1_o5leih.webp',
      episodeOrder: 1,
      seasonId: 8,
    },
    {
      id: 114,
      name: 'Episódio 2',
      url: 'https://mega.nz/embed/lzlQwYqB#sbRVxshVTlXLmBEgtbW4lfpOFnkj54Kne2E-adHbbj0',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885951/Chainsaw%20man/2_qz3gcc.webp',
      episodeOrder: 2,
      seasonId: 8,
    },
    {
      id: 115,
      name: 'Episódio 3',
      url: 'https://mega.nz/embed/QncznZyT#U2H119ugEoPLpSFrIbL2GqtFvK1Y5w7STdgad7dm-Ys',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885952/Chainsaw%20man/3_nyloha.webp',
      episodeOrder: 3,
      seasonId: 8,
    },
    {
      id: 116,
      name: 'Episódio 4',
      url: 'https://mega.nz/embed/s3U3hTqY#VkfsIUneF46WYxhp8Hq-JIHCGjv9mmWnkXV4QpHap8o',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885954/Chainsaw%20man/4_qdra20.webp',
      episodeOrder: 4,
      seasonId: 8,
    },
    {
      id: 117,
      name: 'Episódio 5',
      url: 'https://mega.nz/embed/FnNjlaCL#ZYCiwRhvX2zYmI6XRBdJnY6MaYP0Nacxjy8qrSthZvM',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885955/Chainsaw%20man/5_bcsd5t.webp',
      episodeOrder: 5,
      seasonId: 8,
    },
    {
      id: 118,
      name: 'Episódio 6',
      url: 'https://mega.nz/embed/kiNXFBZa#AhcmDe3MKe6BiewuQ-MBgC4xr8ITlG9BeM57yOId9OE',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885956/Chainsaw%20man/6_jk5drw.webp',
      episodeOrder: 6,
      seasonId: 8,
    },
    {
      id: 119,
      name: 'Episódio 7',
      url: 'https://mega.nz/embed/AiECjKrT#e7mXCX1UExXCRzNIhQtzDc0FJPm0nbjTe0K-Mv9Xlb8',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885958/Chainsaw%20man/7_ioxdl8.webp',
      episodeOrder: 7,
      seasonId: 8,
    },
    {
      id: 120,
      name: 'Episódio 8',
      url: 'https://mega.nz/embed/tukilLST#4Zl2wn9APXbuUZXMlZVvAZlPujpDcp2Yu-ogRS7MO18',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885959/Chainsaw%20man/8_jy47bg.webp',
      episodeOrder: 8,
      seasonId: 8,
    },
    {
      id: 121,
      name: 'Episódio 9',
      url: 'https://mega.nz/embed/lmETwY4J#JyxMCVOB-LxpN2tYsOR09jZpCKntUlEHWV29ZHGLeJw',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885945/Chainsaw%20man/9_wnxgja.webp',
      episodeOrder: 9,
      seasonId: 8,
    },
    {
      id: 122,
      name: 'Episódio 10',
      url: 'https://mega.nz/embed/h7V3zYzS#AWjJvDTMBZp7Q4VBGnHj61Ctt2mJhfr1umdv-rMEO9k',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885946/Chainsaw%20man/10_n6i8fg.webp',
      episodeOrder: 10,
      seasonId: 8,
    },
    {
      id: 123,
      name: 'Episódio 11',
      url: 'https://mega.nz/embed/pvUFXISB#yHBNWzCJz30H0Ex2eI-GTv1gDLGqTs7JfF941mekB8U',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885947/Chainsaw%20man/11_jn4lwn.webp',
      episodeOrder: 11,
      seasonId: 8,
    },
    {
      id: 124,
      name: 'Episódio 12',
      url: 'https://mega.nz/embed/ojNAUbIB#OU2JnTbSeG8FNFaCaLh3WE860DDpHGnUEdBGaXIH20s',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1706885949/Chainsaw%20man/12_arzh8g.webp',
      episodeOrder: 12,
      seasonId: 8,
    },
    {
      id: 125,
      name: 'One Piece Strong World',
      url: 'https://d0000d.com/e/okymxuvwulv9so0huc3y191bgwhsexg',
      thumbnailUrl: 'https://res.cloudinary.com/drdtgicep/image/upload/v1707143399/Filmes/One%20Piece%20Filmes/strong_world.webp',
      episodeOrder: 1,
      seasonId: 9,
    },
  ];

  for (const episodesData of episodesToCreate) {
    const existingSeason = await prisma.seasons.findUnique({
      where: { id: episodesData.seasonId },
    });

    const existingEpisodes = await prisma.episodes.findUnique({
      where: { id: episodesData.id },
    });

    if (existingSeason) {
      if (!existingEpisodes) {
        await prisma.episodes.create({
          data: {
            name: episodesData.name,
            url: episodesData.url,
            thumbnailUrl: episodesData.thumbnailUrl,
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
