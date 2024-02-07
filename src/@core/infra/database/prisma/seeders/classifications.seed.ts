import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createClassifications() {
  const classificationsToCreate = [
    {
      id: 1,
      name: 'Shounen',
      desc: 'Ação e aventura se fundem nesse gênero épico, ideal para quem busca histórias de superação e batalhas emocionantes.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1707142575/Classifica%C3%A7%C3%B5es/Shounen_xxwxqo.webp',
    },
    {
      id: 2,
      name: 'Seinen',
      desc: 'Profundo e maduro, este gênero é uma jornada para o público adulto, explorando temas complexos.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706353336/Classifica%C3%A7%C3%B5es/seinen_lloisr.webp',
    },
    {
      id: 3,
      name: 'Shoujo',
      desc: 'Romance, emoção e uma dose saudável de drama! Feito para o público feminino, esse gênero encanta com histórias de amor.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1706353931/Classifica%C3%A7%C3%B5es/shoujo_zqp8ue.webp',
    },
    {
      id: 4,
      name: 'Josei',
      desc: 'Maturidade e realismo definem esse gênero voltado para mulheres adultas. Com narrativas maduras.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1707142575/Classifica%C3%A7%C3%B5es/Josei_lmvmv7.webp',
    },
    {
      id: 5,
      name: 'Kodomo',
      desc: 'Cores vibrantes e lições divertidas! Projetado para jovens, este gênero oferece histórias educativas e cheias de diversão.',
      thumbnail: 'https://res.cloudinary.com/doupbxhfd/image/upload/v1707142575/Classifica%C3%A7%C3%B5es/Kodomo_zineoj.webp',
    },
  ];

  const classificationsInLowerCase = classificationsToCreate.map((classificationData) => {
    return {
      ...classificationData,
      name: classificationData.name.toLowerCase(),
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
