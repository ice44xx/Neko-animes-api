import {
  Controller,
  Post,
  HttpStatus,
  UseGuards,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/@core/infra/auth/guards/local-auth.guard';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuthServices } from '../../services/auth/auth.services';

@ApiTags('Autenticação')
@Controller()
export class AuthController {
  constructor(private readonly authServices: AuthServices) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest, @Res() res) {
    try {
      const loginData = await this.authServices.login(req.user);
      return res.status(HttpStatus.OK).json(loginData);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao fazer login' } + error.message);
    }
  }
}
