import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createClassifications() {
  const classificationsToCreate = [
    {
      id: 1,
      name: 'Shounen',
      desc: 'Energia, ação e aventura se fundem nesse gênero épico, ideal para quem busca histórias de superação, amizade e batalhas emocionantes.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1703559298/Classifica%C3%A7%C3%B5es/Shounen_xfflya.webp',
    },
    {
      id: 2,
      name: 'Seinen',
      desc: 'Profundo e maduro, este gênero é uma jornada para o público adulto, explorando temas complexos, psicologia dos personagens e tramas intrincadas.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1703559297/Classifica%C3%A7%C3%B5es/Seinen_zwjfhg.webp',
    },
    {
      id: 3,
      name: 'Shoujo',
      desc: 'Romance, emoção e uma dose saudável de drama! Feito para o público feminino, esse gênero encanta com histórias de amor, amizade e jornadas emocionantes.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1703559298/Classifica%C3%A7%C3%B5es/Shoujo_hrvf00.webp',
    },
    {
      id: 4,
      name: 'Josei',
      desc: 'Maturidade e realismo definem esse gênero voltado para mulheres adultas. Com narrativas maduras sobre relacionamentos complexos e desafios da vida adulta.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1703559297/Classifica%C3%A7%C3%B5es/Josei_ksnco4.webp',
    },
    {
      id: 5,
      name: 'Kodomo',
      desc: 'Cores vibrantes e lições divertidas! Projetado para as mentes jovens, este gênero cativante oferece histórias simples, educativas e cheias de diversão.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1703559297/Classifica%C3%A7%C3%B5es/Kodomo_gm30ta.webp',
    },
  ];

  const classificationsInLowerCase = classificationsToCreate.map((classificationData) => {
    return {
      ...classificationData,
      name: classificationData.name.toLowerCase(),
      desc: classificationData.desc.toLowerCase(),
      thumbnail: classificationData.thumbnail.toLowerCase(),
    };
  });

  for (const classificationData of classificationsInLowerCase) {
    const existingClassification = await prisma.classifications.findUnique({
      where: { id: classificationData.id },
    });

    if (!existingClassification) {
      await prisma.classifications.create({
        data: classificationData,
      });
    }
  }
}

createClassifications()
  .then(() => {
    console.log('Classificações geradas com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar classificações:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
