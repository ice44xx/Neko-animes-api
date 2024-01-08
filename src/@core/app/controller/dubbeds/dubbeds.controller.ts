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
import { DubbedsService } from '../../services/dubbeds/dubbeds.service';
import { CreateDubbedsDto } from '../../dto/dubbeds/create-dubbeds-dto';

@ApiTags('Legendado ou Dublado')
@Controller('dubbeds')
export class DubbedsController {
  constructor(private readonly dubbedsService: DubbedsService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const dubbed = await this.dubbedsService.findAll();
      return res.status(200).json(dubbed);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar o dubbed, ' + error.message });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const dubbed = await this.dubbedsService.findByName({ name });
      return res.status(200).json(dubbed);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: `Ocorreu um erro ao buscar o dubbed ${name}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createDubbedDto: CreateDubbedsDto) {
    try {
      const dubbed = await this.dubbedsService.create(createDubbedDto);
      return res.status(201).json(dubbed);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao criar o dubbed, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(@Res() res, @Param('id') id: number, @Body() createDubbedDto: CreateDubbedsDto) {
    try {
      const dubbed = await this.dubbedsService.update(id, createDubbedDto);
      return res.status(200).json(dubbed);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao atualizar o dubbed, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.dubbedsService.remove({ id });
      return res.status(200).send({ message: 'Dubbed deletado com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao deletar o dubbed, ' + error.message });
    }
  }
}
