import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../../repositories/users/users.repository';
import { RolesRepository } from '../../repositories/users/roles.repository';
import { CreateUsersDto } from 'src/@core/app/dto/users/create-users-dto';
import { UpdateUsersDto } from 'src/@core/app/dto/users/update-users-dto';
import { UpdateUsersPasswordDto } from 'src/@core/app/dto/users/update-users-password-dto';
import { UsersDto } from 'src/@core/app/dto/users/users-dtos';

@Injectable()
export class UsersUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findById({ id }: UsersDto) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findByEmail({ email }: UsersDto) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Email não encontrado');
    }

    return user;
  }

  async create(createUsersDto: CreateUsersDto) {
    const { password, ...userData } = createUsersDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await this.usersRepository.findByEmail(createUsersDto.email);

    if (existingUser) throw new ConflictException('Usuário já existe');

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
  }

  async update(userId: number, updateUsersDto: UpdateUsersDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const existingUser = await this.usersRepository.findByEmail(updateUsersDto.email);

    if (existingUser) throw new ConflictException('Usuário já existe');

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
  }

  async updatePassword(userId: number, updateUsersPasswordDto: UpdateUsersPasswordDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isCurrentPassword = await bcrypt.compare(updateUsersPasswordDto.password, user.password);

    if (!isCurrentPassword) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(updateUsersPasswordDto.newPassword, saltRounds);

    await this.usersRepository.update(userId, { password: hashedNewPassword });
  }

  async remove({ id }: UsersDto) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return await this.usersRepository.delete(id);
  }
}
