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
import { UsersService } from './users.service';
import { CreateUsersDto } from './Dtos/create-users-dto';
import { UpdateUsersDto } from './Dtos/update-users-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(@Res() response) {
    this.userService;
    return response.status(200).send('listagem de tudo');
  }

  @Get(':id/:name')
  findUserName(@Param('id') id: string, @Param('name') name: string) {
    this.userService;
    return `Anime com id: ${id} e nome ${name}`;
  }

  @Post('create')
  create(@Body() createUsersDto: CreateUsersDto) {
    return;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return;
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Usuário deletado ${id}`;
  }
}
