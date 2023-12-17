import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from '../../dto/users/create-users-dto';
import { UsersUseCase } from 'src/@core/domain/usecases/users/users.usecase';
import { UpdateUsersDto } from '../../dto/users/update-users-dto';
import { UpdateUsersPasswordDto } from '../../dto/users/update-users-password-dto';
import { UsersDto } from '../../dto/users/users-dtos';

@Injectable()
export class UsersService {
  constructor(private readonly usersUseCase: UsersUseCase) {}

  async findAll() {
    return await this.usersUseCase.findAll();
  }

  async findById({ id }: UsersDto) {
    return await this.usersUseCase.findById({ id });
  }

  async findByEmail({ email }: UsersDto) {
    return await this.usersUseCase.findByEmail({ email });
  }

  async create(createUsersDto: CreateUsersDto) {
    return await this.usersUseCase.create(createUsersDto);
  }

  async update(userId: number, updateUsersDto: UpdateUsersDto) {
    return await this.usersUseCase.update(userId, updateUsersDto);
  }

  async updatePassword(userId: number, updateUsersPasswordDto: UpdateUsersPasswordDto) {
    return await this.usersUseCase.updatePassword(userId, updateUsersPasswordDto);
  }

  async remove({ id }: UsersDto) {
    return await this.usersUseCase.remove({ id });
  }
}
