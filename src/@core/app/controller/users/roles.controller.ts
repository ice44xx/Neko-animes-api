import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { RolesService } from '../../services/users/roles.service';
import { CreateRolesDto } from '../../dto/requests/users/create-roles-dto';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const role = await this.rolesService.findAll();
      return res.status(201).json(role);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao encontrar as roles');
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createRolesDto: CreateRolesDto) {
    try {
      const role = await this.rolesService.create(createRolesDto);
      return res.status(201).json(role);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao criar a role');
    }
  }

  @Roles(UserType.Admin)
  @Delete()
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    try {
      return this.rolesService.remove(id);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao deletar a role');
    }
  }
}
