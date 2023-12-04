import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../../domain/entities/users/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from '../../dto/requests/users/create-users-dto';
import { UpdateUsersPasswordDto } from '../../dto/requests/users/update-users-password-dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from '../../dto/requests/users/update-users-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado`);
    }
    return user;
  }

  async create(createUsersDto: CreateUsersDto) {
    const { password, ...userData } = createUsersDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.usersRepository.save(user);
  }

  async update(id: number, updateUsersDto: UpdateUsersDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado`);
    }

    Object.assign(user, updateUsersDto);
    return this.usersRepository.save(user);
  }

  async updatePassword(
    id: number,
    updateUsersPasswordDto: UpdateUsersPasswordDto,
    oldPassword: string,
  ) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado`);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Senha antiga incorreta');
    }

    const { password, ...userData } = updateUsersPasswordDto;

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      Object.assign(userData, { password: hashedPassword });
    }

    const updateUser = await this.usersRepository.save({ ...user, ...userData });
    return updateUser;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado`);
    }
    return this.usersRepository.remove(user);
  }
}
