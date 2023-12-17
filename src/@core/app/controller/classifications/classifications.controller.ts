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
      return res.status(201).json(classification);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao buscar as classificações' });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createClassificationsDto: CreateClassificationsDto) {
    try {
      const classification = await this.classificationsService.create(createClassificationsDto);
      return res.status(201).json(classification);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao criar a classificação' });
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
      return res.status(200).json(classification);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao atualizar a classificação' });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.classificationsService.remove(id);
      return res.status(200).send({ message: 'Classificação deletada com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao deletar a classificação' });
    }
  }
}
