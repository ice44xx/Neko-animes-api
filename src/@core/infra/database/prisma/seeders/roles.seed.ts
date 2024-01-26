import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRoles() {
  const existingRoles = await prisma.roles.findMany({
    where: {
      name: { in: ['user', 'admin'] },
    },
  });

  const roleNames = existingRoles.map((role) => role.name);

  const rolesToCreate = ['user', 'admin'].filter((roleName) => !roleNames.includes(roleName));

  if (rolesToCreate.length > 0) {
    await prisma.roles.createMany({
      data: rolesToCreate.map((roleName) => ({ name: roleName })),
    });
  }
}

createRoles()
  .then(() => {
    console.log('Roles geradas com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao gerar roles:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
