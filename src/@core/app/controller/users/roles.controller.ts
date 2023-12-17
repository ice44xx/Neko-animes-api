import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { RolesService } from '../../services/users/roles.service';
import { CreateRolesDto } from '../../dto/users/create-roles-dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      return this.rolesService.findAll();
    } catch (error) {
      return res.status(500).send('Ocorreu um erro ao criar a role');
    }
  }

  @Public()
  @Post('create')
  async create(@Res() res, @Body() createRolesDto: CreateRolesDto) {
    try {
      const roles = await this.rolesService.create(createRolesDto);
      return res.status(201).json(roles);
    } catch (error) {
      return res.status(500).send('Ocorreu um erro ao criar a role');
    }
  }
}
