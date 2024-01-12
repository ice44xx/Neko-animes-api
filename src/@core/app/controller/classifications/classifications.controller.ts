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
import { ClassificationsService } from '../../services/classifications/classifications.service';
import { CreateClassificationsDto } from '../../dto/classifications/create-classifications-dto';
import { UpdateClassificationsDto } from '../../dto/classifications/update-classifications-dto';

@ApiTags('Classificações')
@Controller('classifications')
export class ClassificationsController {
  constructor(private readonly classificationsService: ClassificationsService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const classification = await this.classificationsService.findAll();
      return res.status(HttpStatus.OK).json(classification);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar as classificações, ' + error.message });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const classification = await this.classificationsService.findByName({ name });
      return res.status(HttpStatus.OK).json(classification);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: `Ocorreu um erro ao buscar a classificação ${name}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createClassificationsDto: CreateClassificationsDto) {
    try {
      const classification = await this.classificationsService.create(createClassificationsDto);
      return res.status(HttpStatus.CREATED).json(classification);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao criar a classificação, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: number,
    @Body() updateClassificationsDto: UpdateClassificationsDto,
  ) {
    try {
      const classification = await this.classificationsService.update(id, updateClassificationsDto);
      return res.status(HttpStatus.OK).json(classification);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao atualizar a classificação, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.classificationsService.remove({ id });
      return res.status(HttpStatus.OK).json({ message: 'Classificação deletada com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao deletar a classificação, ' + error.message });
    }
  }
}
