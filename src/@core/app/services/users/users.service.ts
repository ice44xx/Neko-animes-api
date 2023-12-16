import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/@core/infra/database/repositories/users/users.repository';
import { CreateUsersDto } from '../../dto/users/create-users-dto';
import { RolesRepository } from 'src/@core/infra/database/repositories/users/roles.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll() {
    try {
      return this.usersRepository.findAll();
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar todos usuários, ' + error.message);
    }
  }

  async findById(id: number) {
    try {
      const user = await this.usersRepository.findById(id);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar o usuário, ' + error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundException('Email não encontrado');
      }

      return user;
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar o email, ' + error.message);
    }
  }

  async create(createUsersDto: CreateUsersDto) {
    try {
      const { password, ...userData } = createUsersDto;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const existingUser = await this.usersRepository.findByEmail(createUsersDto.email);

      if (existingUser) throw new Error('Usuário já existe');

      const defaultRole = await this.rolesRepository.findOneByName('user');

      const user = await this.usersRepository.create({
        ...userData,
        password: hashedPassword,
        role: { connect: { id: defaultRole.id } },
      });

      return {
        id: user.id,
        firstName: user.firstName,
        userName: user.userName,
        email: user.email,
        role: defaultRole.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o usuário, ' + error.message);
    }
  }

  async update(id: number, data: any) {
    return this.usersRepository.update(id, data);
  }

  async delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
