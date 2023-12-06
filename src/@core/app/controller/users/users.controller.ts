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
  Request,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUsersDto } from '../../dto/requests/users/create-users-dto';
import { UpdateUsersDto } from '../../dto/requests/users/update-users-dto';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res) {
    const users = await this.usersService.findAll();
    return res.status(201).send(users);
  }

  @Get(':id')
  findUserId(@Param('id') id: number) {
    this.usersService.findOne(id);
    return `Usuário com id: ${id} encontrado`;
  }

  @Post('create')
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Put()
  async update(
    @Request() req: AuthRequest,
    @Body() updateUserDto: UpdateUsersDto,
    @Res() res,
  ) {
    const currentUser = req.user;
    const user = await this.usersService.update(currentUser.id, updateUserDto);
    return res.status(201).json({ message: 'Usuário atualizado!', user: user });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
