import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUsersDto } from '../dtos/create-users-dto';
import { UpdateUsersPasswordDto } from '../dtos/update-users-password-dto';
import { UpdateUsersDto } from '../dtos/update-users-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Res() response) {
    const users = await this.userService.findAll();
    return response.status(201).send(users);
  }

  @Get(':id')
  findUserId(@Param('id') id: number) {
    this.userService.findOne(id);
    return `Usuário com id: ${id} encontrado`;
  }

  @Post('create')
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.userService.create(createUsersDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUsersDto,
    @Res() res,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return res.status(201).json({ message: 'Usuário atualizado!', user: user });
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: number,
    @Body() updateUsersPasswordDto: UpdateUsersPasswordDto,
    @Body('oldPassword') oldPassword: string,
    @Res() res,
  ) {
    await this.userService.updatePassword(id, updateUsersPasswordDto, oldPassword);
    return res.status(201).send({ message: 'Senha atualizada com sucesso!' });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
