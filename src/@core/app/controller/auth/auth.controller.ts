import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthServices } from '../../services/auth/auth.service';
import { LocalAuthGuard } from 'src/@core/infra/auth/guards/local-auth.guard';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller()
export class AuthController {
  constructor(private readonly authServices: AuthServices) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authServices.login(req.user);
  }
}
