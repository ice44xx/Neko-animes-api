import { Controller, Post, Body, Get, Res, Param, HttpCode, Put } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUsersDto } from '../../dto/users/create-users-dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const user = await this.usersService.findAll();
      return res.status(200).json(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar todos usuários, ' + error.message);
    }
  }

  @Roles(UserType.Admin)
  @Get(':id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const user = await this.usersService.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar o usuário, ' + error.message);
    }
  }

  @Post('create')
  async create(@Res() res, @Body() createUsersDto: CreateUsersDto) {
    try {
      const user = await this.usersService.create(createUsersDto);
      return res.status(201).json(user);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o usuário, ' + error.message);
    }
  }

  @Roles(UserType.User)
  @Put()
  async update() {}

  @Roles(UserType.Admin)
  @HttpCode(204)
  async delete() {}
}
