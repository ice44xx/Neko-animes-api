import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { RolesService } from '../../services/users/roles.service';
import { CreateRolesDto } from '../../dto/users/create-roles-dto';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @Post('create')
  async create(@Res() res, @Body() createRolesDto: CreateRolesDto) {
    try {
      const roles = await this.rolesService.create(createRolesDto);
      return res.status(201).json(roles);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a role, ' + error.message);
    }
  }

  @Public()
  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }
}
