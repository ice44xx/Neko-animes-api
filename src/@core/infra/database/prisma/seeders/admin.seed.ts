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
    const createdAdmin = await prisma.users.create({
      data: {
        firstName: 'Neko',
        userName: 'Neko Animes',
        email: 'nekopageanimes@gmail.com',
        password: hashedPassword,
        role: { connect: { id: adminRole.id } },
      },
    });

    console.log('Administrador, gerado: ', createdAdmin);
  }
}

createAdmin()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
