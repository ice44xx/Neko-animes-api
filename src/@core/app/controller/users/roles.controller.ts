import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { RolesService } from '../../services/users/roles.service';
import { CreateRolesDto } from '../../dto/users/create-roles-dto';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(UserType.Admin)
  @Post('create')
  async createRoles(@Res() res, @Body() createRolesDto: CreateRolesDto) {
    try {
      const roles = await this.rolesService.createRoles(createRolesDto);
      return res.status(201).json(roles);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a role, ' + error.message);
    }
  }

  @Roles(UserType.Admin)
  @Get()
  async findAllRoles() {
    return this.rolesService.findAll();
  }
}
