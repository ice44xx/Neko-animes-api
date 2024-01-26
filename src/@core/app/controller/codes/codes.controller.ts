import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CodesServices } from '../../services/codes/codes.service';
import { ResetPasswordDto } from '../../dto/auth/reset-password-dto';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';

@ApiTags('Códigos de redefinição de senha')
@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesServices) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const code = await this.codesService.findAll();
      return res.status(HttpStatus.OK).send(code);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao buscar os códigos, ' + error.message });
    }
  }

  @Public()
  @Get(':code')
  async findByCode(@Res() res, @Param('code') paramCode: number) {
    try {
      const code = await this.codesService.findByCode({ code: paramCode });
      return res.status(HttpStatus.OK).send(code);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao buscar o código, ' + error.message });
    }
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.codesService.sendResetCode(resetPasswordDto.email);
    return { message: 'Código de redefinição enviado com sucesso.' };
  }
}
