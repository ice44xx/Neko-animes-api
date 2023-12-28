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
    'Pós-apocalíptico',
    'Terror',
    'Suspense',
    'Romance',
    'Mecha',
    'Magia',
    'Psicológico',
    'Esportes',
    'Harem',
  ];

  for (const categoryName of categoriesToCreate) {
    const existingCategory = await prisma.categories.findUnique({
      where: { name: categoryName },
    });

    if (!existingCategory) {
      await prisma.categories.create({
        data: { name: categoryName },
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
