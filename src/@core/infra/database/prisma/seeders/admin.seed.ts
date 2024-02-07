import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

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

  const hashedPassword = await hashPassword('9%-32+5M1Bp');

  const existingAdmin = await prisma.users.findUnique({
    where: {
      email: 'info@nekoanimes.com',
    },
  });

  if (!existingAdmin) {
    const birthday = new Date('2023-12-01');
    await prisma.users.create({
      data: {
        userName: 'Neko Animes',
        email: 'info@nekoanimes.com',
        birthday: birthday,
        title: 'Rei Neko',
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
