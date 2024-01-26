import { Controller, Post, Body, Get, Res, Param, Delete, Put, NotFoundException, HttpStatus } from '@nestjs/common';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateAnimesDto } from '../../dto/animes/create-animes-dto';
import { AnimesService } from '../../services/animes/animes.service';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { UpdateAnimesDto } from '../../dto/animes/update-animes-dto';

@ApiTags('Animes')
@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const animes = await this.animesService.findAll();
      return res.status(HttpStatus.OK).send(animes);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao buscar os animes, ' + error.message });
    }
  }

  @Public()
  @Get('features')
  async findAllFeature(@Res() res) {
    try {
      const animes = await this.animesService.findAllFeature();
      return res.status(HttpStatus.OK).send(animes);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao buscar os animes em destaques, ' + error.message });
    }
  }

  @Public()
  @Get('newest')
  async findNewest(@Res() res) {
    try {
      const animes = await this.animesService.findTopNewest();
      return res.status(HttpStatus.OK).send(animes);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao buscar os animes lançamentos, ' + error.message });
    }
  }

  @Public()
  @Get('likes')
  async findTopLikes(@Res() res) {
    try {
      const animes = await this.animesService.findTopLikes();
      return res.status(HttpStatus.OK).send(animes);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao buscar os animes top likes, ' + error.message });
    }
  }

  @Public()
  @Get('dub')
  async findTopDub(@Res() res) {
    try {
      const animes = await this.animesService.findTopDub();
      return res.status(HttpStatus.OK).send(animes);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao buscar os animes dublados, ' + error.message });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const anime = await this.animesService.findByName({ name });
      return res.status(HttpStatus.OK).send(anime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: `Ocorreu um erro ao buscar o anime ${name}, ` } + error.message);
    }
  }

  @Public()
  @Get('/id/:id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const anime = await this.animesService.findById({ id });
      return res.status(HttpStatus.OK).send(anime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: `Ocorreu um erro ao buscar o anime ${id}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createAnimesDto: CreateAnimesDto) {
    try {
      const anime = await this.animesService.create(createAnimesDto);
      return res.status(HttpStatus.CREATED).send(anime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao criar o anime, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Put(':animeId')
  async update(@Res() res, @Param('animeId') animeId: number, @Body() updateAnimesDto: UpdateAnimesDto) {
    try {
      const anime = await this.animesService.update(animeId, updateAnimesDto);
      return res.status(HttpStatus.OK).send(anime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao atualizar o anime, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.animesService.remove({ id });
      return res.status(HttpStatus.OK).send({ message: 'Anime deletado com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao deletar o anime, ' + error.message });
    }
  }
}
