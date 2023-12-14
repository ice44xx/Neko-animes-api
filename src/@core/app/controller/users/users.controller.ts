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
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { UpdateUsersPasswordDto } from '../../dto/requests/users/update-users-password-dto';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const users = await this.usersService.findAll();
      return res.status(201).send(users);
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao buscar todos usuários' });
    }
  }

  @Roles(UserType.Admin)
  @Get(':id')
  async findUserId(@Res() res, @Param('id') id: number) {
    try {
      const user = await this.usersService.findById(id);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).send({ message: `Erro ao buscar o usuário ${id}` });
    }
  }

  @Public()
  @Post('create')
  async create(@Res() res, @Body() createUsersDto: CreateUsersDto) {
    try {
      const user = await this.usersService.create(createUsersDto);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao criar usuário' });
    }
  }

  @Put()
  async update(
    @Request() req: AuthRequest,
    @Body() updateUsersDto: UpdateUsersDto,
    @Res() res,
  ) {
    try {
      const currentUser = req.user;
      const user = await this.usersService.update(currentUser.id, updateUsersDto);
      return res.status(201).json({ message: 'Usuário atualizado!', user: user });
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao atualizar o usuário' });
    }
  }

  @Put('password')
  async updatePassword(
    @Request() req: AuthRequest,
    @Body() updateUsersPasswordDto: UpdateUsersPasswordDto,
    @Res() res,
  ) {
    try {
      const currentUser = req.user;
      const user = await this.usersService.updatePassword(
        currentUser.id,
        updateUsersPasswordDto,
      );
      return res
        .status(201)
        .json({ message: 'Senha atualizada com sucesso!', user: user });
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao atualizar a senha do usuário' });
    }
  }

  @HttpCode(204)
  @Delete()
  async remove(@Request() req: AuthRequest) {
    const currentUser = req.user;
    return this.usersService.delete(currentUser.id);
  }
}
