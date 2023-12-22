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
    console.log('Roles criadas com sucesso.');
  }
}

createRoles()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
