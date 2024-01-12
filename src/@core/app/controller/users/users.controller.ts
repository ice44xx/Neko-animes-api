import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  Put,
  Request,
  Delete,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUsersDto } from '../../dto/users/create-users-dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { UpdateUsersDto } from '../../dto/users/update-users-dto';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { UpdateUsersPasswordDto } from '../../dto/users/update-users-password-dto';
import { CreateAdminsDto } from '../../dto/users/create-admins-dto';
import { UpdateAdminsDto } from '../../dto/users/update-admins-dto';
import { UpdateUsersProfileDto } from '../../dto/users/update-user-profile-dto';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const user = await this.usersService.findAll();
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar o usuário, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Get('/id/:id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const user = await this.usersService.findById({ id });
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: `Ocorreu um erro ao buscar o usuário ${id}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Get('/username/:name')
  async findByUserName(@Res() res, @Param('name') name: string) {
    try {
      const user = await this.usersService.findByUserName({ userName: name });
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: `Ocorreu um erro ao buscar o usuário ${name}, ` + error.message });
    }
  }

  @Roles(UserType.User)
  @Get('/data')
  async getUser(@Request() req: AuthRequest, @Res() res) {
    try {
      const currentUser = req.user.id;
      const user = await this.usersService.findById({ id: currentUser });
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar o usuário, ' + error.message });
    }
  }

  @Public()
  @Post('create')
  async create(@Res() res, @Body() createUsersDto: CreateUsersDto) {
    try {
      const user = await this.usersService.create(createUsersDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao criar o usuário, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Put()
  async update(@Request() req: AuthRequest, @Res() res, @Body() updateUsersDto: UpdateUsersDto) {
    try {
      const currentUser = req.user.id;
      const user = await this.usersService.update(currentUser, updateUsersDto);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      } else if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao atualizar o usuário, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Put('profile')
  async updateProfile(
    @Request() req: AuthRequest,
    @Res() res,
    @Body() updateUsersProfileDto: UpdateUsersProfileDto,
  ) {
    try {
      const currentUser = req.user.id;
      const user = await this.usersService.updateProfile(currentUser, updateUsersProfileDto);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      } else if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao atualizar o usuário, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete()
  async delete(@Request() req: AuthRequest, @Res() res) {
    try {
      const currentUser = req.user;
      await this.usersService.remove(currentUser);
      return res.status(HttpStatus.OK).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao deletar o usuário, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Put('password')
  async updatePassword(
    @Request() req: AuthRequest,
    @Res() res,
    @Body() updateUsersPassswordDto: UpdateUsersPasswordDto,
  ) {
    try {
      const currentUser = req.user.id;
      const user = await this.usersService.updatePassword(currentUser, updateUsersPassswordDto);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao criar o usuário, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create/admin')
  async createAdmin(@Res() res, @Body() createAdminsDto: CreateAdminsDto) {
    try {
      const user = await this.usersService.createAdmin(createAdminsDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao criar o administrador, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async updateAdmin(@Param('id') id: number, @Res() res, @Body() updateAdminsDto: UpdateAdminsDto) {
    try {
      const user = await this.usersService.updateAdmin(id, updateAdminsDto);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      } else if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao atualizar o administrador, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':userId')
  async deleteAdmin(@Param('userId') userId: number, @Res() res) {
    try {
      await this.usersService.remove({ id: userId });
      return res.status(HttpStatus.OK).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao deletar o usuário, ' + error.message });
    }
  }
}
