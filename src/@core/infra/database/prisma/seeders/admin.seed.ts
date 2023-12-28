import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function findAdminRole() {
  return await prisma.roles.findUnique({
    where: {
      name: 'admin',
    },
  });
}

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function createAdmin() {
  const adminRole = await findAdminRole();

  if (!adminRole) {
    console.error('Role de admin não encontrada.');
    return;
  }

  const hashedPassword = await hashPassword('020619!Ns');

  const existingAdmin = await prisma.users.findUnique({
    where: {
      email: 'nekopageanimes@gmail.com',
    },
  });

  if (!existingAdmin) {
    const birthday = new Date('2023-12-01');
    await prisma.users.create({
      data: {
        firstName: 'Neko',
        userName: 'Neko Animes',
        email: 'nekopageanimes@gmail.com',
        birthday: birthday,
        password: hashedPassword,
        role: { connect: { id: adminRole?.id || 2 } },
      },
    });
  }
}

createAdmin()
  .then(() => {
    console.log('Admin gerado com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao gerar Admin:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
