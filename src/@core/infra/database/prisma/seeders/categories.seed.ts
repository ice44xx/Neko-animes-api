import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCategories() {
  const categoriesToCreate = [
    'Ação',
    'Aventura',
    'Comédia',
    'Drama',
    'Isekai',
    'Histórico',
    'Fantasia',
    'Sci-fi',
    'Slice of Life',
    'Cyberpunk',
    'Culinária',
    'Ecchi',
    'Rpg',
    'Apocalíptico',
    'Terror',
    'Suspense',
    'Romance',
    'Mecha',
    'Magia',
    'Psicológico',
    'Esportes',
    'Harem',
    'Sobrenatural',
    'Medicina',
    'Escolar',
    'Yaoi',
    'Yuri',
  ];

  for (const categoryName of categoriesToCreate) {
    const lowerCaseName = categoryName.toLocaleLowerCase();

    const existingCategory = await prisma.categories.findUnique({
      where: { name: lowerCaseName },
    });

    if (!existingCategory) {
      await prisma.categories.create({
        data: { name: lowerCaseName },
      });
    }
  }
}

createCategories()
  .then(() => {
    console.log('Categorias geradas com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar categorias:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
