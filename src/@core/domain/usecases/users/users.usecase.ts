import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users/users.repository';
import { RolesRepository } from '../../repositories/users/roles.repository';
import { CreateUsersDto } from 'src/@core/app/dto/users/create-users-dto';
import { UpdateUsersDto } from 'src/@core/app/dto/users/update-users-dto';
import { UpdateUsersPasswordDto } from 'src/@core/app/dto/users/update-users-password-dto';

@Injectable()
export class UsersUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
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

  async update(userId: number, updateUsersDto: UpdateUsersDto) {
    try {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const updateUser = await this.usersRepository.update(userId, updateUsersDto);

      const role = await this.rolesRepository.findOneByName(user.role);

      return {
        id: updateUser.id,
        firstName: updateUser.firstName,
        userName: updateUser.userName,
        email: updateUser.email,
        role: role.name,
        updatedAt: updateUser.updatedAt,
      };
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o usuário, ' + error.message);
    }
  }

  async updatePassword(userId: number, updateUsersPasswordDto: UpdateUsersPasswordDto) {
    try {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const isCurrentPassword = await bcrypt.compare(
        updateUsersPasswordDto.password,
        user.password,
      );

      if (!isCurrentPassword) {
        throw new UnauthorizedException('Senha atual incorreta');
      }

      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(
        updateUsersPasswordDto.newPassword,
        saltRounds,
      );

      await this.usersRepository.update(userId, { password: hashedNewPassword });
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar a senha, ') + error.message;
    }
  }

  async remove(userId: number) {
    try {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      return await this.usersRepository.delete(userId);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar usuário, ' + error.message);
    }
  }
}
