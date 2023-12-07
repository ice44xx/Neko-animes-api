import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Users } from '../../../domain/entities/users/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from '../../dto/requests/users/create-users-dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from '../../dto/requests/users/update-users-dto';
import { UpdateUsersPasswordDto } from '../../dto/requests/users/update-users-password-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    try {
      return this.usersRepository.find();
    } catch (error) {
      throw (
        new Error('Ocorreu um erro ao tentar encontrar todos usuários') + error.message
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });
      if (user) {
        throw new NotFoundException(`O usuário ${id} não foi encontrado`);
      }
      return user;
    } catch (error) {
      throw new Error('Ocorreu um erro ao tentar encontrar o usuário') + error.message;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      return user;
    } catch (error) {
      throw (
        new Error('Ocorreu um erro ao tentar encontrar o email do usuário') +
        error.message
      );
    }
  }

  async create(createUsersDto: CreateUsersDto) {
    try {
      const { password, ...userData } = createUsersDto;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o usuário') + error.message;
    }
  }

  async update(id: number, updateUsersDto: UpdateUsersDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const updateUser = await this.usersRepository.merge(user, updateUsersDto);

      return this.usersRepository.save(updateUser);
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o usuário') + error.message;
    }
  }

  async updatePassword(id: number, updateUsersPasswordDto: UpdateUsersPasswordDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });

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
      user.password = hashedNewPassword;

      const updateUser = await this.usersRepository.save(user);
      return updateUser;
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar a senha') + error.message;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      return this.usersRepository.remove(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar o usuário') + error.message;
    }
  }
}
