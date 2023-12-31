import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { TypesAnimesService } from '../../services/type/types.service';
import { CreateTypesAnimesDto } from '../../dto/type/create-types-dto';
import { UpdateTypesAnimesDto } from '../../dto/type/update-types-dto';

@ApiTags('Tipos de Animes')
@Controller('types-animes')
export class TypesAnimesController {
  constructor(private readonly typesAnimesService: TypesAnimesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const type = await this.typesAnimesService.findAll();
      return res.status(200).json(type);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar os tipos, ' + error.message });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const type = await this.typesAnimesService.findByName({ name });
      return res.status(200).json(type);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: `Ocorreu um erro ao buscar o tipo ${name}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createTypesAnimesDto: CreateTypesAnimesDto) {
    try {
      const type = await this.typesAnimesService.create(createTypesAnimesDto);
      return res.status(201).json(type);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o tipo, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: number,
    @Body() createTypesAnimesDto: UpdateTypesAnimesDto,
  ) {
    try {
      const type = await this.typesAnimesService.update(id, createTypesAnimesDto);
      return res.status(200).json(type);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao atualizar o tipo, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.typesAnimesService.remove({ id });
      return res.status(200).send({ message: 'tipo deletado com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao deletar o tipo, ' + error.message });
    }
  }
}
