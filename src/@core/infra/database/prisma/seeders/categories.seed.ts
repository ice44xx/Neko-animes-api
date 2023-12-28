import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCategories() {
  await prisma.categories.create({
    data: {
      name: 'Ação',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Aventura',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Comédia',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Drama',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Isekai',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Histórico',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Fantasia',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Sci-fi',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Slice of Life',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Cyberpunk',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Culinária',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Ecchi',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Rpg',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Pós-apocalíptico',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Terror',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Suspense',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Romance',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Mecha',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Magia',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Psicológico',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Esportes',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Harem',
    },
  });

  await prisma.categories.create({
    data: {
      name: 'Mecha',
    },
  });

  console.log('Categorias geradas.');
}

createCategories()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
