import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { TypesAnimesService } from '../../services/types-animes/types.service';
import { CreateTypesAnimesDto } from '../../dto/types-animes/create-types-dto';
import { UpdateTypesAnimesDto } from '../../dto/types-animes/update-types-dto';

@ApiTags('Tipos de Animes')
@Controller('types-animes')
export class TypesAnimesController {
  constructor(private readonly typesAnimesService: TypesAnimesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const type = await this.typesAnimesService.findAll();
      return res.status(HttpStatus.OK).json(type);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar os tipos, ' + error.message });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const type = await this.typesAnimesService.findByName({ name });
      return res.status(HttpStatus.OK).json(type);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: `Ocorreu um erro ao buscar o tipo ${name}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createTypesAnimesDto: CreateTypesAnimesDto) {
    try {
      const type = await this.typesAnimesService.create(createTypesAnimesDto);
      return res.status(HttpStatus.CREATED).json(type);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao criar o tipo, ' + error.message });
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
      return res.status(HttpStatus.OK).json(type);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao atualizar o tipo, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.typesAnimesService.remove({ id });
      return res.status(HttpStatus.OK).json({ message: 'tipo deletado com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao deletar o tipo, ' + error.message });
    }
  }
}
