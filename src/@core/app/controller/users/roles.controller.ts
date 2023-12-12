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
import { Public } from 'src/@core/infra/decorators/public-route.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const role = await this.rolesService.findAll();
      return res.status(201).json(role);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao encontrar as roles');
    }
  }

  @Public()
  @Post('create')
  async create(@Res() res, @Body() createRolesDto: CreateRolesDto) {
    try {
      const role = await this.rolesService.create(createRolesDto);
      return res.status(201).json(role);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao criar a role');
    }
  }

  @Public()
  @Delete()
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    try {
      return this.rolesService.remove(id);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao deletar a role');
    }
  }
}
