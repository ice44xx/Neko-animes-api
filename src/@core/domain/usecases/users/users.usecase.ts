import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users/users.repository';
import { RolesRepository } from '../../repositories/users/roles.repository';
import { CreateUsersDto } from 'src/@core/app/dto/users/create-users-dto';
import { UpdateUsersDto } from 'src/@core/app/dto/users/update-users-dto';
import { UpdateUsersPasswordDto } from 'src/@core/app/dto/users/update-users-password-dto';
import { UsersDto } from 'src/@core/app/dto/users/users-dtos';
import { CreateAdminsDto } from 'src/@core/app/dto/users/create-admins-dto';
import { UpdateAdminsDto } from 'src/@core/app/dto/users/update-admins-dto';
import { UpdateUsersProfileDto } from 'src/@core/app/dto/users/update-user-profile-dto';
import { UpdatePasswordByEmailDto } from 'src/@core/app/dto/users/update-password-email-dto';
import { CodesRepository } from '../../repositories/codes/codes.repository';
import { UpdateUsersTitleEndColorDto } from 'src/@core/app/dto/users/update-users-title-end-color-dto';

@Injectable()
export class UsersUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly codesRepository: CodesRepository,
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

  async findByUserName({ userName }: UsersDto) {
    const user = await this.usersRepository.findByUserName(userName);

    if (!user || user.length === 0) {
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
    const { password, title, ...userData } = createUsersDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await this.usersRepository.findByEmail(createUsersDto.email);

    if (existingUser) throw new ConflictException('E-mail já cadastrado');

    const existingUserName = await this.usersRepository.findByUserNameUnique(createUsersDto.userName);

    if (existingUserName) throw new ConflictException('Username já em uso');

    const defaultRole = await this.rolesRepository.findOneByName('user');

    const user = await this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      title: 'Novato',
      role: { connect: { id: defaultRole.id } },
    });

    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      profile: user.profile,
      birthday: user.birthday,
      color: user.color,
      title: user.title,
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

    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException('E-mail em uso');
    }

    const existingUserName = await this.usersRepository.findByUserNameUnique(updateUsersDto.userName);

    if (existingUserName && existingUserName.id !== userId) {
      throw new ConflictException('Username em uso');
    }

    const updateUser = await this.usersRepository.update(userId, updateUsersDto);

    return {
      id: updateUser.id,
      userName: updateUser.userName,
      email: updateUser.email,
      birthday: updateUser.birthday,
      updatedAt: updateUser.updatedAt,
    };
  }

  async updateProfile(userId: number, updateUsersProfile: UpdateUsersProfileDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    await this.usersRepository.update(userId, updateUsersProfile);
  }

  async updateTitleEndColor(userId: number, updateUsersTitleEndColorDto: UpdateUsersTitleEndColorDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    await this.usersRepository.update(userId, updateUsersTitleEndColorDto);
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

  async updatePasswordbyEmail(email: string, updatePasswordByEmailDto: UpdatePasswordByEmailDto) {
    const existingCode = await this.codesRepository.findByCode(updatePasswordByEmailDto.code);

    if (!existingCode) {
      throw new NotFoundException('Código expirado');
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('E-mail inválido');
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(updatePasswordByEmailDto.newPassword, saltRounds);

    await this.usersRepository.update(user.id, { password: hashedNewPassword });
    await this.codesRepository.deleteByCode(existingCode.code);
  }

  async createAdmin(createAdminsDto: CreateAdminsDto) {
    const { password, roleId, ...adminData } = createAdminsDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await this.usersRepository.findByEmail(createAdminsDto.email);

    if (existingUser) throw new ConflictException('Usuário já existe');

    const existingUserName = await this.usersRepository.findByUserNameUnique(createAdminsDto.userName);

    if (existingUserName) throw new ConflictException('Username já em uso');

    const user = await this.usersRepository.create({
      ...adminData,
      password: hashedPassword,
      role: { connect: { id: roleId } },
    });

    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      profile: user.profile,
      birthday: user.birthday,
      role: roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateAdmin(userId: number, updateAdminsDto: UpdateAdminsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const existingUser = await this.usersRepository.findByEmail(updateAdminsDto.email);

    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException('Usuário já existe');
    }

    const existingUserName = await this.usersRepository.findByUserNameUnique(updateAdminsDto.userName);

    if (existingUserName && existingUserName.id !== userId) {
      throw new ConflictException('Username já em uso');
    }

    const updateAdmin = await this.usersRepository.update(userId, updateAdminsDto);

    return {
      id: updateAdmin.id,
      userName: updateAdmin.userName,
      email: updateAdmin.email,
      birthday: updateAdmin.birthday,
      profile: updateAdmin.profile,
      role: updateAdmin.roleId,
      updatedAt: updateAdmin.updatedAt,
    };
  }

  async remove({ id }: UsersDto) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return await this.usersRepository.delete(id);
  }
}
