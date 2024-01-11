import {
  Body,
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
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';
import { BackgroundsAuthService } from '../../services/backgrounds-auth/backgrounds-auth.service';
import { CreateBackgroundsAuthDto } from '../../dto/backgrounds-auth/create-backgrounds-dtos';
import { UpdateBackgroundsAuthDto } from '../../dto/backgrounds-auth/update-backgrounds-dto';

@ApiTags('Planos de fundos Login e Registro')
@Controller('backgrounds-auth')
export class BackgroundsAuthController {
  constructor(private readonly backgroundsAuthService: BackgroundsAuthService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const backgroundsAuth = await this.backgroundsAuthService.findAll();
      return res.status(HttpStatus.OK).json(backgroundsAuth);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao buscar os backgrounds, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createBackgroundsAuthDto: CreateBackgroundsAuthDto) {
    try {
      const backgroundsAuth = await this.backgroundsAuthService.create(createBackgroundsAuthDto);
      return res.status(HttpStatus.CREATED).json(backgroundsAuth);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao criar o background, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: number,
    @Body() updateBackgroundsAuthDto: UpdateBackgroundsAuthDto,
  ) {
    try {
      const backgroundsAuth = await this.backgroundsAuthService.update(
        id,
        updateBackgroundsAuthDto,
      );

      return res.status(HttpStatus.OK).json(backgroundsAuth);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao atualizar o background, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.backgroundsAuthService.remove({ id });
      return res.status(HttpStatus.OK).send({ message: 'Background deletado' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao deletar o background, ' + error.message });
    }
  }
}
