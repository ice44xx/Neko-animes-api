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
import { IsPublic } from 'src/@core/infra/decorators/is-public.decorator';
import { UpdateUsersPasswordDto } from '../../dto/requests/users/update-users-password-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Get()
  async findAll(@Res() res) {
    const users = await this.usersService.findAll();
    return res.status(201).send(users);
  }

  @IsPublic()
  @Get(':id')
  findUserId(@Param('id') id: number) {
    this.usersService.findOne(id);
    return `Usuário com id: ${id} encontrado`;
  }

  @IsPublic()
  @Post('create')
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Put()
  async update(
    @Request() req: AuthRequest,
    @Body() updateUsersDto: UpdateUsersDto,
    @Res() res,
  ) {
    const currentUser = req.user;
    const user = await this.usersService.update(currentUser.id, updateUsersDto);
    return res.status(201).json({ message: 'Usuário atualizado!', user: user });
  }

  @Put('password')
  async updatePassword(
    @Request() req: AuthRequest,
    @Body() updateUsersPasswordDto: UpdateUsersPasswordDto,
    @Res() res,
  ) {
    const currentUser = req.user;
    const user = await this.usersService.updatePassword(
      currentUser.id,
      updateUsersPasswordDto,
    );
    return res.status(201).json({ message: 'Senha atualizada com sucesso!', user: user });
  }

  @HttpCode(204)
  @Delete()
  remove(@Request() req: AuthRequest) {
    const currentUser = req.user;
    return this.usersService.remove(currentUser.id);
  }
}
